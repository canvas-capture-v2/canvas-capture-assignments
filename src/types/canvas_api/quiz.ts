/**
 * Defines a type matching the quiz-related
 * portion of the Canvas API
 */
export type Quiz = {
    // The unique identifier for the quiz.
    id: number
    // The title of the quiz.
    title: string
    // The URL for accessing the quiz in a web browser.
    html_url: string
    // The URL for accessing the quiz in a mobile browser.
    mobile_url: string
    // The description of the quiz.
    description: string
    // The type of the quiz.
    quiz_type: string
    // The time limit for completing the quiz, if any.
    time_limit: number | null
    // Indicates if the timer auto-submit feature is disabled.
    timer_autosubmit_disabled: boolean
    // Indicates if answers are shuffled for the quiz.
    shuffle_answers: boolean
    // Indicates if correct answers are shown after submission.
    show_correct_answers: boolean
    // The scoring policy for the quiz.
    scoring_policy: string
    // The number of attempts allowed for the quiz.
    allowed_attempts: number
    // Indicates if only one question can be answered at a time.
    one_question_at_a_time: boolean
    // The number of questions in the quiz.
    question_count: number
    // The maximum points possible for the quiz.
    points_possible: number
    // Indicates if users can't navigate back to previous questions.
    cant_go_back: boolean
    // The access code required to access the quiz.
    access_code: string | null
    // The IP filter applied to the quiz.
    ip_filter: string | null
    // The due date for the quiz.
    due_at: Date | null
    // The lock date for the quiz.
    lock_at: Date | null
    // The unlock date for the quiz.
    unlock_at: Date | null
    // Indicates if the quiz is published.
    published: boolean
    // Indicates if the quiz can be unpublished.
    unpublishable: boolean
    // Indicates if the quiz is locked for the user.
    locked_for_user: boolean
    // Information about the quiz lock.
    lock_info: {
        missing_permission: string
        asset_string: string
    }
    // Explanation for why the quiz is locked.
    lock_explanation: string
    // Indicates if results are hidden for the quiz.
    hide_results: boolean | null
    // The date when correct answers are shown.
    show_correct_answers_at: Date | null
    // The date when correct answers are hidden.
    hide_correct_answers_at: Date | null
    // Dates associated with the quiz.
    all_dates: {
        due_at: Date | null
        unlock_at: Date | null
        lock_at: Date | null
        base: boolean
    }[]
    // Indicates if the quiz can be unpublished.
    can_unpublish: boolean
    // Indicates if the quiz can be updated.
    can_update: boolean
    // Indicates if a lockdown browser is required for the quiz.
    require_lockdown_browser: boolean
    // Indicates if a lockdown browser is required to view results.
    require_lockdown_browser_for_results: boolean
    // Indicates if a lockdown browser monitor is required for the quiz.
    require_lockdown_browser_monitor: boolean
    // Data related to lockdown browser monitoring.
    lockdown_browser_monitor_data: unknown
    // The URL for speed grader associated with the quiz.
    speed_grader_url: string
    // Permissions related to the quiz.
    permissions: {
        manage: boolean
        read: boolean
        create: boolean
        update: boolean
        submit: boolean
        preview: boolean
        delete: boolean
        read_statistics: boolean
        grade: boolean
        review_grades: boolean
        view_answer_audits: boolean
    }
    // The URL for accessing quiz reports.
    quiz_reports_url: string
    // The URL for accessing quiz statistics.
    quiz_statistics_url: string
    // The URL for messaging students regarding the quiz.
    message_students_url: string
    // The number of sections in the quiz.
    section_count: number
    // Indicates if important dates are associated with the quiz.
    important_dates: boolean
    // The URL for accessing quiz submission versions.
    quiz_submission_versions_html_url: string
    // The unique identifier for the associated assignment.
    assignment_id: number
    // Indicates if results are only visible one time.
    one_time_results: boolean
    // Indicates if the quiz is only visible to overrides.
    only_visible_to_overrides: boolean
    // The unique identifier for the associated assignment group.
    assignment_group_id: number
    // Indicates if correct answers are shown after the last attempt.
    show_correct_answers_last_attempt: boolean
    // The version number of the quiz.
    version_number: number
    // Indicates if an access code is required for the quiz.
    has_access_code: boolean
    // Indicates if quiz data should be posted to the SIS (Student Information System).
    post_to_sis: boolean
    // The migration identifier for the quiz.
    migration_id: number
    // Indicates if the quiz is in a paced course.
    in_paced_course: boolean
    // Types of questions present in the quiz.
    question_types: string[]
}
