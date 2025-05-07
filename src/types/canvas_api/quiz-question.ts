/**
 * Defines types matching quiz question-related
 * portions of the Canvas API
 */
// from endpoint http://sdlstudentvm06.msoe.edu/api/v1/courses/2/quizzes/3/questions?&quiz_submission_id=9&quiz_submission_attempt=1
export type QuizQuestion = {
    // Unique identifier for the question
    id: number
    // ID of the quiz this question belongs to
    quiz_id: number
    // ID of the quiz group if the question belongs to a group
    quiz_group_id: number | null
    // ID of the assessment question
    assessment_question_id: number
    // Position of the question within the quiz
    position: number
    // Name of the question
    question_name: string
    // Type of the question
    question_type: string
    // Text of the question
    question_text: string
    // Points possible for the question
    points_possible: number
    // Comments for correct answers
    correct_comments: string
    // Comments for incorrect answers
    incorrect_comments: string
    // Comments for neutral answers
    neutral_comments: string
    // HTML representation of correct comments
    correct_comments_html: string
    // HTML representation of incorrect comments
    incorrect_comments_html: string
    // HTML representation of neutral comments
    neutral_comments_html: string
    // List of answers for the question
    answers: QuizSubmissionAnswer[]
    // Variables associated with the question
    variables: null | Variable[]
    // Formulas associated with the question
    formulas: null | Formula[]
    // Tolerance for answer comparison
    answer_tolerance: null | number
    // Decimal places for formulas
    formula_decimal_places: null | number
    // Matches associated with the question
    matches: Match[]
    // Matching answer incorrect matches
    matching_answer_incorrect_matches: null | string
}

export type QuizSubmissionAnswer = {
    // Unique identifier for the answer
    id: string
    // The text of the answer
    text: string
    // Comments for the answer
    comments: string
    // HTML representation of the comments
    comments_html: string
    // Weight of the answer
    weight: number
    // Identifier for the blank associated with the answer
    blank_id: string
    // Identifiers used for matching questions
    match_id: number
    right: string
}

export type QuestionData = {
    quiz_id: number
    question_name: string
    question_description: string
    position: number
    points_possible: number
    correct_comments: string
    neutral_comments: string
    incorrect_comments: string
    answers: QuizSubmissionAnswer[]
    correct: boolean | 'partial'
    question_type: string //should eventually make this explicit
    submission_data: {
        more_comments: string
        text: string
        points: number
        [key: string]: string | number
    }
}

export type Variable = {
    name: string
    min: number
    max: number
    scale: number
}

export type Formula = {
    formula: string
}

export type Match = {
    text: string
    match_id: number
}
