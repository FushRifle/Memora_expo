import AsyncStorage from '@react-native-async-storage/async-storage'

type StudyData = {
    date: string
    minutes: number
    subject: string
    score?: number
}

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
 * Save a new study session into local AsyncStorage
 */
export const saveStudySession = async (session: Omit<StudyData, 'date'>): Promise<void> => {
    try {
        const date = new Date().toISOString()
        const key = 'studySessions'

        const raw = await AsyncStorage.getItem(key)
        const parsed: StudyData[] = raw ? JSON.parse(raw) : []

        const newSessions = [...parsed, { ...session, date }]
        await AsyncStorage.setItem(key, JSON.stringify(newSessions))
    } catch (error) {
        console.error('Failed to save study session:', error)
    }
}

/**
 * Get recent N study sessions, sorted newest → oldest
 */
export const getRecentActivity = async (count: number = 5): Promise<StudyData[]> => {
    try {
        const raw = await AsyncStorage.getItem('studySessions')
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
