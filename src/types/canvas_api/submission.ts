/**
 * Defines types matching submission-related
 * portions of the Canvas API
 */
/**
 * Defines types matching submission-related
 * portions of the Canvas API
 */
import type {CanvasAssignment} from './assignment'
import type {CanvasCourse} from './course'
import type {ReadState} from './read-state'
import type {User, UserDisplay} from './user'

export type CanvasSubmission = {
    id: number
    // The submission's assignment id
    assignment_id: number
    // The submission's assignment (see the assignments API) (optional)
    assignment?: CanvasAssignment
    // The submission's course (see the course API) (optional)
    course?: CanvasCourse
    // This is the submission attempt number.
    attempt: number
    // The content of the submission, if it was submitted directly in a text field.
    body: string
    // The grade for the submission, translated into the assignment grading scheme
    // (so a letter grade, for example).
    grade: string
    // A boolean flag which is false if the student has re-submitted since the
    // submission was last graded.
    grade_matches_current_submission: boolean
    // URL to the submission. This will require the user to log in.
    html_url?: string
    // URL to the submission preview. This will require the user to log in.
    preview_url: string
    // The raw score
    score: number
    // Associated comments for a submission (optional)
    submission_comments?: SubmissionComment[]
    // The types of submission ex:
    // ('online_text_entry'|'online_url'|'online_upload'|'online_quiz'|'media_record
    // ing'|'student_annotation')
    submission_type: SubmissionType
    // The timestamp when the assignment was submitted
    submitted_at: Date
    // The URL of the submission (for 'online_url' submissions).
    url?: string
    // The id of the user who created the submission
    user_id: number
    // The id of the user who graded the submission. This will be null for
    // submissions that haven't been graded yet. It will be a positive number if a
    // real user has graded the submission and a negative number if the submission
    // was graded by a process (e.g. Quiz autograder and autograding LTI tools).
    // Specifically autograded quizzes set grader_id to the negative of the quiz id.
    // Submissions autograded by LTI tools set grader_id to the negative of the tool
    // id.
    grader_id: number
    graded_at: Date
    // The submissions user (see user API) (optional)
    user?: User
    // Whether the submission was made after the applicable due date
    late: boolean
    // Whether the assignment is visible to the user who submitted the assignment.
    // Submissions where `assignment_visible` is false no longer count towards the
    // student's grade and the assignment can no longer be accessed by the student.
    // `assignment_visible` becomes false for submissions that do not have a grade
    // and whose assignment is no longer assigned to the student's section.
    assignment_visible?: boolean
    // Whether the assignment is excused.  Excused assignments have no impact on a
    // user's grade.
    excused: boolean
    // Whether the assignment is missing.
    missing: boolean
    // The status of the submission in relation to the late policy. Can be late,
    // missing, extended, none, or null.
    late_policy_status?: LatePolicyStatus
    // The amount of points automatically deducted from the score by the
    // missing/late policy for a late or missing assignment.
    points_deducted?: number
    // The amount of time, in seconds, that an submission is late by.
    seconds_late: number
    // The current state of the submission
    workflow_state: WorkflowState
    // Extra submission attempts allowed for the given user and assignment.
    extra_attempts?: number
    // A unique short ID identifying this submission without reference to the owning
    // user. Only included if the caller has administrator access for the current
    // account.
    anonymous_id: string
    // The date this submission was posted to the student, or nil if it has not been
    // posted.
    posted_at: Date
    // The read status of this submission for the given user (optional). Including
    // read_status will mark submission(s) as read.
    read_status?: ReadState
    // This indicates whether the submission has been reassigned by the instructor.
    redo_request: boolean
    entered_grade: string
    entered_score: number
    rubric_assessment?: RubricAssessment
    attachments?: SubmissionAttachment[]
    media_comment?: MediaComment
}

export type SubmissionAttachment = {
    id: number
    uuid: string
    folder_id: number
    display_name: string
    filename: string
    upload_status: string
    'content-type': string
    url: string
    size: number
    created_at: Date
    updated_at: Date
    unlock_at: null
    locked: boolean
    hidden: boolean
    lock_at: null
    hidden_for_user: boolean
    thumbnail_url: string
    modified_at: Date
    mime_class: string
    media_entry_id: null
    category: string
    locked_for_user: boolean
    preview_url: null
}

export type SubmissionComment = {
    id: number
    author_id: number
    author_name: string
    // Abbreviated user object UserDisplay (see users API).
    author: UserDisplay
    comment: string
    created_at: Date
    edited_at: Date
    media_comment: MediaComment
}

export type MediaComment = {
    'content-type': string
    display_name?: string
    media_id: string
    media_type: string
    url: string
}

export type RubricAssessment = Record<string, RubricAssessmentCriterion>

export type RubricAssessmentCriterion = {
    points: number
    comments: string
    rating_id: string
}

export type WorkflowState =
    | 'submitted'
    | 'unsubmitted'
    | 'graded'
    | 'pending_review'

export type LatePolicyStatus = 'missing' | 'late' | 'none' | 'extended' | null

export type SubmissionType =
    | 'online_text_entry'
    | 'online_url'
    | 'online_upload'
    | 'online_quiz'
    | 'media_recording'
    | 'student_annotation'
