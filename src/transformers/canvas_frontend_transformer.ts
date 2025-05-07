import type {Course} from "../types/front_end/CourseTypes.ts";
import type {CanvasCourse} from "../types/canvas_api/course.ts";
import type {CanvasAssignment, CanvasAssignmentGroup, ScoreStatistic} from "../types/canvas_api/assignment.ts";
import type {Assignment, AssignmentGroup} from "../types/front_end/AssignmentTypes.ts";
import type {CanvasSubmission, SubmissionType} from "../types/canvas_api/submission.ts";
import type {Submission} from "../types/front_end/SubmissionTypes.ts";
import {
    add_time_strings,
    compare_time_strings,
    divide_time_strings,
    millis_to_time_string
} from "../utils/date_utils.ts";

export const get_num_assignments_due_per_day = (assignments: CanvasAssignment[], start_date: Date, end_date: Date): number => {
    let num_assignments_due_per_day = 0
    let num_days = (((((end_date.getTime() - start_date.getDay()) / 1000) / 60) / 60) / 24)
    for (let i = 0; i < num_days; i++) {
        assignments.map((canvas_assignment) => {
            if (canvas_assignment.due_at !== undefined && canvas_assignment.due_at !== null) {
                if (canvas_assignment.unlock_at !== undefined && canvas_assignment.unlock_at !== null) {
                    if (new Date(canvas_assignment.unlock_at).getTime() > start_date.getTime() && end_date.getTime() > new Date(canvas_assignment.due_at).getTime()) {
                        num_assignments_due_per_day += 1
                    }
                } else if (new Date(canvas_assignment.created_at).getTime() > start_date.getTime() && end_date.getTime() > new Date(canvas_assignment.due_at).getTime()) {
                    num_assignments_due_per_day += 1
                }
            }
        })
    }


    return num_assignments_due_per_day
}

