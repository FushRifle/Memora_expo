import React, { useState } from 'react'
import { YStack, ScrollView } from 'tamagui'
import { FlashcardHeader } from '@/components/Flashcards/Header'
import { FlashcardTabs } from '@/components/Flashcards/Tabs'
import { FlashcardForm } from '@/components/Flashcards/Form'
import { FlashcardList } from '@/components/Flashcards/CardList'
import { FlashcardPreview } from '@/components/Flashcards/CardPreview'
import { FlashcardStudy } from '@/components/Flashcards/CardStudy'
import { useTheme } from '@/styles/ThemeContext'

export function FlashcardGeneratorScreen() {
    const [activeTab, setActiveTab] = useState('create')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [category, setCategory] = useState('General')
    const [difficulty, setDifficulty] = useState('medium')
    const [flashcards, setFlashcards] = useState<any[]>([])
    const [isEditing, setIsEditing] = useState<string | null>(null)
    const { isDark, colors } = useTheme()

    const addFlashcard = () => {
        if (question.trim() && answer.trim()) {
            const newFlashcard = {
                id: Date.now().toString(),
                question,
                answer,
                category,
                difficulty
            }
            setFlashcards(prev => [...prev, newFlashcard])
            resetForm()
        }
    }

    const updateFlashcard = () => {
        if (isEditing && question.trim() && answer.trim()) {
            setFlashcards(prev => prev.map(card =>
                card.id === isEditing ? { ...card, question, answer, category, difficulty } : card
            ))
            resetForm()
        }
    }

    const resetForm = () => {
        setQuestion('')
        setAnswer('')
        setCategory('General')
        setDifficulty('medium')
        setIsEditing(null)
    }

    const editFlashcard = (card: any) => {
        setQuestion(card.question)
        setAnswer(card.answer)
        setCategory(card.category)
        setDifficulty(card.difficulty)
        setIsEditing(card.id)
    }

    const deleteFlashcard = (id: string) => {
        setFlashcards(prev => prev.filter(card => card.id !== id))
        if (isEditing === id) resetForm()
    }

    return (
        <YStack flex={1} backgroundColor={colors.background}>
            <FlashcardHeader />
            <FlashcardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <ScrollView p="$4">
                {activeTab === 'create' && (
                    <YStack space="$4">
                        <FlashcardForm
                            question={question}
                            setQuestion={setQuestion}
                            answer={answer}
                            setAnswer={setAnswer}
                            category={category}
                            setCategory={setCategory}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                            isEditing={isEditing as any}
                            addFlashcard={addFlashcard}
                            updateFlashcard={updateFlashcard}
                            resetForm={resetForm}
                        />
                        <FlashcardList
                            flashcards={flashcards}
                            editFlashcard={editFlashcard}
                            deleteFlashcard={deleteFlashcard}
                        />
                    </YStack>
                )}

                {activeTab === 'preview' && <FlashcardPreview />}
                {activeTab === 'study' && <FlashcardStudy flashcards={flashcards} />}
            </ScrollView>
        </YStack>
    )
}