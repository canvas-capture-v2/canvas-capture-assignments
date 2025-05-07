import type {AssignmentGroup, DateStatistics, ScoreStatistic} from "./AssignmentTypes.ts";

export type Course = {
    id: number
    name: string
    course_code: string
    start_at: Date
    end_at: Date
    total_students: number
    syllabus_body?: string
    public_description?: string
    assignment_groups: AssignmentGroup[]
    date_statistics: DateStatistics
    score_statistics: ScoreStatistic
    points_possible: number
    weight: number
}