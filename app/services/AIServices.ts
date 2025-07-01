import { rateLimit } from './RateLimitService'
import { OPENAI_API_KEY } from '@env'

console.log('API Key:', OPENAI_API_KEY)

export type Flashcard = {
    question: string
    answer: string
}

export type DocumentAnalysis = {
    summary: string
    keyPoints: string[]
    flashcards: Flashcard[]
    quizzes: {
        question: string
        options: string[]
        answer: string
    }[]
}

/**
 * Generate flashcards from a topic.
 */
export const generateFlashcards = async (topic: string): Promise<Flashcard[]> => {
    try {
        await rateLimit('flashcards')

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content: `Generate 10 flashcards about ${topic}. Format as JSON: [{question: string, answer: string}]`,
                    },
                ],
                temperature: 0.7,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('OpenAI API error:', data)
            throw new Error(data.error?.message || 'Failed to generate flashcards')
        }

        const content = data.choices?.[0]?.message?.content
        return JSON.parse(content)
    } catch (error) {
        console.error('generateFlashcards error:', error)
        throw error
    }
}

/**
 * Analyze a document given its URL.
 */
export const analyzeDocument = async (documentUrl: string): Promise<DocumentAnalysis> => {
    try {
        await rateLimit('document')

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content: `Analyze this document (${documentUrl}) and return: 
1. A concise summary
2. 5 key points
3. 5 flashcards {question, answer}
4. 3 quiz questions with options and answers
Format as JSON`,
                    },
                ],
                temperature: 0.5,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('OpenAI API error:', data)
            throw new Error(data.error?.message || 'Failed to analyze document')
        }

        return JSON.parse(data.choices?.[0]?.message?.content)
    } catch (error) {
        console.error('analyzeDocument error:', error)
        throw error
    }
}

/**
 * Mock / fallback service to get a sample document analysis.
 * Replace with your real backend or storage in production.
 */
export const getDocumentAnalysis = async (): Promise<DocumentAnalysis> => {
    // Example: you could fetch from local JSON, Supabase, or your backend
    return {
        summary: 'This is a sample document summary.',
        keyPoints: ['Point one', 'Point two', 'Point three', 'Point four', 'Point five'],
        flashcards: [
            { question: 'Sample question 1?', answer: 'Sample answer 1' },
            { question: 'Sample question 2?', answer: 'Sample answer 2' },
            { question: 'Sample question 3?', answer: 'Sample answer 3' },
            { question: 'Sample question 4?', answer: 'Sample answer 4' },
            { question: 'Sample question 5?', answer: 'Sample answer 5' },
        ],
        quizzes: [
            {
                question: 'Sample quiz question?',
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                answer: 'Option A',
            },
            {
                question: 'Another quiz question?',
                options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                answer: 'Option 2',
            },
            {
                question: 'Final quiz question?',
                options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
                answer: 'Gamma',
            },
        ],
    }
}
