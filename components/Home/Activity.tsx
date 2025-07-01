import React, { useState } from 'react'
import {
    YStack,
    XStack,
    Text,
    Card,
    Button,
    H4,
    ScrollView
} from 'tamagui'
import {
    BookOpen,
    FileText,
    ChevronRight,
    Clock,
    Activity,
    BarChart2
} from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'

const MOCK_ACTIVITIES = [
    { id: '1', title: 'Calculus Chapter 3 Review', time: '2h ago', type: 'flashcards', duration: '45 min', progress: 85 },
    { id: '2', title: 'Research Paper Draft', time: 'Yesterday', type: 'document', duration: '1.5h', progress: 60 },
    { id: '3', title: 'Chemistry Formulas', time: '2d ago', type: 'flashcards', duration: '30 min', progress: 92 },
    { id: '4', title: 'History Essay Outline', time: '3d ago', type: 'document', duration: '1h', progress: 75 }
]

const STUDY_DATA = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [45, 60, 30, 75, 90, 20, 45],
            color: () => `#1976d2`,
            strokeWidth: 2
        }
    ]
}

const PROGRESS_DATA = {
    labels: ['Calculus', 'Chemistry', 'History', 'Literature'],
    datasets: [
        { data: [85, 92, 75, 68] }
    ]
}

export const RecentActivity = () => {
    const router = useRouter()
    const screenWidth = Dimensions.get('window').width - 40
    const [activeTab, setActiveTab] = useState<'study' | 'progress'>('study')

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <YStack space="$4">
                {/* Header */}
                <H4 color="#424242">Study Overview</H4>

                {/* Charts with tabs */}
                <Card backgroundColor="white" borderRadius={12} shadowColor="#000" shadowOpacity={0.05} shadowRadius={4}>
                    <YStack p="$3" space="$2">
                        <XStack ai="center" space="$2">
                            {activeTab === 'study'
                                ? <BarChart2 size={20} color="#1976d2" />
                                : <Activity size={20} color="#1976d2" />}
                            <Text fontWeight="600" color="#424242">
                                {activeTab === 'study' ? 'Weekly Study Time' : 'Subject Progress'}
                            </Text>
                        </XStack>

                        {activeTab === 'study' ? (
                            <LineChart
                                data={STUDY_DATA}
                                width={screenWidth}
                                height={200}
                                chartConfig={{
                                    backgroundColor: 'white',
                                    backgroundGradientFrom: 'white',
                                    backgroundGradientTo: 'white',
                                    decimalPlaces: 0,
                                    color: () => `#1976d2`,
                                    labelColor: () => `#757575`,
                                    propsForDots: { r: "4", strokeWidth: "2", stroke: "#1976d2" }
                                }}
                                bezier
                                style={{ marginVertical: 8, borderRadius: 12 }}
                            />
                        ) : (
                            <BarChart
                                data={PROGRESS_DATA}
                                width={screenWidth}
                                height={200}
                                yAxisLabel=""
                                yAxisSuffix=""
                                chartConfig={{
                                    backgroundColor: 'white',
                                    backgroundGradientFrom: 'white',
                                    backgroundGradientTo: 'white',
                                    decimalPlaces: 0,
                                    color: () => `#1976d2`,
                                    labelColor: () => `#757575`,
                                    barPercentage: 0.5
                                }}
                                fromZero
                                style={{ marginVertical: 8, borderRadius: 12 }}
                            />

                        )}

                        {/* Tabs */}
                        <XStack mt="$2" jc="space-around">
                            <Button
                                size="$2"
                                backgroundColor={activeTab === 'study' ? '#1976d2' : 'white'}
                                borderWidth={1}
                                borderColor="#1976d2"
                                borderRadius={20}
                                onPress={() => setActiveTab('study')}
                            >
                                <Text color={activeTab === 'study' ? 'white' : '#1976d2'}>Weekly Study</Text>
                            </Button>
                            <Button
                                size="$2"
                                backgroundColor={activeTab === 'progress' ? '#1976d2' : 'white'}
                                borderWidth={1}
                                borderColor="#1976d2"
                                borderRadius={20}
                                onPress={() => setActiveTab('progress')}
                            >
                                <Text color={activeTab === 'progress' ? 'white' : '#1976d2'}>Progress</Text>
                            </Button>
                        </XStack>
                    </YStack>
                </Card>

                {/* Recent Activity */}
                <YStack space="$3">
                    <XStack ai="center" space="$2">
                        <Clock size={20} color="#1976d2" />
                        <Text fontWeight="600" color="#424242">Recent Sessions</Text>
                    </XStack>

                    {MOCK_ACTIVITIES.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onPress={() => {
                                if (activity.type === 'flashcards') router.push(`/flashcardViewer?deckId=${activity.id}`)
                                else router.push(`/documentResult?docId=${activity.id}`)
                            }}
                        />
                    ))}
                </YStack>
            </YStack>
        </ScrollView>
    )
}

type ActivityCardProps = {
    activity: typeof MOCK_ACTIVITIES[0]
    onPress: () => void
}

const ActivityCard = ({ activity, onPress }: ActivityCardProps) => (
    <Card
        backgroundColor="white"
        p="$3"
        onPress={onPress}
        pressStyle={{ backgroundColor: '#f5f5f5' }}
        borderWidth={1}
        borderColor="#e0e0e0"
        borderRadius={10}
        shadowColor="#000"
        shadowOpacity={0.05}
        shadowRadius={4}
    >
        <XStack space="$3" ai="center">
            <YStack backgroundColor="#1976d220" p="$2" borderRadius={8} ai="center" jc="center" width={40} height={40}>
                {activity.type === 'flashcards'
                    ? <BookOpen size={20} color="#1976d2" />
                    : <FileText size={20} color="#1976d2" />}
            </YStack>
            <YStack flex={1} space="$1">
                <Text fontWeight="600" numberOfLines={1} color="#424242">{activity.title}</Text>
                <XStack space="$2" ai="center">
                    <Clock size={14} color="#757575" />
                    <Text color="#757575" fontSize="$1">{activity.time} • {activity.duration}</Text>
                    <Text ml="auto" color="#1976d2" fontWeight="600" fontSize="$1">{activity.progress}%</Text>
                </XStack>
            </YStack>
            <ChevronRight size={18} color="#757575" />
        </XStack>
    </Card>
)
