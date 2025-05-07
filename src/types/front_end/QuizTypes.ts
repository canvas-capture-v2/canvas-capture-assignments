export type Quiz = {
    // the ID of the quiz
    id: number // 5,
    // the title of the quiz
    title: string // Hamlet Act 3 Quiz,
    // the HTTP/HTTPS URL to the quiz
    html_url: string // http://canvas.example.edu/courses/1/quizzes/2,
    // a url suitable for loading the quiz in a mobile webview.  it will persiste
    // the headless session and, for quizzes in public courses, will force the user
    // to login
    mobile_url: string // http://canvas.example.edu/courses/1/quizzes/2?persist_healdess=1&force_user=1,
    // A url that can be visited in the browser with a POST request to preview a
    // quiz as the teacher. Only present when the user may grade
    preview_url: string // http://canvas.example.edu/courses/1/quizzes/2/take?preview=1,
    // the description of the quiz
    description: string // This is a quiz on Act 3 of Hamlet,
    // type of quiz possible values: 'practice_quiz', 'assignment', 'graded_survey',
    // 'survey'
    quiz_type: 'practice_quiz' | 'assignment' | 'graded_survey' | 'survey'
    // the ID of the quiz's assignment group:
    assignment_group_id: number // 3,
    // quiz time limit in minutes
    time_limit: number // 5,
    // shuffle answers for students?
    shuffle_answers: boolean // false,
    // let students see their quiz responses? possible values: null, 'always',
    // 'until_after_last_attempt'
    hide_results: string // always,
    // show which answers were correct when results are shown? only valid if
    // hide_results=null
    show_correct_answers: boolean // true,
    // restrict the show_correct_answers option above to apply only to the last
    // submitted attempt of a quiz that allows multiple attempts. only valid if
    // show_correct_answers=true and allowed_attempts > 1
    show_correct_answers_last_attempt: boolean // true,
    // when should the correct answers be visible by students? only valid if
    // show_correct_answers=true
    show_correct_answers_at: Date // "2013-01-23T23:59:00-07:00",
    // prevent the students from seeing correct answers after the specified date has
    // passed. only valid if show_correct_answers=true
    hide_correct_answers_at: Date // "2013-01-23T23:59:00-07:00",
    // prevent the students from seeing their results more than once (right after
    // they submit the quiz)
    one_time_results: boolean // true,
    // which quiz score to keep (only if allowed_attempts != 1) possible values:
    // 'keep_highest', 'keep_latest'
    scoring_policy: 'keep_highest' | 'keep_latest'
    // how many times a student can take the quiz -1 = unlimited attempts
    allowed_attempts: number // 3,
    // show one question at a time?
    one_question_at_a_time: boolean // false,
    // the number of questions in the quiz
    question_count: number // 12,
    // The total point value given to the quiz
    points_possible: number // 20,
    // lock questions after answering? only valid if one_question_at_a_time=true
    cant_go_back: boolean // false,
    // access code to restrict quiz access
    access_code: string // 2beornot2be,
    // IP address or range that quiz access is limited to
    ip_filter: string // 123.123.123.123,
    // when the quiz is due
    due_at: Date // "2013-01-23T23:59:00-07:00",
    // when to lock the quiz
    lock_at: Date // null,
    // when to unlock the quiz
    unlock_at: Date // "2013-01-21T23:59:00-07:00",
    // whether the quiz has a published or unpublished draft state.
    published: boolean // true,
    // Whether the assignment's 'published' state can be changed to false. Will be
    // false if there are student submissions for the quiz.
    unpublishable: boolean // true,
    // Whether or not this is locked for the user.
    locked_for_user: boolean // false,
    // (Optional) Information for the user about the lock. Present when
    // locked_for_user is true.
    lock_info: object // null,
    // (Optional) An explanation of why this is locked for the user. Present when
    // locked_for_user is true.
    lock_explanation: string // This quiz is locked until September 1 at 12:00am,
    // Link to SpeedGrader for this quiz. Will not be present if quiz is unpublished
    speedgrader_url: string // http://canvas.instructure.com/courses/1/speed_grader?assignment_id=1,
    // Link to endpoint to send extensions for this quiz.
    quiz_extensions_url: string // http://canvas.instructure.com/courses/1/quizzes/2/quiz_extensions,
    // Permissions the user has for the quiz
    permissions: object
    // list of due dates for the quiz
    all_dates: Date[],
    // Current version number of the quiz
    version_number: number // 3,
    // List of question types in the quiz
    question_types: QuizQuestionType[] // ["multiple_choice", "essay"],
    // Whether survey submissions will be kept anonymous (only applicable to
    // 'graded_survey', 'survey' quiz types)
    anonymous_submissions: boolean // false
}

