import React, { useState, useEffect } from 'react'
import { YStack, XStack, Text, H2, H4, Button, Progress, Spinner, useTheme } from 'tamagui'
import { QuizHeader } from '@/components/Quiz/Header'
import { QuizQuestion } from '@/components/Quiz/Questions'
import { QuizOptions } from '@/components/Quiz/Options'
import { QuizResults } from '@/components/Quiz/Results'
import { QuizTimer } from '@/components/Quiz/Timer'
import type { QuizQuestionType } from '@/types/quiz'

export function QuizScreen() {
    const theme = useTheme()
    const [questions, setQuestions] = useState<QuizQuestionType[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [quizStatus, setQuizStatus] = useState<'loading' | 'active' | 'completed'>('loading')
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [timeRemaining, setTimeRemaining] = useState(60) // 60 seconds per question

    // Fetch quiz questions (mock data for example)
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                const mockQuestions: QuizQuestionType[] = [
                    {
                        id: '1',
                        question: 'What is the capital of France?',
                        options: ['London', 'Paris', 'Berlin', 'Madrid'],
                        correctAnswer: 'Paris',
                        difficulty: 'easy'
                    },
                    {
                        id: '2',
                        question: 'Which planet is known as the Red Planet?',
                        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                        correctAnswer: 'Mars',
                        difficulty: 'medium'
                    },
                    {
                        id: '3',
                        question: 'What is the chemical symbol for Gold?',
                        options: ['Go', 'Gd', 'Au', 'Ag'],
                        correctAnswer: 'Au',
                        difficulty: 'hard'
                    }
                ]

                setQuestions(mockQuestions)
                setQuizStatus('active')
            } catch (error) {
                console.error('Failed to fetch questions:', error)
            }
        }

        fetchQuestions()
    }, [])

    // Timer effect
    useEffect(() => {
        if (quizStatus !== 'active' || timeRemaining <= 0) return

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    handleNextQuestion()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [quizStatus, timeRemaining, currentIndex])

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)

        if (option === questions[currentIndex].correctAnswer) {
            setScore(prev => prev + 1)
        }

        // Auto-advance after selection
        setTimeout(() => handleNextQuestion(), 1000)
    }

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setTimeRemaining(60)
        } else {
            setQuizStatus('completed')
        }
    }

    const restartQuiz = () => {
        setCurrentIndex(0)
        setScore(0)
        setQuizStatus('active')
        setSelectedOption(null)
        setTimeRemaining(60)
    }

    if (quizStatus === 'loading') {
        return (
            <YStack f={1} jc="center" ai="center" bg="$background">
                <Spinner size="large" color="$blue10" />
                <Text mt="$4" color="$color11">Loading quiz questions...</Text>
            </YStack>
        )
    }

    if (quizStatus === 'completed') {
        return <QuizResults score={score} total={questions.length} onRestart={restartQuiz} />
    }

    const currentQuestion = questions[currentIndex]
    const progress = ((currentIndex) / questions.length) * 100

    return (
        <YStack f={1} bg="$background" p="$4">
            <QuizHeader
                current={currentIndex + 1}
                total={questions.length}
                difficulty={currentQuestion.difficulty}
            />

            <Progress value={progress} mt="$2" mb="$4">
                <Progress.Indicator />
            </Progress>

            <QuizTimer timeRemaining={timeRemaining} />

            <QuizQuestion
                question={currentQuestion.question}
                questionNumber={currentIndex + 1}
            />

            <QuizOptions
                options={currentQuestion.options}
                correctAnswer={currentQuestion.correctAnswer}
                selectedOption={selectedOption}
                onSelect={handleOptionSelect}
            />

            <XStack jc="space-between" mt="$4">
                <Text color="$color10">Score: {score}/{questions.length}</Text>
                <Button
                    onPress={handleNextQuestion}
                    disabled={!selectedOption}
                    opacity={selectedOption ? 1 : 0.5}
                >
                    {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            </XStack>
        </YStack>
    )
}