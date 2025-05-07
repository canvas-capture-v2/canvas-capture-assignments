/**
 * Defines a type matching the quiz submission-related
 * portion of the Canvas API
 */
export type QuizSubmission = {
    // The unique identifier for the quiz submission.
    id: number
    // The ID of the quiz associated with the submission.
    quiz_id: number
    // The version of the quiz associated with the submission.
    quiz_version: number
    // The ID of the user who submitted the quiz, or null if not available.
    user_id: number | null
    // The ID of the submission, if available.
    submission_id: number | null
    // The score obtained in the quiz, or null if not available.
    score: number | null
    // The score kept for the submission, if applicable.
    kept_score: number | null
    // The date and time when the quiz submission started.
    started_at: Date | null
    // The date and time when the quiz submission ended, if available.
    end_at: Date | null
    // The date and time when the quiz submission was finished, if available.
    finished_at: Date | null
    // The attempt number for the submission.
    attempt: number
    // The current state of the submission.
    workflow_state: string
    // The fudge points applied to the submission, if any.
    fudge_points: number | null
    // The maximum points possible for the quiz.
    quiz_points_possible: number
    // The number of extra attempts allowed for the submission, if any.
    extra_attempts: number | null
    // The extra time granted for the submission, if any.
    extra_time: number | null
    // Indicates if the submission was manually unlocked.
    manually_unlocked: boolean | null
    // The validation token associated with the submission.
    validation_token: string
    // The score before regrading, if applicable.
    score_before_regrade: number | null
    // Indicates if the user has seen the results.
    has_seen_results: boolean | null
    // The time spent on the quiz submission.
    time_spent: number | null
    // The number of attempts left for the submission.
    attempts_left: number
    // Indicates if the submission is overdue and needs submission.
    overdue_and_needs_submission: boolean
    // Indicates if the submission is excused.
    excused: boolean | null
    // The URL for accessing the quiz submission.
    html_url: string
    // The URL for the result
    result_url: string
}
