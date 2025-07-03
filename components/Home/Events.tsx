import { useState } from 'react'
import { WeekCalendar, LocaleConfig } from 'react-native-calendars'
import {
    YStack, XStack, Text, Card,
    Button, H4, ScrollView
} from 'tamagui'
import { ChevronRight, Clock, Users, Flag, BookOpen, Plus } from '@tamagui/lucide-icons'

// --- Locale Config ---
LocaleConfig.locales['en'] = {
    monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today'
}
LocaleConfig.defaultLocale = 'en'

// --- Event Types ---
const EVENT_TYPES = [
    { id: 'study', label: 'Study', icon: BookOpen, color: '#4B0082' },
    { id: 'group', label: 'Group', icon: Users, color: '#0288d1' },
    { id: 'deadline', label: 'Deadline', icon: Flag, color: '#d32f2f' }
]

export const StudyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    // Sample events data
    const studyEvents = {
        [selectedDate]: [
            { id: '1', title: 'Math Chapter 5 Review', time: '09:00 - 10:30', type: 'study', course: 'Mathematics' },
            { id: '2', title: 'History Essay Deadline', time: '23:59', type: 'deadline', course: 'History' },
            { id: '3', title: 'Group Study Session', time: '15:00 - 17:00', type: 'group', course: 'Physics' }
        ]
    }

    // Marked dates (example)
    const markedDates = {
        [selectedDate]: { selected: true, selectedColor: '#4B0082' },
        '2023-11-15': { marked: true, dotColor: '#4B0082' },
        '2023-11-20': { marked: true, dotColor: '#4B0082' }
    }

    // Icon helper
    const getEventIcon = (type: string) => {
        const eventType = EVENT_TYPES.find(t => t.id === type)
        return eventType ? <eventType.icon size={16} color={eventType.color} /> : <Clock size={16} color="#4B0082" />
    }

    return (
        <YStack space="$3" mb="$4" backgroundColor="white" borderRadius={12} padding="$3">

            {/* Header */}
            <XStack ai="center" jc="space-between">
                <H4 fontWeight="700" color="#4B0082">Study Schedule</H4>
                <Button
                    icon={<Plus size={16} color="#4B0082" />}
                    onPress={() => console.log('Add event')}
                    borderRadius={20}
                    borderWidth={1}
                    borderColor="#4B0082"
                    backgroundColor="white"
                    pressStyle={{ backgroundColor: '#f5f5f5' }}
                >
                    <Text color="#4B0082">Add</Text>
                </Button>
            </XStack>

            {/* Week Calendar */}
            <Card backgroundColor="white" elevation={0} borderRadius={10}>
                <WeekCalendar
                    current={selectedDate}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: 'white',
                        calendarBackground: 'white',
                        selectedDayBackgroundColor: '#4B0082',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#4B0082',
                        dayTextColor: '#424242',
                        textDisabledColor: '#bdbdbd',
                        dotColor: '#4B0082',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#4B0082',
                        monthTextColor: '#4B0082',
                        textDayFontFamily: 'Inter',
                        textDayHeaderFontFamily: 'Inter',
                        textDayFontWeight: '500',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: 14,
                        textDayHeaderFontSize: 12,
                    }}
                    style={{
                        paddingHorizontal: 0,      // remove outer padding
                        marginHorizontal: -4,      // optional: pull dates closer
                    }}
                />
            </Card>


            {/* Events */}
            <YStack space="$2">
                {/* Date & view all */}
                <XStack ai="center" jc="space-between" mb="$2">
                    <Text fontWeight="600" color="#424242">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                            weekday: 'long', month: 'short', day: 'numeric'
                        })}
                    </Text>
                    <Button
                        unstyled
                        iconAfter={<ChevronRight size={16} color="#4B0082" />}
                        onPress={() => console.log('View all')}
                    >
                        <Text color="#4B0082">View All</Text>
                    </Button>
                </XStack>

                {/* Event type filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} mb="$2">
                    <XStack space="$2">
                        {EVENT_TYPES.map((type) => (
                            <Button
                                key={type.id}
                                size="$2"
                                borderRadius={20}
                                borderWidth={1}
                                borderColor="#e0e0e0"
                                backgroundColor="white"
                                pressStyle={{ backgroundColor: '#f5f5f5' }}
                            >
                                <XStack space="$1" ai="center">
                                    <type.icon size={14} color={type.color} />
                                    <Text fontSize="$1" color="#424242">{type.label}</Text>
                                </XStack>
                            </Button>
                        ))}
                    </XStack>
                </ScrollView>

                {/* Events list */}
                <YStack space="$2">
                    {studyEvents[selectedDate]?.map((event) => (
                        <Card
                            key={event.id}
                            backgroundColor="white"
                            p="$3"
                            borderRadius={10}
                            borderWidth={1}
                            borderColor="#e0e0e0"
                            shadowColor="#000"
                            shadowOpacity={0.05}
                            shadowRadius={4}
                            pressStyle={{ backgroundColor: '#f5f5f5' }}
                            onPress={() => console.log('Open event details')}
                        >
                            <XStack ai="center" space="$2">
                                <XStack ai="center" jc="center" borderRadius={8} backgroundColor={`${EVENT_TYPES.find(t => t.id === event.type)?.color || '#4B0082'}20`} width={32} height={32}>
                                    {getEventIcon(event.type)}
                                </XStack>
                                <YStack flex={1}>
                                    <Text fontWeight="600" numberOfLines={1} color="#424242">{event.title}</Text>
                                    <Text fontSize="$1" color="#757575">{event.time} • {event.course}</Text>
                                </YStack>
                                <ChevronRight size={16} color="#757575" />
                            </XStack>
                        </Card>
                    ))}
                </YStack>
            </YStack>
        </YStack>
    )
}
