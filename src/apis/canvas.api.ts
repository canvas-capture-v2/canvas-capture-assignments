import type {CanvasCourse, CanvasAssignment, CanvasAssignmentGroup, CanvasSubmission} from '@canvas-capture-v2/canvas-capture-common'
import {randomUUID} from "node:crypto";

export function handleDates(body: unknown) {
    if (body === null || body === undefined || typeof body !== 'object') return

    for (const key of Object.keys(body)) {
        // @ts-ignore
        const value = body[key]
        if (
            value &&
            typeof value === 'string' &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)
        ) {
            // @ts-expect-error - we know body is an object
            body[key] = parseISO(value)
        } else if (typeof value === 'object') handleDates(value)
    }
    return
}

export async function intercept(response: Response) {
    handleDates(response)
    return response
}

export function toJSON<T>(response: Response): Promise<T> {
    return response.json()
}

export const get_courses =  async (canvas_domain: string, access_token: string) => {
    // return await fetch(`${canvas_domain}/api/v1/courses?exclude_blueprint_courses&per_page=1000&include=syllabus_body,public_description,total_students`,
    //     { headers: {Authorization: `Bearer ${access_token}`}}
    // )
    //     .then(intercept)
    //     .then(toJSON<CanvasCourse[]>)
    canvas_domain
    access_token
    const courses: CanvasCourse[] = [
        {
            id: 0,
            name: 'Microservices',
            course_code: 'CSC 5201',
            start_at: new Date(2025, 0, 21),
            end_at: new Date(2025, 4, 16),
            total_students: 24,
            public_description: 'Learning About Microservices',
        },
        {
            id: 1,
            name: 'DevSecOps',
            course_code: 'SWE 4511',
            start_at: new Date(2025, 0, 21),
            end_at: new Date(2025, 4, 16),
            total_students: 32,
            public_description: 'Learning About DevSecOps'
        },
        {
            id: 2,
            name: 'Databases',
            course_code: 'CSC 3320',
            start_at: new Date(2025, 0, 16),
            end_at: new Date(2025, 4, 17),
            total_students: 16,
            public_description: 'Learning About Databases'
        }
    ]
    return courses
}

export const get_assignment_groups = async (canvas_domain: string, access_token: string, course_id: number) => {
    // return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignment_groups`,
    //     { headers: {Authorization: `Bearer ${access_token}`}}
    // )
    //     .then(intercept)
    //     .then(toJSON<CanvasAssignmentGroup[]>)
    canvas_domain
    access_token
    const assignment_groups: CanvasAssignmentGroup[] = []
    switch (course_id) {
        case (0): {
            assignment_groups.push({
                id: 0,
                name: 'Labs',
                course_id: 0,
                group_weight: 30,
                position: 0
            })
            assignment_groups.push({
                id: 1,
                name: 'Final Project',
                course_id: 0,
                group_weight: 40,
                position: 1
            })
            break
        }
        case (1): {
            assignment_groups.push({
                id: 2,
                name: 'Labs',
                course_id: 1,
                group_weight: 60,
                position: 0
            })
            assignment_groups.push({
                id: 3,
                name: 'Reading Quizzes',
                course_id: 1,
                group_weight: 20,
                position: 1
            })
            break
        }
        case (2): {
            assignment_groups.push({
                id: 4,
                name: 'Labs',
                course_id: 2,
                group_weight: 30,
                position: 0
            })
            assignment_groups.push({
                id: 5,
                name: 'Assignments',
                course_id: 2,
                group_weight: 20,
                position: 1
            })
        }
    }
    return assignment_groups
}

