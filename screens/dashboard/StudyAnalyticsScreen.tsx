import React, { useEffect, useState } from 'react'
import { ScrollView, YStack, Text, Spinner } from 'tamagui'
import { useTheme } from '@/styles/ThemeContext'
import { getStudyData } from '@/app/services/StudyService'
import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

type StudyData = { date: string; minutes: number; subject: string; score?: number }

export function StudyAnalyticsScreen() {
    const { colors } = useTheme()
    const [data, setData] = useState<StudyData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStudyData()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <YStack flex={1} ai="center" jc="center" backgroundColor={colors.background}>
                <Spinner size="large" />
            </YStack>
        )
    }

    // Prepare data for chart (last 7 days)
    const weeklyData = data.slice(-7).map((d) => ({
        label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
        value: d.minutes,
    }))

    const screenWidth = Dimensions.get('window').width

    return (
        <ScrollView backgroundColor={colors.background} flex={1} p="$4">
            <Text fontWeight="bold" fontSize={24} color={colors.text} mb="$4">
                Study Analytics
            </Text>

            <BarChart
                data={{
                    labels: weeklyData.map((d) => d.label),
                    datasets: [{ data: weeklyData.map((d) => d.value) }],
                }}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: colors.background as any,
                    backgroundGradientFrom: colors.cardBackground as any,
                    backgroundGradientTo: colors.cardBackground as any,
                    decimalPlaces: 0,
                    color: () => colors.accent as any,
                    labelColor: () => colors.textSecondary as any,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: colors.accent,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignSelf: 'center',
                }}
                fromZero
            />
        </ScrollView>
    )
}
