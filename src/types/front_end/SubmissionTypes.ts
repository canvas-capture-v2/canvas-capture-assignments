
export type Submission = {
    assignment_id: number
    attempt: number
    body?: string
    score: number
    submission_comments?: SubmissionComment[] | null
    submitted_at: Date
    user_id: number
    late: boolean
    excused: boolean
    missing: boolean
    late_policy_status: 'late' | 'missing' | 'extended' | 'none'
    anonymous_id: string
    time_late: string
    time_to_grade: string
}

export type SubmissionComment = {
    id: number
    author_name: string
    comment: string
    created_at: Date
    edited_at: Date
}