export const get_assignments = async (canvas_domain: string, access_token: string, course_id: number, assignment_group_id: number) => {
    // return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignment_groups/${assignment_group_id}/assignments`,
    //     { headers: {Authorization: `Bearer ${access_token}`}}
    // )
    //     .then(intercept)
    //     .then(toJSON<CanvasAssignment[]>)
    canvas_domain
    access_token
    const assignments: CanvasAssignment[] = []
    switch (course_id) {
        case (0): {
            if (assignment_group_id === 0) {
                assignments.push({
                    id: 0,
                    name: 'Lab 1',
                    assignment_group_id: 1,
                    course_id: 0,
                    description: 'Lab 1 Description',
                    unlock_at: new Date(2025, 0, 22),
                    due_at: new Date(2025, 0, 29),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: ['online_upload'],
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
                assignments.push({
                    id: 1,
                    name: 'Lab 2',
                    assignment_group_id: 1,
                    course_id: 0,
                    description: 'Lab 2 Description',
                    unlock_at: new Date(2025, 0, 29),
                    due_at: new Date(2025, 1, 5),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: ['online_upload'],
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
            }
            if (assignment_group_id === 1) {
                assignments.push({
                    id: 2,
                    name: 'Project Proposal',
                    assignment_group_id: 1,
                    course_id: 0,
                    description: 'Project Proposal Description',
                    unlock_at: new Date(2025, 2, 28),
                    due_at: new Date(2025, 3, 7),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: ['online_upload'],
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
                assignments.push({
                    id: 3,
                    name: 'Week 13 Update',
                    assignment_group_id: 1,
                    course_id: 0,
                    description: 'Week 13 Update Description',
                    unlock_at: new Date(2025, 3, 7),
                    due_at: new Date(2025, 3, 23),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: ['online_upload'],
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
            }
            break
        }
        case (1): {
            if (assignment_group_id === 2) {
                assignments.push({
                    id: 4,
                    name: 'Lab 1',
                    assignment_group_id: 2,
                    course_id: 1,
                    description: 'Lab 1 Description',
                    unlock_at: new Date(2025, 0, 22),
                    due_at: new Date(2025, 0, 29),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: 'online_upload',
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
                assignments.push({
                    id: 5,
                    name: 'Lab 2',
                    assignment_group_id: 2,
                    course_id: 1,
                    description: 'Lab 2 Description',
                    unlock_at: new Date(2025, 0, 29),
                    due_at: new Date(2025, 1, 5),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 10,
                    submission_types: 'online_upload',
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
            }
            if (assignment_group_id === 3) {
                assignments.push({
                    id: 6,
                    name: 'DevOps Handbook Reading 1',
                    assignment_group_id: 3,
                    course_id: 1,
                    description: 'DevOps Handbook Quiz Description',
                    unlock_at: new Date(2025, 0, 24),
                    due_at: new Date(2025, 0, 31),
                    updated_at: new Date(2025, 0, 22),
                    position: 0,
                    points_possible: 5,
                    submission_types: 'online_upload',
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
                assignments.push({
                    id: 7,
                    name: 'Learning DevSecOps Reading 1',
                    assignment_group_id: 3,
                    course_id: 1,
                    description: 'Learning DevSecOps Quiz Description',
                    unlock_at: new Date(2025, 0, 31),
                    due_at: new Date(2025, 0, 29),
                    updated_at: new Date(2025, 1, 7),
                    position: 0,
                    points_possible: 5,
                    submission_types: 'online_upload',
                    published: true,
                    allowed_attempts: 1,
                    is_quiz_assignment: false,
                })
            }
        }
    }

    return assignments
}

export const get_submissions = async (canvas_domain: string, access_token: string, course_id: number, assignment_id: number) => {
    // return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignments/${assignment_id}/submissions?include[]=submission_history`,
    //     { headers: {Authorization: `Bearer ${access_token}`}}
    // )
    //     .then(intercept)
    //     .then(toJSON<CanvasSubmission[]>)
    canvas_domain
    access_token
    course_id
    const submissions: CanvasSubmission[] = []
    switch (assignment_id) {
        case (0): {
            submissions.push({
                assignment_id: 0,
                attempt: 1,
                score: 10,
                submitted_at: new Date(2025, 0, 29, 11, 59, 59),
                user_id: 0,
                late: false,
                excused: false,
                missing: false,
                late_policy_status: 'none',
                anonymous_id: randomUUID()
            })
            submissions.push({
                assignment_id: 0,
                attempt: 1,
                score: 10,
                submitted_at: new Date(2025, 0, 30, 11, 59, 59),
                user_id: 1,
                late: true,
                excused: false,
                missing: false,
                late_policy_status: 'none',
                anonymous_id: randomUUID()
            })
            break
        }
        case (1): {
            submissions.push({
                assignment_id: 1,
                attempt: 1,
                score: 9,
                submitted_at: new Date(2025, 1, 3, 11, 59, 59),
                user_id: 0,
                late: false,
                excused: false,
                missing: false,
                late_policy_status: 'none',
                anonymous_id: randomUUID()
            })
            submissions.push({
                assignment_id: 1,
                attempt: 1,
                score: 4,
                submitted_at: new Date(2025, 1, 7, 11, 59, 59),
                user_id: 1,
                late: true,
                excused: false,
                missing: false,
                late_policy_status: 'none',
                anonymous_id: randomUUID()
            })
            break
        }
    }
    return submissions
}