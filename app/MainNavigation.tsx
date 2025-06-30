// navigation/MainNavigation.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/dashboard/HomeScreen'
import { FlashcardGeneratorScreen } from '@/screens/dashboard/FlashCardGeneratorScreen'
import { DocumentAnalysisScreen } from '@/screens/dashboard/DocumentAnalysisScreen'
import { StudyAnalyticsScreen } from '@/screens/dashboard/StudyAnalyticScreen'
import { VoiceAssistantScreen } from '@/screens/dashboard/VoiceAssistantScreen'
import { FlashcardViewerScreen } from '@/screens/dashboard/FlashCardViewerScreen'
import DocumentResultScreen from '@/screens/dashboard/DocumentResultScreen'
import { Home, BookOpen, Bot, BarChart2 } from '@tamagui/lucide-icons'
import { useSafeTheme } from '@/hook/theme/useTheme'
import React from 'react'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
    const theme = useSafeTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.accent.val,
                tabBarInactiveTintColor: theme.color2.val,
                tabBarStyle: {
                    backgroundColor: theme.bg.val,
                    borderTopColor: theme.bg2.val,
                },
                headerStyle: {
                    backgroundColor: theme.bg.val,
                },
                headerTitleStyle: {
                    color: theme.color.val,
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
                    tabBarIcon: ({ color }) => <BookOpen color={color} />,
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
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlashcardViewer"
                component={FlashcardViewerScreen}
                options={{ title: 'Flashcards' }}
            />
            <Stack.Screen
                name="DocumentResult"
                component={DocumentResultScreen}
                options={{ title: 'Analysis Results' }}
            />
        </Stack.Navigator>
    )
}
