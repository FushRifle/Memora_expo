export type QuizQuestionType = {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    difficulty: 'easy' | 'medium' | 'hard'
}