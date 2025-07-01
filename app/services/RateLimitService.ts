import AsyncStorage from '@react-native-async-storage/async-storage'

const RATE_LIMITS = {
    flashcards: { limit: 10, window: 3600 },  // 10 per hour
    document: { limit: 5, window: 3600 },     // 5 per hour
    general: { limit: 30, window: 3600 }      // 30 per hour
} as const

/**
 * Apply rate limiting to an endpoint.
 * @param endpoint - one of the keys in RATE_LIMITS
 * @throws Error if limit exceeded
 */
export const rateLimit = async (endpoint: keyof typeof RATE_LIMITS): Promise<void> => {
    const now = Date.now()
    const { limit, window } = RATE_LIMITS[endpoint] ?? RATE_LIMITS.general
    const key = `rate_limit_${endpoint}`

    try {
        // Get saved request timestamps
        const raw = await AsyncStorage.getItem(key)
        const requests: number[] = raw ? JSON.parse(raw) : []

        // Keep only requests within the time window
        const recentRequests = requests.filter((time) => now - time < window * 1000)

        if (recentRequests.length >= limit) {
            throw new Error(`Rate limit exceeded for "${endpoint}". Try again later.`)
        }

        // Add this request timestamp & save back
        recentRequests.push(now)
        await AsyncStorage.setItem(key, JSON.stringify(recentRequests))
    } catch (error) {
        console.error('rateLimit error:', error)
        throw new Error('Could not apply rate limit. Please try again.')
    }
}