export const transformer = (canvas_courses: CanvasCourse[], canvas_assignment_groups: Map<number, CanvasAssignmentGroup[]>, canvas_assignments: Map<number, CanvasAssignment[]>, canvas_submissions: Map<number, CanvasSubmission[]>): Course[] => {
    const courses: Course[] = []
    canvas_courses.map((canvas_course) => {
        const course_assignment_groups: CanvasAssignmentGroup[] | undefined = canvas_assignment_groups.get(canvas_course.id)
        if (course_assignment_groups !== undefined && course_assignment_groups !== null && course_assignment_groups.length > 0) {
            const assignment_groups: AssignmentGroup[] = []
            const course_assignments_array: CanvasAssignment[] = []
            const course_score_statistics: ScoreStatistic = {
                min: 0,
                max: 0,
                mean: 0,
                upper_q: 0,
                median: 0,
                lower_q: 0
            }
            let course_points_possible = 0 // done
            let course_weight = 0 // done
            let course_num_assignments = 0 // done
            let course_scores: number[] = [] // done
            let course_num_late = 0 // done
            let course_num_assignments_due: number
            let course_time_assigned_to_due = '0 D 0 H 0 M 0 S 0 Ms' // done
            let course_time_last_past_due = '0 D 0 H 0 M 0 S 0 Ms' // done
            let course_time_last_to_grade = '0 D 0 H 0 M 0 S 0 Ms' // done
            let course_earliest_assign_date = new Date(2100, 11, 31)
            let course_latest_due_date = new Date(1900, 0, 1)
            course_assignment_groups.map((course_assignment_group) => {
                const course_assignments: CanvasAssignment[] | undefined = canvas_assignments.get(course_assignment_group.id)
                if (course_assignments !== undefined && course_assignments !== null && course_assignments.length > 0) {
                    const assignment_group_assignments: Assignment[] = [] // done
                    let assignment_group_points_possible = 0 // done
                    const assignment_group_score_statistics: ScoreStatistic = {
                        min: 1000000,
                        max: -1,
                        mean: 0,
                        upper_q: 0,
                        median: 0,
                        lower_q: 0
                    } // done
                    let assignment_group_num_late = 0
                    let assignment_group_num_submissions = 0
                    let assignment_group_scores: number[] = []
                    let assignment_group_avg_num_assignments_due = 0
                    let assignment_group_avg_time_assigned_to_due = '0 D 0 H 0 M 0 S 0 Ms' // done
                    let assignment_group_avg_time_last_past_due = '0 D 0 H 0 M 0 S 0 Ms' // done
                    let assignment_group_avg_time_last_to_grade = '0 D 0 H 0 M 0 S 0 Ms' // done
                    let assignment_group_earliest_assign_date = new Date(2100,11,31)
                    let assignment_group_latest_due_date = new Date(1900, 0, 1)
                    course_assignments.map((course_assignment) => {
                        const assignment_submissions: Submission[] = []
                        let low_submission: Submission
                        let median_submission: Submission
                        let high_submission: Submission
                        let last_submission_date: Date = new Date(1900, 0, 1)
                        let last_graded_date: Date = new Date(1900, 0, 1)
                        let late_submissions = 0
                        let avg_submission_time = '0 D 0 H 0 M 0 S 0 Ms'
                        let avg_time_to_grade = '0 D 0 H 0 M 0 S 0 Ms'
                        let latest_submission_time = '0 D 0 H 0 M 0 S 0 Ms'
                        const assignment_score_statistics = {
                            min: 1000000,
                            max: -1,
                            mean: 0,
                            upper_q: 0,
                            median: 0,
                            lower_q: 0
                        }
                        const user_submissions = new Map<number, number>()
                        let avg_submissions_per_user = 0
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
                                avg_submission_time = add_time_strings(avg_submission_time, time_late)
                                avg_time_to_grade = add_time_strings(avg_time_to_grade, time_to_grade)
                                assignment_submissions.push(submission)
                                const user_submissions_count = user_submissions.get(submission.user_id)
                                if (user_submissions_count !== undefined) {
                                    user_submissions.set(submission.user_id, user_submissions_count + 1)
                                } else {
                                    user_submissions.set(submission.user_id, 1)
                                }
                                assignment_score_statistics.mean += submission.score
                                assignment_group_score_statistics.mean += submission.score
                                course_score_statistics.mean += submission.score
                                assignment_group_scores.push(course_submission.score)
                                assignment_group_num_submissions += 1
                                if (late_policy_status != 'none') {
                                    assignment_group_num_late += 1
                                }
                                if (compare_time_strings(latest_submission_time, submission.time_late) > 0) {
                                    latest_submission_time = submission.time_late
                                }

                                if (course_submission.submitted_at !== undefined && course_submission.submitted_at !== null) {
                                    if (new Date(course_submission.submitted_at).getTime() > last_graded_date.getTime()) {
                                        last_submission_date = new Date(course_submission.submitted_at)
                                    }
                                }

                                if (course_submission.graded_at !== undefined && course_submission.graded_at !== null) {
                                    if (new Date(course_submission.graded_at).getTime() > last_graded_date.getTime()) {
                                        last_graded_date = new Date(course_submission.graded_at)
                                    }
                                }

                                if (course_assignment.unlock_at !== undefined && course_assignment.unlock_at !== null) {
                                    if (assignment_group_earliest_assign_date.getTime() > new Date(course_assignment.unlock_at).getTime()) {
                                        assignment_group_earliest_assign_date = new Date(course_assignment.unlock_at)
                                    }
                                    if (course_earliest_assign_date.getTime() > new Date(course_assignment.unlock_at).getTime()) {
                                        course_earliest_assign_date = new Date(course_assignment.unlock_at)
                                    }
                                } else {
                                    if (assignment_group_earliest_assign_date.getTime() > new Date(course_assignment.created_at).getTime()) {
                                        assignment_group_earliest_assign_date = new Date(course_assignment.created_at)
                                    }
                                }
                                if (course_assignment.due_at !== undefined && course_assignment.due_at !== null) {
                                    if (new Date(course_assignment.due_at).getTime() > assignment_group_latest_due_date.getTime()) {
                                        assignment_group_latest_due_date = new Date(course_assignment.due_at)
                                    }
                                    if (new Date(course_assignment.due_at).getTime() > course_latest_due_date.getTime()) {
                                        course_latest_due_date = new Date(course_assignment.due_at)
                                    }
                                }

                                if (submission.score < assignment_group_score_statistics.min) {
                                    assignment_group_score_statistics.min = submission.score
                                }
                                if (submission.score < course_score_statistics.min) {
                                    course_score_statistics.min = submission.score
                                }
                                if (submission.score > assignment_group_score_statistics.max) {
                                    assignment_group_score_statistics.max = submission.score
                                }
                                if (submission.score > course_score_statistics.max) {
                                    course_score_statistics.max = submission.score
                                }
                                course_scores.push(submission.score)
                            })
                            assignment_score_statistics.mean = assignment_score_statistics.mean / course_submissions.length
                            const sort_submissions = assignment_submissions.slice().sort((a, b) => a.score - b.score)
                            low_submission = sort_submissions[0]
                            assignment_score_statistics.min = low_submission.score
                            high_submission = sort_submissions[sort_submissions.length - 1]
                            assignment_score_statistics.max = high_submission.score
                            median_submission = sort_submissions[Math.floor(sort_submissions.length / 2)]
                            assignment_score_statistics.median = median_submission.score

                            const up_pos = (sort_submissions.length - 1) * 0.75
                            const up_ind = Math.floor(up_pos)
                            const up_rem = up_pos - up_ind
                            if (sort_submissions[up_ind + 1] !== undefined) {
                                assignment_score_statistics.upper_q = sort_submissions[up_ind].score + (up_rem * (sort_submissions[up_ind + 1].score - sort_submissions[up_ind].score))
                            } else {
                                assignment_score_statistics.upper_q = sort_submissions[up_ind].score
                            }

                            const low_pos = (sort_submissions.length - 1) * 0.25
                            const low_ind = Math.floor(low_pos)
                            const low_rem = low_pos - low_ind
                            if (sort_submissions[low_ind + 1] !== undefined) {
                                assignment_score_statistics.lower_q = sort_submissions[low_ind].score + (low_rem * (sort_submissions[low_ind + 1].score - sort_submissions[low_ind].score))
                            }

                            user_submissions.forEach(value => avg_submissions_per_user += value)
                            avg_submissions_per_user = avg_submissions_per_user / user_submissions.size
                            avg_submission_time = divide_time_strings(avg_submission_time, course_submissions.length)
                            avg_time_to_grade = divide_time_strings(avg_time_to_grade, course_submissions.length)

                            const real_stats: boolean = assignment_score_statistics.mean    !== null && !isNaN(parseFloat(assignment_score_statistics.mean.toString())) &&
                                                        assignment_score_statistics.max     !== null && !isNaN(parseFloat(assignment_score_statistics.max.toString())) &&
                                                        assignment_score_statistics.min     !== null && !isNaN(parseFloat(assignment_score_statistics.min.toString())) &&
                                                        assignment_score_statistics.median  !== null && !isNaN(parseFloat(assignment_score_statistics.lower_q.toString())) &&
                                                        assignment_score_statistics.lower_q !== null && !isNaN(parseFloat(assignment_score_statistics.median.toString())) &&
                                                        assignment_score_statistics.upper_q !== null && !isNaN(parseFloat(assignment_score_statistics.upper_q.toString()))

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
                                score_statistics: real_stats ? assignment_score_statistics : undefined,
                                is_quiz_assignment: course_assignment.is_quiz_assignment,
                                submissions: assignment_submissions,
                                low_submission: low_submission,
                                median_submission: median_submission,
                                high_submission: high_submission,
                                last_submission_date: last_submission_date,
                                last_graded_date: last_graded_date,
                                num_late_submissions: late_submissions,
                                avg_submissions_per_user: avg_submissions_per_user,
                                avg_submission_time: avg_submission_time,
                                avg_time_to_grade: avg_time_to_grade
                            }
                            assignment_group_assignments.push(assignment)
                            course_assignments_array.push(course_assignment)

                            assignment_group_points_possible += course_assignment.points_possible
                            course_points_possible += course_assignment.points_possible

                            assignment_group_avg_time_assigned_to_due = add_time_strings(assignment_group_avg_time_assigned_to_due, millis_to_time_string(new Date(assignment.due_at).getTime() - new Date(assignment.unlock_at).getTime()))
                            course_time_assigned_to_due = add_time_strings(course_time_assigned_to_due, millis_to_time_string(new Date(assignment.due_at).getTime() - new Date(assignment.unlock_at).getTime()))

                            assignment_group_avg_time_last_past_due = add_time_strings(assignment_group_avg_time_last_past_due, latest_submission_time)
                            course_time_last_past_due = add_time_strings(course_time_last_past_due, latest_submission_time)

                            assignment_group_avg_time_last_to_grade = add_time_strings(assignment_group_avg_time_last_to_grade, millis_to_time_string(last_graded_date.getTime() - last_submission_date.getTime()))
                            course_time_last_to_grade = add_time_strings(course_time_last_to_grade, millis_to_time_string(last_graded_date.getTime() - last_submission_date.getTime()))

                            course_num_late += assignment_group_num_late
                        }
                    })

                    assignment_group_scores = assignment_group_scores.slice().sort()
                    assignment_group_score_statistics.median = assignment_group_scores[Math.floor(assignment_group_scores.length / 2)]

                    const up_pos = (assignment_group_scores.length - 1) * 0.75
                    const up_ind = Math.floor(up_pos)
                    const up_rem = up_pos - up_ind
                    if (assignment_group_scores[up_ind+1] !== undefined) {
                        assignment_group_score_statistics.upper_q = assignment_group_scores[up_ind] + (up_rem * (assignment_group_scores[up_ind+1] - assignment_group_scores[up_ind]))
                    } else {
                        assignment_group_score_statistics.upper_q = assignment_group_scores[up_ind]
                    }

                    const low_pos = (assignment_group_scores.length - 1) * 0.25
                    const low_ind = Math.floor(low_pos)
                    const low_rem = low_pos - low_ind
                    if (assignment_group_scores[low_ind+1] !== undefined) {
                        assignment_group_score_statistics.lower_q = assignment_group_scores[low_ind] + (low_rem * (assignment_group_scores[low_ind+1] - assignment_group_scores[low_ind]))
                    } else {
                        assignment_group_score_statistics.lower_q = assignment_group_scores[low_ind]
                    }

                    assignment_group_avg_time_last_past_due = divide_time_strings(assignment_group_avg_time_last_past_due, course_assignments.length)
                    assignment_group_avg_time_last_to_grade = divide_time_strings(assignment_group_avg_time_last_to_grade, course_assignments.length)
                    assignment_group_avg_time_assigned_to_due = divide_time_strings(assignment_group_avg_time_assigned_to_due, course_assignments.length)
                    assignment_group_avg_num_assignments_due = get_num_assignments_due_per_day(course_assignments, assignment_group_earliest_assign_date, assignment_group_latest_due_date) / assignment_group_assignments.length

                    const real_score_stats: boolean = assignment_group_score_statistics.mean    !== null && !isNaN(parseFloat(assignment_group_score_statistics.mean.toString())) &&
                                                      assignment_group_score_statistics.max     !== null && !isNaN(parseFloat(assignment_group_score_statistics.max.toString())) &&
                                                      assignment_group_score_statistics.min     !== null && !isNaN(parseFloat(assignment_group_score_statistics.min.toString())) &&
                                                      assignment_group_score_statistics.median  !== null && !isNaN(parseFloat(assignment_group_score_statistics.median.toString())) &&
                                                      assignment_group_score_statistics.upper_q !== null && !isNaN(parseFloat(assignment_group_score_statistics.upper_q.toString())) &&
                                                      assignment_group_score_statistics.lower_q !== null && !isNaN(parseFloat(assignment_group_score_statistics.lower_q.toString()))

                    const real_date_stats: boolean = assignment_group_num_late !== null &&
                                                     assignment_group_num_submissions !== null &&
                                                     assignment_group_avg_num_assignments_due !== null &&
                                                     !assignment_group_avg_time_last_past_due.includes('NaN') &&
                                                     !assignment_group_avg_time_last_to_grade.includes('NaN') &&
                                                     !assignment_group_avg_time_assigned_to_due.includes('NaN')

                    const assignment_group: AssignmentGroup = {
                        id: course_assignment_group.id,
                        course_id: canvas_course.id,
                        name: course_assignment_group.name,
                        assignments: assignment_group_assignments,
                        position: course_assignment_group.position,
                        group_weight: course_assignment_group.group_weight,
                        points_possible: assignment_group_points_possible,
                        score_statistics: real_score_stats ? assignment_group_score_statistics : undefined,
                        date_statistics: real_date_stats ? {
                            avg_num_assignments_due_per_day: assignment_group_avg_num_assignments_due,
                            avg_time_assigned_to_due: assignment_group_avg_time_assigned_to_due,
                            avg_time_last_past_due: assignment_group_avg_time_last_past_due,
                            avg_time_last_to_grade: assignment_group_avg_time_last_to_grade,
                            avg_num_late: assignment_group_num_late,
                            avg_submissions: assignment_group_num_submissions
                        } : undefined
                    }
                    assignment_groups.push(assignment_group)


                    course_weight += assignment_group.group_weight
                    course_points_possible += assignment_group.points_possible
                    course_num_assignments += assignment_group.assignments.length
                }
            })
            course_time_last_past_due = divide_time_strings(course_time_last_past_due, course_num_assignments)
            course_time_last_to_grade = divide_time_strings(course_time_last_to_grade, course_num_assignments)
            course_time_assigned_to_due = divide_time_strings(course_time_assigned_to_due, course_num_assignments)
            course_num_assignments_due = get_num_assignments_due_per_day(course_assignments_array, course_earliest_assign_date, course_latest_due_date) / course_num_assignments

            course_score_statistics.mean = course_score_statistics.mean / course_scores.length

            course_num_late = course_num_late / course_scores.length
            course_num_assignments = course_scores.length / course_num_assignments

            const real_score_stats: boolean = course_score_statistics.mean    !== null && !isNaN(parseFloat(course_score_statistics.mean.toString())) &&
                                              course_score_statistics.max     !== null && !isNaN(parseFloat(course_score_statistics.max.toString())) &&
                                              course_score_statistics.min     !== null && !isNaN(parseFloat(course_score_statistics.min.toString())) &&
                                              course_score_statistics.median  !== null && !isNaN(parseFloat(course_score_statistics.median.toString())) &&
                                              course_score_statistics.lower_q !== null && !isNaN(parseFloat(course_score_statistics.lower_q.toString())) &&
                                              course_score_statistics.upper_q !== null && !isNaN(parseFloat(course_score_statistics.upper_q.toString()))

            const real_date_stats: boolean = course_num_assignments_due !== null && !isNaN(parseFloat(course_num_assignments_due.toString())) &&
                                             course_num_late            !== null && !isNaN(parseFloat(course_num_late.toString())) &&
                                             course_num_assignments     !== null && !isNaN(parseFloat(course_num_assignments.toString())) &&
                                             !course_time_assigned_to_due.includes('NaN') &&
                                             !course_time_last_past_due.includes('NaN') &&
                                             !course_time_last_to_grade.includes('NaN')

            const course: Course = {
                id: canvas_course.id,
                name: canvas_course.name,
                course_code: canvas_course.course_code,
                start_at: canvas_course.start_at ? canvas_course.start_at : canvas_course.term?.start_at ? canvas_course.term.start_at : new Date(),
                end_at: canvas_course.end_at ? canvas_course.end_at : canvas_course.term?.end_at ? canvas_course.term.end_at : new Date(),
                total_students: canvas_course.total_students ? canvas_course.total_students : 0,
                assignment_groups: assignment_groups,
                date_statistics: real_date_stats ? {
                    avg_num_assignments_due_per_day: course_num_assignments_due,
                    avg_time_assigned_to_due: course_time_assigned_to_due,
                    avg_time_last_past_due: course_time_last_past_due,
                    avg_time_last_to_grade: course_time_last_to_grade,
                    avg_num_late: course_num_late,
                    avg_submissions: course_num_assignments
                } : undefined,
                score_statistics: real_score_stats ? course_score_statistics : undefined,
                points_possible: course_points_possible,
                weight: course_weight
            }
            courses.push(course)
        }
    })

    return courses
}