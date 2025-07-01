import { YStack, ScrollView, Text } from 'tamagui'
import { HomeHeader } from '@/components/Home/Header'
import { HeroCard } from '@/components/Home/HeroCard'
import { QuickActions } from '@/components/Home/QuickActions'
import { RecentActivity } from '@/components/Home/Activity'
import { useRecentActivity } from '@/hook/useRecentActivity'
import { StudyCalendar } from '@/components/Home/Events'

export default function HomeScreen() {
    const { recentActivity, loading } = useRecentActivity()

    return (
        <ScrollView>
            <YStack f={1} bg="$bg" p="$4" space="$4">
                <HomeHeader />
                <QuickActions />
                <HeroCard />
                <StudyCalendar />
                <RecentActivity />
            </YStack>
        </ScrollView>
    )
}