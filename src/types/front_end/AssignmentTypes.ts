import type {Submission} from "./SubmissionTypes.ts";

export type Assignment = {
    id: number
    name: string
    description: string
    updated_at: Date
    due_at: Date
    unlock_at: Date
    course_id: number
    assignment_group_id: number
    position: number
    points_possible: number
    submission_types: SubmissionType[]
    has_submitted_submissions: boolean
    published: boolean
    quiz_id?: number
    anonymous_submissions?: boolean
    discussion_topic?: null | DiscussionTopic
    use_rubric_for_grading?: boolean
    rubric_settings?: Rubric,
    rubric?: null | RubricCriteria[]
    allowed_attempts: number
    score_statistics: ScoreStatistic
    is_quiz_assignment: boolean
    submissions: Submission[]
    low_submission: Submission
    median_submission: Submission
    high_submission: Submission
    last_submission_date: Date
    last_graded_date: Date
    num_late_submissions: number
    avg_submissions_per_user: number
    avg_submission_time: string
    avg_time_to_grade: string
}

export type AssignmentDate = {
    id?: number
    base?: boolean
    title: string
    due_at?: Date
    unlock_at?: Date
    lock_at?: Date
}

export type AssignmentGroup = {
    id: number
    course_id: number
    name: string
    assignments: Assignment[]
    position: number
    group_weight: number
    points_possible: number
    score_statistics: ScoreStatistic
    date_statistics: DateStatistics
}

export type AssignmentOverride = {
    id: number
    assignment_id: number
    quiz_id: number
    context_module_id: number
    discussion_topic_id: number
    wiki_page_id: number
    attachment_id: number
    student_ids: number[]
    group_id: number
    course_section_id: number
    title: string
    due_at?: Date
    all_day?: boolean
    all_day_date?: Date
    unlock_at?: Date
    lock_at?: Date
}

export type AssignmentUser = {
    id: string
    name: string
}

export type DateStatistics = {
    avg_num_assignments_due_per_day: number
    avg_time_assigned_to_due: string
    avg_time_last_past_due: string
    avg_time_last_to_grade: string
    avg_num_late: number
    avg_submissions: number
}

export type DiscussionTopic = {
    id: number
    title: string
    message: string
    html_url: string
    posted_at?: Date
    last_reply_at?: Date | null
    require_initial_post: boolean
    user_can_see_posts: boolean
    discussion_subentry_count: number
    read_state: 'read' | 'unread' | null
    unread_count: number
    subscribed: boolean
    subscription_hold?: 'initial_post_required' | 'not_in_group_set' | 'not_in_group' | 'topic_is_announcement' | null
    assignment_id: number
    delayed_post_at?: null | Date
    published: boolean
    lock_at?: Date
    locked: boolean
    pinned: boolean
    locked_for_user: boolean
    lock_info?: LockInfo
    lock_explanation?: string
    user_name: string
    topic_children?: number[] | null
    group_topic_children: GroupTopicChild[]
    root_topic_id: DiscussionTopic
    podcast_url: string
    discussion_type: 'side_comment' | 'not_threaded' | 'threaded'
    group_category_id?: number | null
    attachments?: FileAttachment[] | null
    permissions?: Permissions | null
    allow_rating: boolean
    only_graders_can_rate: boolean
    sort_by_rating?: boolean
    sort_order: string
    sort_order_locked: boolean
    expand: boolean
    expand_locked: boolean
}

export type ExternalToolTagAttributes = {
    url: string
    new_tab: boolean
    resource_link_id: string
}
export type FileAttachment = {
    content_type: string
    url: string
    filename: string
    display_name: string
}

export type FrozenAttribute = 'title' |
                              'description' |
                              'lock_at' |
                              'points_possible' |
                              'grading_type' |
                              'submission_types' |
                              'assignment_group_id' |
                              'allowed_extensions' |
                              'group_category_id' |
                              'notify_of_update' |
                              'peer_reviews'

export type GradingRules = {
    drop_lowest: number
    drop_highest: number
    never_drop: number[]
}

export type GroupTopicChild = {
    id: number
    group_id: number
}

export type LockInfo = {
    asset_string: string
    unlock_at?: Date
    lock_at?: Date
    context_module?: string
    manually_locked: boolean
}

export type NeedsGradingCount = {
    section_id: string
    needs_grading_count: number
}

