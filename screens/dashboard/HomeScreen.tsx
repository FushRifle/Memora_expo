import React from 'react'
import { YStack, ScrollView, Text, Tabs } from 'tamagui'
import { HomeHeader } from '@/components/Home/Header'
import { HeroCard } from '@/components/Home/HeroCard'
import { QuickActions } from '@/components/Home/QuickActions'
import { RecentActivity } from '@/components/Home/Activity'
import { StudyCalendar } from '@/components/Home/Events'
import { useRecentActivity } from '@/hook/useRecentActivity'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/styles/ThemeContext'

export default function HomeScreen() {
    const { recentActivity, loading } = useRecentActivity()
    const navigation = useNavigation()
    const { colors } = useTheme()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <YStack f={1} bg={colors.background} p="$4" space="$4">
                <HomeHeader />
                <QuickActions handleActionPress={(screen) => navigation.navigate(screen as never)} />
                <HeroCard />

                <Tabs defaultValue="overview" orientation="horizontal" flexDirection="column">
                    <Tabs.List disablePassBorderRadius backgroundColor="transparent"
                        jc="center"
                    >
                        <Tabs.Tab
                            value="overview"
                            p="$2"
                            borderRadius="$2"
                            pressStyle={{ bg: colors.primary }} // light primary tint on press
                        >
                            <Text fontWeight="600" color={colors.primary}>
                                Overview
                            </Text>
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="schedule"
                            p="$2"
                            borderRadius="$2"
                            pressStyle={{ bg: colors.primary }}
                        >
                            <Text fontWeight="600" color={colors.primary}>
                                Schedule
                            </Text>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Content value="overview">
                        <RecentActivity />
                    </Tabs.Content>

                    <Tabs.Content value="schedule">
                        <StudyCalendar />
                    </Tabs.Content>
                </Tabs>
            </YStack>
        </ScrollView>
    )
}
