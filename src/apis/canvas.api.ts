import type {CanvasCourse} from '../types/canvas_api/course.ts'
import type {CanvasAssignment, CanvasAssignmentGroup} from "../types/canvas_api/assignment.ts";
import type {CanvasSubmission} from "../types/canvas_api/submission.ts";

export function handleDates(body: unknown) {
    if (body === null || body === undefined || typeof body !== 'object') return

    for (const key of Object.keys(body)) {
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
    return await fetch(`${canvas_domain}/api/v1/courses?exclude_blueprint_courses&per_page=1000&include=syllabus_body,public_description,total_students`,
        { headers: {Authorization: `Bearer ${access_token}`}}
    )
        .then(intercept)
        .then(toJSON<CanvasCourse[]>)
}

export const get_assignment_groups = async (canvas_domain: string, access_token: string, course_id: number) => {
    return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignment_groups`,
        { headers: {Authorization: `Bearer ${access_token}`}}
    )
        .then(intercept)
        .then(toJSON<CanvasAssignmentGroup[]>)
}

export const get_assignments = async (canvas_domain: string, access_token: string, course_id: number, assignment_group_id: number) => {
    return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignment_groups/${assignment_group_id}/assignments`,
        { headers: {Authorization: `Bearer ${access_token}`}}
    )
        .then(intercept)
        .then(toJSON<CanvasAssignment[]>)
}

export const get_submissions = async (canvas_domain: string, access_token: string, course_id: number, assignment_id: number) => {
    return await fetch(`${canvas_domain}/api/v1/courses/${course_id}/assignments/${assignment_id}/submissions?include[]=submission_history`,
        { headers: {Authorization: `Bearer ${access_token}`}}
    )
        .then(intercept)
        .then(toJSON<CanvasSubmission[]>)
}