export type Permissions = {
    become_user?: boolean
    import_sis?: boolean
    manage_account_memberships?: boolean
    manage_account_settings?: boolean
    manage_alerts?: boolean
    manage_catalog?: boolean
    add_course_template?: boolean
    delete_course_template?: boolean
    edit_course_template?: boolean
    manage_courses_add?: boolean
    manage_courses_admin?: boolean
    manage_developer_keys?: boolean
    manage_feature_flags?: boolean
    manage_master_courses?: boolean
    manage_role_overrides?: boolean
    manage_storage_quotas?: boolean
    manage_sis?: boolean
    temporary_enrollments_add?: boolean
    temporary_enrollments_edit?: boolean
    temporary_enrollments_delete?: boolean
    manage_user_logins?: boolean
    manage_user_observers?: boolean
    moderate_user_content?: boolean
    read_course_content?: boolean
    read_course_list?: boolean
    view_course_changes?: boolean
    view_feature_flags?: boolean
    view_grade_changes?: boolean
    view_notifications?: boolean
    view_quiz_answer_audits?: boolean
    view_statistics?: boolean
    undelete_courses?: boolean
    allow_course_admin_actions?: boolean
    create_collaborations?: boolean
    create_conferences?: boolean
    create_forum?: boolean
    generate_observer_pairing_code?: boolean
    import_outcomes?: boolean
    manage_account_banks?: boolean
    share_banks_with_subaccounts?: boolean
    manage_assignments_add?: boolean
    manage_assignments_edit?: boolean
    manage_assignments_delete?: boolean
    manage_calendar?: boolean
    manage_course_content_add?: boolean
    manage_course_content_edit?: boolean
    manage_course_content_delete?: boolean
    manage_course_visibility?: boolean
    manage_courses_conclude?: boolean
    manage_courses_delete?: boolean
    manage_courses_publish?: boolean
    manage_courses_reset?: boolean
    manage_files_add?: boolean
    manage_files_edit?: boolean
    manage_files_delete?: boolean
    manage_grades?: boolean
    manage_groups_add?: boolean
    manage_groups_delete?: boolean
    manage_groups_manage?: boolean
    manage_interaction_alerts?: boolean
    manage_outcomes?: boolean
    manage_proficiency_calculations?: boolean
    manage_proficiency_scales?: boolean
    manage_sections_add?: boolean
    manage_sections_edit?: boolean
    manage_sections_delete?: boolean
    manage_students?: boolean
    manage_rubrics?: boolean
    manage_wiki_create?: boolean
    manage_wiki_delete?: boolean
    manage_wiki_update?: boolean
    moderate_forum?: boolean
    post_to_forum?: boolean
    read_announcements?: boolean
    read_email_addresses?: boolean
    read_forum?: boolean
    read_question_banks?: boolean
    read_reports?: boolean
    read_roster?: boolean
    read_sis?: boolean
    select_final_grade?: boolean
    send_messages?: boolean
    send_messages_all?: boolean
    add_teacher_to_course?: boolean
    remove_teacher_from_course?: boolean
    add_ta_to_course?: boolean
    remove_ta_from_course?: boolean
    add_designer_to_course?: boolean
    remove_designer_from_course?: boolean
    add_observer_to_course?: boolean
    remove_observer_from_course?: boolean
    add_student_to_course?: boolean
    remove_student_from_course?: boolean
    view_all_grades?: boolean
    view_analytics?: boolean
    view_audit_trail?: boolean
    view_group_pages?: boolean
    view_user_logins?: boolean
}

export type Rubric = {
    id: number
    title: string
    context_id: number
    context_type: string
    points_possible: number
    reusable: boolean
    read_only: boolean
    free_form_criterion_comments: boolean
    hide_score_total: boolean
    data: RubricCriteria[] | null
    assessments?: RubricAssessment[] | null
    associations?: RubricAssociation[] | null
}

export type RubricAssessment = {
    id: number
    rubric_id: number
    rubric_association_id: number
    score: number
    artifact_type: string
    artifact_id: number
    artifact_attempt: number
    assessment_type: "grading" | 'peer_review' | 'provisional_grade'
    assessor_id: number
    data?: string[] | null
    comments?: string[] | null
}

export type RubricAssociation = {
    id: number
    rubric_id: number
    association_id: number
    association_type: string
    use_for_grading: boolean
    summary_data: string
    purpose: 'grading' | 'bookmark'
    hide_score_total?: boolean
    hide_points: boolean
    hide_outcome_results: boolean
}

export type RubricCriteria = {
    points: number
    id: string
    learning_outcome_id?: string
    vendor_guid?: string
    description: string
    long_description: string
    criterion_use_range: boolean
    ratings: RubricRating[]
    ignore_for_scoring: boolean
}

export type RubricRating = {
    points: number
    id: string,
    description: string
    long_description: string
}

export type ScoreStatistic = {
    min: number
    max: number
    mean: number
    upper_q: number
    median: number
    lower_q: number
}

export type SubmissionType = 'discussion_topic' |
                             'online_quiz' |
                             'on_paper' |
                             'none' |
                             'external_tool' |
                             'online_text_entry' |
                             'online_url' |
                             'online_upload' |
                             'media_recording' |
                             'student_annotation'
