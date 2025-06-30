import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const RATE_LIMITS = {
    flashcards: { limit: 10, window: 3600 },  // 10 per hour
    document: { limit: 5, window: 3600 },     // 5 per hour
    general: { limit: 30, window: 3600 }      // 30 per hour
} as const

export const rateLimit = async (endpoint: keyof typeof RATE_LIMITS): Promise<void> => {
    const now = Date.now()
    const { limit, window } = RATE_LIMITS[endpoint] ?? RATE_LIMITS.general
    const key = `rate_limit_${endpoint}`

    try {
        const raw = storage.getString(key)
        const requests: number[] = raw ? JSON.parse(raw) : []

        // Filter requests within time window
        const recentRequests = requests.filter((time) => now - time < window * 1000)

        if (recentRequests.length >= limit) {
            throw new Error(`Rate limit exceeded for "${endpoint}". Try again later.`)
        }

        // Add current request & save back
        recentRequests.push(now)
        storage.set(key, JSON.stringify(recentRequests))
    } catch (error) {
        console.error('rateLimit error:', error)
        throw new Error('Could not apply rate limit. Please try again.')
    }
}
