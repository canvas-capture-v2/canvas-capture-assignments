/**
 * Defines a type matching the grading period-related
 * portion of the Canvas API
 */
export type GradingPeriod = {
    // The unique identifier for the grading period.
    id: number
    // The title for the grading period.
    title: string
    // The start date of the grading period.
    start_date: Date
    // The end date of the grading period.
    end_date: Date
    // Grades can only be changed before the close date of the grading period.
    close_date: Date
    // A weight value that contributes to the overall weight of a grading period set
    // which is used to calculate how much assignments in this period contribute to
    // the total grade
    weight: number
    // If true, the grading period's close_date has passed.
    is_closed: boolean
}
