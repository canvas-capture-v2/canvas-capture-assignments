/**
 * Defines types matching quiz submission question-related
 * portions of the Canvas API
 */
/**
 * Defines types matching quiz submission question-related
 * portions of the Canvas API
 */
import type {Formula, Match, Variable} from './quiz-question'

export type QuizSubmissionQuestion = {
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
    // List of answers for the question
    answers: Answer[]
    // Variables associated with the question
    variables: Variable[]
    // Formulas associated with the question
    formulas: Formula[]
    // Tolerance for answer comparison
    answer_tolerance: number | null
    // Decimal places for formulas
    formula_decimal_places: number | null
    // Matches associated with the question
    matches: Match[]
    // Indicates if the question is flagged
    flagged: boolean
    // Indicates if the question is correct
    correct: boolean | 'partial'
}

export type Answer = {
    // Unique identifier for the answer
    id: number
    // The text of the answer
    text: string
    // HTML representation of the answer
    html: string
}
