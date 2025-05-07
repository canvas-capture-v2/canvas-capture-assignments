
import express from 'express'
import {get_assignment_groups, get_assignments, get_courses, get_submissions} from "./src/apis/canvas.api.ts";
import type {CanvasAssignment, CanvasAssignmentGroup} from "./src/types/canvas_api/assignment.ts";
import type {CanvasSubmission} from "./src/types/canvas_api/submission.ts";
import type {Course} from "./src/types/front_end/CourseTypes.ts";
import {transformer} from "./src/transformers/canvas_frontend_transformer.ts";
import  * as apollo from '@apollo/client'
import {CanvasCourse} from "./src/types/canvas_api/course.ts";
const {ApolloClient, gql, InMemoryCache} = apollo

const app = express()

app.use(express.json())

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

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

const query_canvas= async (token: string, domain: string) => {
    const canvas_courses = await get_courses(domain, token)
    const { course_assignment_group_map, assignment_group_assignment_map, assignment_submission_map } = await assemble_maps(token, domain, canvas_courses)

    const courses: Course[] = transformer(canvas_courses, course_assignment_group_map, assignment_group_assignment_map, assignment_submission_map)
    //update_gql(courses)
    await update_rest(courses)
}

const update_gql = (courses: Course[]) => {

    courses.map(async (course) => {
        const mutation = gql`
            mutation Create_course($input: CourseInput!) {
                create_course(input: $input) {
                    id
                }
            }
        `
        client.mutate({mutation, variables: {course}}).then(() => console.log(mutation)).catch((e) => {
            console.log(e)
        })
    })
}

const update_rest = async (courses: Course[]) => {
    console.log(JSON.stringify(courses))
    const res = await fetch('http://localhost:4000/courses',{
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({courses: courses})
    })
    console.log(res.status)
}
// @ts-ignore
app.post('/refresh', (async (req, res): Promise<any> => {
    if (req.body !== undefined && req.body !== null) {
        const body = await req.body
        const token: string = body.canvas_token;
        const domain: string = body.canvas_domain;
        if (token === undefined || token === null || domain === undefined || domain === null) {
            return res.status(400).json()
        }
        query_canvas(token, domain)
        return res.status(200).json()
    } else {
        return res.status(400).json()
    }
}))

console.log('Listening on port 4001...')
app.listen(4001)