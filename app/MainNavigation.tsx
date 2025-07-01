import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/dashboard/HomeScreen'
import { FlashcardGeneratorScreen } from '@/screens/dashboard/FlashcardGeneratorScreen'
import { DocumentAnalysisScreen } from '@/screens/dashboard/DocumentAnalysisScreen'
import { StudyAnalyticsScreen } from '@/screens/dashboard/StudyAnalyticsScreen'
import { VoiceAssistantScreen } from '@/screens/dashboard/VoiceAssistantScreen'
import { FlashcardViewerScreen } from '@/screens/dashboard/FlashcardViewerScreen'
import DocumentResultScreen from '@/screens/dashboard/DocumentResultScreen'
import { Home, BookOpen, Bot, BarChart2, FileText } from '@tamagui/lucide-icons'
import { useSafeTheme } from '@/hook/theme/useTheme'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
    const theme = useSafeTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // hide header on all tabs
                tabBarActiveTintColor: theme.colors.accent as string,
                tabBarInactiveTintColor: theme.colors.textSecondary as string,
                tabBarStyle: {
                    backgroundColor: theme.colors.background as string,
                    borderTopColor: theme.colors.cardBackground as string,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Home color={color} />,
                }}
            />
            <Tab.Screen
                name="Flashcards"
                component={FlashcardGeneratorScreen}
                options={{
                    tabBarIcon: ({ color }) => <BookOpen color={color} />,
                }}
            />
            <Tab.Screen
                name="Documents"
                component={DocumentAnalysisScreen}
                options={{
                    tabBarIcon: ({ color }) => <FileText color={color} />,
                }}
            />
            <Tab.Screen
                name="Analytics"
                component={StudyAnalyticsScreen}
                options={{
                    tabBarIcon: ({ color }) => <BarChart2 color={color} />,
                }}
            />
            <Tab.Screen
                name="Voice"
                component={VoiceAssistantScreen}
                options={{
                    tabBarIcon: ({ color }) => <Bot color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}

export function MainNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="FlashcardViewer" component={FlashcardViewerScreen} />
            <Stack.Screen name="DocumentResult" component={DocumentResultScreen} />
        </Stack.Navigator>
    )
}
