import { useState } from 'react'
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars'
import { YStack, XStack, Text, Card, Button, H4, Paragraph } from 'tamagui'
import { ChevronRight, Clock, Bookmark, Flag } from '@tamagui/lucide-icons'
import { useTheme } from 'react-native-paper'
import { TouchableRipple } from 'react-native-paper'

// Configure calendar locale
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

export const StudyCalendar = () => {
    const theme = useTheme()
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

    // Sample study events data
    const studyEvents = {
        [selectedDate]: [
            {
                id: '1',
                title: 'Math Chapter 5 Review',
                time: '09:00 - 10:30',
                type: 'study',
                course: 'Mathematics'
            },
            {
                id: '2',
                title: 'History Essay Deadline',
                time: '23:59',
                type: 'deadline',
                course: 'History'
            },
            {
                id: '3',
                title: 'Group Study Session',
                time: '15:00 - 17:00',
                type: 'group',
                course: 'Physics'
            }
        ]
    }

    const markedDates = {
        [selectedDate]: { selected: true, selectedColor: theme.colors.primary },
        '2023-11-15': { marked: true, dotColor: theme.colors.error },
        '2023-11-20': { marked: true, dotColor: theme.colors.secondary }
    }

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'deadline':
                return <Flag size={16} color={theme.colors.error} />
            case 'group':
                return <Bookmark size={16} color={theme.colors.secondary} />
            default:
                return <Clock size={16} color={theme.colors.primary} />
        }
    }

    return (
        <YStack space="$3" mb="$4">
            <H4 fontWeight="600" color={theme.colors.onSurface}>
                Study Schedule
            </H4>

            <Card mode="contained" style={{ borderRadius: 12 }}>
                <RNCalendar
                    current={selectedDate}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: theme.colors.surface,
                        calendarBackground: theme.colors.surface,
                        textSectionTitleColor: theme.colors.onSurface,
                        selectedDayBackgroundColor: theme.colors.primary,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: theme.colors.primary,
                        dayTextColor: theme.colors.onSurface,
                        textDisabledColor: theme.colors.onSurfaceVariant,
                        arrowColor: theme.colors.primary,
                        monthTextColor: theme.colors.onSurface,
                        indicatorColor: theme.colors.primary,
                        textDayFontFamily: 'Inter',
                        textMonthFontFamily: 'Inter',
                        textDayHeaderFontFamily: 'Inter',
                        textDayFontWeight: '500',
                        textMonthFontWeight: '600',
                        textDayHeaderFontWeight: '500',
                        textDayFontSize: 14,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 12
                    }}
                />
            </Card>

            <YStack space="$2">
                <XStack ai="center" jc="space-between">
                    <Text fontWeight="600" color={theme.colors.onSurface}>
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                    <Button
                        unstyled
                        iconAfter={<ChevronRight size={16} />}
                        onPress={() => console.log('View all')}
                    >
                        <Text color={theme.colors.primary}>View All</Text>
                    </Button>
                </XStack>

                {studyEvents[selectedDate] ? (
                    studyEvents[selectedDate].map(event => (
                        <TouchableRipple
                            key={event.id}
                            onPress={() => console.log('Event pressed', event.id)}
                            borderless
                            rippleColor={theme.colors.primaryContainer}
                            style={{ borderRadius: 8 }}
                        >
                            <Card
                                bg={theme.colors.surfaceVariant}
                                p="$3"
                                mb="$2"
                                borderWidth={1}
                                borderColor={theme.colors.outline}
                            >
                                <XStack space="$3" ai="center">
                                    {getEventIcon(event.type)}
                                    <YStack flex={1}>
                                        <Text fontWeight="600" color={theme.colors.onSurface}>
                                            {event.title}
                                        </Text>
                                        <XStack space="$2" ai="center">
                                            <Text fontSize="$1" color={theme.colors.onSurfaceVariant}>
                                                {event.time}
                                            </Text>
                                            <Text fontSize="$1" color={theme.colors.onSurfaceVariant}>
                                                •
                                            </Text>
                                            <Text fontSize="$1" color={theme.colors.onSurfaceVariant}>
                                                {event.course}
                                            </Text>
                                        </XStack>
                                    </YStack>
                                </XStack>
                            </Card>
                        </TouchableRipple>
                    ))
                ) : (
                    <Card
                        bg={theme.colors.surfaceVariant}
                        p="$4"
                        ai="center"
                        jc="center"
                        borderWidth={1}
                        borderColor={theme.colors.outline}
                    >
                        <Paragraph color={theme.colors.onSurfaceVariant} textAlign="center">
                            No study sessions scheduled for this day
                        </Paragraph>
                        <Button
                            mt="$2"
                            size="$2"
                            bg={theme.colors.primary}
                            onPress={() => console.log('Add session')}
                        >
                            <Text color={theme.colors.onPrimary}>Plan Study Session</Text>
                        </Button>
                    </Card>
                )}
            </YStack>
        </YStack>
    )
}