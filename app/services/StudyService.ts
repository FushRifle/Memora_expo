import { MMKV } from 'react-native-mmkv'

type StudyData = {
    date: string
    minutes: number
    subject: string
    score?: number
}

// Create a storage instance
const storage = new MMKV()

/**
 * Get study data (mock generator in this example)
 */
export const getStudyData = async (): Promise<StudyData[]> => {
    try {
        // In a real app, fetch from backend instead
        const subjects = ['Math', 'Biology', 'History', 'Chemistry', 'Literature']
        const data: StudyData[] = []

        for (let i = 14; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)

            data.push({
                date: date.toISOString(),
                minutes: Math.floor(Math.random() * 120) + 30,
                subject: subjects[Math.floor(Math.random() * subjects.length)],
                score: i % 3 === 0 ? Math.floor(Math.random() * 30) + 70 : undefined
            })
        }

        return data
    } catch (error) {
        console.error('Failed to get study data:', error)
        return []
    }
}

/**
 * Save a new study session into local MMKV storage
 */
export const saveStudySession = (session: Omit<StudyData, 'date'>): void => {
    try {
        const date = new Date().toISOString()
        const key = 'studySessions'

        const raw = storage.getString(key)
        const parsed: StudyData[] = raw ? JSON.parse(raw) : []

        const newSessions = [...parsed, { ...session, date }]
        storage.set(key, JSON.stringify(newSessions))
    } catch (error) {
        console.error('Failed to save study session:', error)
    }
}

/**
 * Get recent N study sessions, sorted newest → oldest
 */
export const getRecentActivity = (count: number = 5): StudyData[] => {
    try {
        const raw = storage.getString('studySessions')
        const sessions: StudyData[] = raw ? JSON.parse(raw) : []

        // Sort by date descending
        const sorted = sessions.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        return sorted.slice(0, count)
    } catch (error) {
        console.error('Failed to get recent activity:', error)
        return []
    }
}
