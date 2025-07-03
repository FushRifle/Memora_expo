import { YStack, ScrollView, Text } from 'tamagui'
import { HomeHeader } from '@/components/Home/Header'
import { HeroCard } from '@/components/Home/HeroCard'
import { QuickActions } from '@/components/Home/QuickActions'
import { RecentActivity } from '@/components/Home/Activity'
import { useRecentActivity } from '@/hook/useRecentActivity'
import { StudyCalendar } from '@/components/Home/Events'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const { recentActivity, loading } = useRecentActivity()
    const navigation = useNavigation()

    return (
        <ScrollView>
            <YStack f={1} bg="$bg" p="$4" space="$4">
                <HomeHeader />
                <QuickActions handleActionPress={(screen) => navigation.navigate(screen as never)} />
                <HeroCard />
                <StudyCalendar />
                <RecentActivity />
            </YStack>
        </ScrollView>
    )
}