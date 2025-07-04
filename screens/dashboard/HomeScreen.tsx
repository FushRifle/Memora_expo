import React from 'react'
import { YStack, ScrollView } from 'tamagui'
import { HomeHeader } from '@/components/Home/Header'
import { HeroCard } from '@/components/Home/HeroCard'
import { QuickActions } from '@/components/Home/QuickActions'
import { useRecentActivity } from '@/hook/useRecentActivity'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/styles/ThemeContext'
import HomeTabs from '@/components/Home/Tabs'
export default function HomeScreen() {
    const { recentActivity, loading } = useRecentActivity()
    const navigation = useNavigation()
    const { colors, isDark } = useTheme()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <YStack f={1} bg={colors.background} p="$4" space="$4">
                <HomeHeader />
                <QuickActions handleActionPress={(screen) => navigation.navigate(screen as never)} />
                <HeroCard />
                <HomeTabs />
            </YStack>
        </ScrollView>
    )
}
