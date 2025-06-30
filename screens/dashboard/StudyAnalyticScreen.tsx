import { YStack, XStack, Text, ScrollView, Spinner } from 'tamagui'
import { useSafeTheme } from '@/hook/theme/useTheme'
import { useState, useEffect } from 'react'
import { getStudyData } from '@/app/services/StudyService'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory-native'
import { VictoryTheme } from 'victory'


type StudyData = {
    date: string
    minutes: number
    subject: string
    score?: number
}

export function StudyAnalyticsScreen() {
    const theme = useSafeTheme()
    const [data, setData] = useState<StudyData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studyData = await getStudyData()
                setData(studyData)
            } catch (error) {
                console.error('Failed to load study data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <YStack f={1} ai="center" jc="center">
                <Spinner size="large" />
            </YStack>
        )
    }

    // Prepare data for charts
    const weeklyData = data.slice(-7).map(item => ({
        x: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
        y: item.minutes
    }))

    const subjectData = Object.entries(
        data.reduce((acc, item) => {
            acc[item.subject] = (acc[item.subject] || 0) + item.minutes
            return acc
        }, {} as Record<string, number>)
    ).map(([subject, minutes]) => ({
        x: subject,
        y: minutes
    }))

    return (
        <ScrollView p="$4">
            <YStack space="$6">
                <Text fontSize="$8" fontWeight="bold">Study Analytics</Text>

                <YStack space="$3">
                    <Text fontSize="$6">Weekly Study Time</Text>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        height={300}
                    >
                        <VictoryBar
                            data={weeklyData}
                            style={{ data: { fill: theme.accent.val as string } }}
                            animate={{ duration: 1000, onLoad: { duration: 500 } }}
                        />
                    </VictoryChart>
                </YStack>

                <YStack space="$3">
                    <Text fontSize="$6">Time by Subject</Text>
                    <VictoryPie
                        data={subjectData}
                        colorScale={[
                            theme.accent.val as string,
                            theme.accent2.val as string,
                            '#a78bfa',
                            '#f472b6',
                            '#f59e0b'
                        ]}
                        height={300}
                        padAngle={3}
                        innerRadius={50}
                        animate={{ duration: 1000 }}
                    />
                </YStack>

                <YStack space="$3">
                    <Text fontSize="$6">Recent Sessions</Text>
                    {data.slice(-5).reverse().map((session, index) => (
                        <XStack key={index} p="$3" bg="$bg2" borderRadius="$4" space="$4">
                            <Text>{new Date(session.date).toLocaleDateString()}</Text>
                            <Text f={1}>{session.subject}</Text>
                            <Text>{session.minutes} min</Text>
                            {session.score && <Text>{session.score}%</Text>}
                        </XStack>
                    ))}
                </YStack>
            </YStack>
        </ScrollView>
    )
}
