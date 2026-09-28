
import express from 'express'
import {get_assignment_groups, get_assignments, get_courses, get_submissions} from "./apis/canvas.api.js";
import type {
    CanvasAssignment,
    CanvasAssignmentGroup,
    CanvasSubmission,
    Course,
    CanvasCourse, Assignment, Submission, AssignmentGroup,
    //AssignmentGroup, Assignment, Submission
} from "@canvas-capture-v2/canvas-capture-common";
import jsonwebtoken from 'jsonwebtoken'
import {transformer} from "./transformers/canvas_frontend_transformer.js";
// import  * as apollo from '@apollo/client'
// const {ApolloClient, gql, InMemoryCache} = apollo

// Set at deploy time from the cc-jwt Kubernetes Secret, never committed
const JWT_SECRET: string =
    process.env.JWT_SECRET ??
    (() => {
        throw new Error('JWT_SECRET is not set')
    })()

const app = express()

app.use(express.json())

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql',
//     cache: new InMemoryCache()
// })

const assemble_maps = async (token: string, domain: string, canvas_courses: CanvasCourse[]) => {
    const maps = {
        course_assignment_group_map: new Map<number, CanvasAssignmentGroup[]>(),
        assignment_group_assignment_map: new Map<number, CanvasAssignment[]>(),
        assignment_submission_map: new Map<number, CanvasSubmission[]>()
    }
    await Promise.all(canvas_courses.map(async (course: CanvasCourse) => {
        const assignment_groups = await get_assignment_groups(domain, token, course.id)
        maps.course_assignment_group_map.set(course.id, assignment_groups)
        await Promise.all(assignment_groups.map(async (assignment_group) => {
            const assignments = await get_assignments(domain, token, course.id, assignment_group.id)
            maps.assignment_group_assignment_map.set(assignment_group.id, assignments)
            await Promise.all(assignments.map(async (assignment) => {
                const submissions = await get_submissions(domain, token, course.id, assignment.id)
                maps.assignment_submission_map.set(assignment.id, submissions)
                return submissions
            }))
            return assignments
        }))
        return assignment_groups
    }))
    return maps
}

const get_stats = async (courses: Course[]) => {

    await Promise.all(courses.map(async (course: Course) => {
        const course_assignments: Assignment[] = []
        const course_submissions: Submission[] = []
        await Promise.all(course.assignment_groups.map(async (assignment_group: AssignmentGroup) => {
            const assignment_group_assignments: Assignment[] = []
            const assignment_group_submissions: Submission[] = []
            await Promise.all(assignment_group.assignments.map(async (assignment: Assignment) => {
                assignment.score_statistics = await fetch('http://localhost:4002/stats/score', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                    body: JSON.stringify({courses: assignment.submissions})
                })
                course_assignments.push(assignment)
                course_submissions.concat(assignment.submissions)
                assignment_group_assignments.push(assignment)
                assignment_group_submissions.concat(assignment.submissions)
            }))
            const {score_statistics, date_statistics} = await (await fetch('http://localhost:4002/stats/both', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({
                    assignments: assignment_group_assignments,
                    submissions: assignment_group_submissions,
                    start_date: course.start_at,
                    end_date: course.end_at
                })
            })).json()
            assignment_group.score_statistics = score_statistics
            assignment_group.date_statistics = date_statistics
        }))
        const {score_statistics, date_statistics} = await (await fetch('http://localhost:4002/stats/both', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                assignments: course_assignments,
                submissions: course_submissions,
                start_date: course.start_at,
                end_date: course.end_at
            })
        })).json()
        course.score_statistics = score_statistics
        course.date_statistics = date_statistics
    }))
}

const query_canvas= async (token: string, domain: string, user_id: number) => {
    const canvas_courses = await get_courses(domain, token)
    const { course_assignment_group_map, assignment_group_assignment_map, assignment_submission_map } = await assemble_maps(token, domain, canvas_courses)

    const courses: Course[] = transformer(user_id, canvas_courses, course_assignment_group_map, assignment_group_assignment_map, assignment_submission_map)
    //update_gql(courses)
    await get_stats(courses)
    await update_rest(courses, user_id)
}

// const update_gql = (courses: Course[]) => {
//
//     courses.map(async (course) => {
//         const mutation = gql`
//             mutation Create_course($input: CourseInput!) {
//                 create_course(input: $input) {
//                     id
//                 }
//             }
//         `
//         client.mutate({mutation, variables: {course}}).then(() => console.log(mutation)).catch((e) => {
//             console.log(e)
//         })
//     })
// }

const update_rest = async (courses: Course[], user_id: number) => {
    await fetch('http://localhost:4000/courses',{
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({courses: courses, user_id: user_id})
    })
}
// @ts-ignore
app.post('/refresh', (async (req, res): Promise<any> => {
    if (req.body !== undefined && req.body !== null) {
        const body = await req.body
        const token: string = body.canvas_token;
        const domain: string = body.canvas_domain;
        const json_token = body.jwt;
        if (token === undefined || token === null || domain === undefined || domain === null) {
            return res.status(400).json()
        }
        const jwt = jsonwebtoken.verify(json_token, JWT_SECRET)
        let id: number
        if (typeof jwt !== 'string') {
            id = parseInt(jwt.id)
            query_canvas(token, domain, id)
            return res.status(200).json()
        } else {
            return res.status(400).json({ message: 'Invalid JWT' })
        }
    } else {
        return res.status(400).json({message: "bad request"})
    }
}))

console.log('Listening on port 4001...')
app.listen(4001)