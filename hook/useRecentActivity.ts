import { useState, useEffect } from 'react'
import { getRecentActivity } from '@/app/services/StudyService'

export const useRecentActivity = () => {
    const [recentActivity, setRecentActivity] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchActivity = async () => {
            const activity = await getRecentActivity()
            setRecentActivity(activity)
            setLoading(false)
        }
        fetchActivity()
    }, [])

    return { recentActivity, loading }
}