export type QuizQuestion = {
    // The ID of the quiz question.
    id: number // 1,
    // The ID of the Quiz the question belongs to.
    quiz_id: number // 2,
    // The order in which the question will be retrieved and displayed.
    position: number // 1,
    // The name of the question.
    question_name: string // "Prime Number Identification",
    // The type of the question.
    question_type: QuizQuestionType //"multiple_choice_question",
    // The text of the question.
    question_text: string// "Which of the following is NOT a prime number?",
    // The maximum amount of points possible received for getting this question
    // correct.
    points_possible: number // 5,
    // The comments to display if the student answers the question correctly.
    correct_comments: string // "That's correct!",
    // The comments to display if the student answers incorrectly.
    incorrect_comments: string // "Unfortunately, that IS a prime number.",
    // The comments to display regardless of how the student answered.
    neutral_comments: string // "Goldbach's conjecture proposes that every even integer greater than 2 can be expressed as the sum of two prime numbers.",
    // An array of available answers to display to the student.
    answers: Answer[]
}

export type QuizSubmission = {

}

export type QuizSubmissionQuestion = {

}

export type QuizQuestionType =  'calculated_question' |
    'essay_question' |
    'file_upload_question' |
    'fill_in_multiple_blanks_question' |
    'matching_question' |
    'multiple_answers_question' |
    'multiple_choice_question' |
    'multiple_dropdowns_question' |
    'numerical_question' |
    'short_answer_question' |
    'text_only_question' |
    'true_false_question'

export type BaseAnswer = {
    // The unique identifier for the answer.  Do not supply if this answer is part
    // of a new question
    id: number // 6656,
    // The text of the answer.
    answer_text: string // "Constantinople",
    // An integer to determine correctness of the answer. Incorrect answers should
    // be 0, correct answers should be 100.
    answer_weight: number // 100,
    // Specific contextual comments for a particular answer.
    answer_comments: string // "Remember to check your spelling prior to submitting this answer.",
    num_students_picked: number
    percent_students_picked: number
}

export type MissingWordAnswer = BaseAnswer & {
    // Used in missing word questions.  The text to follow the missing word
    text_after_answers: string //" is the capital of Utah."
}

export type MatchingAnswer = BaseAnswer & {
    // Used in matching questions.  The static value of the answer that will be
    // displayed on the left for students to match for.
    answer_match_left: string // "Salt Lake City",
    // Used in matching questions. The correct match for the value given in
    // answer_match_left.  Will be displayed in a dropdown with the other
    // answer_match_right values...
    answer_match_right: string // "Utah",
    // Used in matching questions. A list of distractors, delimited by new lines (
    // ) that will be seeded with all the answer_match_right values.
    matching_answer_incorrect_matches: string //"Nevada\nCalifornia\nWashington",
}

export type NumericalAnswer = BaseAnswer & {
    // Used in numerical questions.  Values can be 'exact_answer', 'range_answer',
    // or 'precision_answer'.
    numerical_answer_type: 'exact_answer' | 'range_answer' | 'precision_answer'
}

export type ExactAnswer = NumericalAnswer & {
    // Used in numerical questions of type 'exact_answer'.  The value the answer
    // should equal.
    exact: number // 42,
    // Used in numerical questions of type 'exact_answer'. The margin of error
    // allowed for the student's answer.
    margin: number // 4,
}

export type PrecisionAnswer = NumericalAnswer & {
    // Used in numerical questions of type 'precision_answer'.  The value the answer
    // should equal.
    approximate: number // 1234600000.0,
    // Used in numerical questions of type 'precision_answer'. The numerical
    // precision that will be used when comparing the student's answer.
    precision: number,
}

export type RangeAnswer = NumericalAnswer & {
    // Used in numerical questions of type 'range_answer'. The start of the allowed
    // range (inclusive).
    start: number // 1,
    // Used in numerical questions of type 'range_answer'. The end of the allowed
    // range (inclusive).
    end: number // 10,
}

export type MultipleBlankDropdownAnswer = BaseAnswer & {
    // Used in fill in multiple blank and multiple dropdowns questions.
    blank_id: number // 1170
}

export type Answer = BaseAnswer |
                     MissingWordAnswer |
                     MatchingAnswer |
                     ExactAnswer |
                     PrecisionAnswer |
                     RangeAnswer |
                     MultipleBlankDropdownAnswer
