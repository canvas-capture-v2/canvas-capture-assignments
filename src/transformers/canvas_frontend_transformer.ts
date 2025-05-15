import type {Course, CanvasCourse, CanvasAssignment, CanvasAssignmentGroup, AssignmentGroup, Assignment, CanvasSubmission, SubmissionType, Submission} from "@canvas-capture-v2/canvas-capture-common";
import {millis_to_time_string} from "@canvas-capture-v2/canvas-capture-common";

export const transformer = (user_id: number, canvas_courses: CanvasCourse[], canvas_assignment_groups: Map<number, CanvasAssignmentGroup[]>, canvas_assignments: Map<number, CanvasAssignment[]>, canvas_submissions: Map<number, CanvasSubmission[]>): Course[] => {
    const courses: Course[] = []
    canvas_courses.map((canvas_course) => {
        const course_assignment_groups: CanvasAssignmentGroup[] | undefined = canvas_assignment_groups.get(canvas_course.id)
        if (course_assignment_groups !== undefined && course_assignment_groups !== null && course_assignment_groups.length > 0) {
            const assignment_groups: AssignmentGroup[] = []
            let course_points_possible = 0 // done
            let course_weight = 0 // done
            course_assignment_groups.map((course_assignment_group) => {
                const course_assignments: CanvasAssignment[] | undefined = canvas_assignments.get(course_assignment_group.id)
                if (course_assignments !== undefined && course_assignments !== null && course_assignments.length > 0) {
                    const assignment_group_assignments: Assignment[] = [] // done
                    let assignment_group_points_possible = 0 // done
                    course_assignments.map((course_assignment) => {
                        const assignment_submissions: Submission[] = []
                        const course_submissions: CanvasSubmission[] | undefined = canvas_submissions.get(course_assignment.id)
                        if (course_submissions !== undefined && course_submissions !== null && course_submissions.length > 0) {
                            course_submissions.map((course_submission) => {
                                const late_policy_status = course_submission.late_policy_status ? course_submission.late_policy_status : course_submission.late ? 'late' : course_submission.excused ? 'extended' : course_submission.missing ? 'missing' : 'none'
                                const time_late = millis_to_time_string(course_submission.seconds_late * 1000)
                                const time_to_grade = course_assignment.due_at !== undefined && course_assignment.due_at !== null && course_submission.graded_at !== undefined && course_submission.graded_at !== null ? millis_to_time_string(new Date(course_submission.graded_at).getTime() - new Date(course_assignment.due_at).getTime()) : '0 D 0 H 0 M 0 S 0 Ms'
                                const submission: Submission = {
                                    assignment_id: course_assignment.id,
                                    attempt: course_submission.attempt,
                                    score: course_submission.score,
                                    submitted_at: course_submission.submitted_at,
                                    user_id: course_submission.user_id,
                                    late: course_submission.late,
                                    excused: course_submission.excused,
                                    missing: course_submission.missing,
                                    late_policy_status: late_policy_status,
                                    anonymous_id: course_submission.anonymous_id,
                                    time_late: time_late,
                                    time_to_grade: time_to_grade
                                }
                                assignment_submissions.push(submission)
                            })

                            const assignment: Assignment = {
                                id: course_assignment.id,
                                name: course_assignment.name,
                                description: course_assignment.description,
                                updated_at: course_assignment.updated_at,
                                due_at: course_assignment.due_at ? course_assignment.due_at : new Date(),
                                unlock_at: course_assignment.unlock_at ? course_assignment.unlock_at : new Date(),
                                course_id: course_assignment.course_id,
                                assignment_group_id: course_assignment.assignment_group_id,
                                position: course_assignment.position,
                                points_possible: course_assignment.points_possible,
                                submission_types: course_assignment.submission_types as SubmissionType[],
                                has_submitted_submissions: course_assignment.has_submitted_submissions,
                                published: course_assignment.published,
                                allowed_attempts: course_assignment.allowed_attempts,
                                is_quiz_assignment: course_assignment.is_quiz_assignment,
                                submissions: assignment_submissions,
                            }
                            assignment_group_assignments.push(assignment)

                            assignment_group_points_possible += course_assignment.points_possible
                            course_points_possible += course_assignment.points_possible

                        }
                    })

                    const assignment_group: AssignmentGroup = {
                        id: course_assignment_group.id,
                        course_id: canvas_course.id,
                        name: course_assignment_group.name,
                        assignments: assignment_group_assignments,
                        position: course_assignment_group.position,
                        group_weight: course_assignment_group.group_weight,
                        points_possible: assignment_group_points_possible,
                    }
                    assignment_groups.push(assignment_group)


                    course_weight += assignment_group.group_weight
                    course_points_possible += assignment_group.points_possible
                }
            })
            const course: Course = {
                id: canvas_course.id,
                name: canvas_course.name,
                course_code: canvas_course.course_code,
                start_at: canvas_course.start_at ? canvas_course.start_at : canvas_course.term?.start_at ? canvas_course.term.start_at : new Date(),
                end_at: canvas_course.end_at ? canvas_course.end_at : canvas_course.term?.end_at ? canvas_course.term.end_at : new Date(),
                total_students: canvas_course.total_students ? canvas_course.total_students : 0,
                assignment_groups: assignment_groups,
                points_possible: course_points_possible,
                weight: course_weight,
                user_id: user_id
            }
            courses.push(course)
        }
    })

    return courses
}