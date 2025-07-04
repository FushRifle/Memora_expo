import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, BookOpen, Bot, GraduationCap, User2 } from '@tamagui/lucide-icons'
import { useSafeTheme } from '@/hook/theme/useTheme'
import type { RootStackParamList } from '@/types'


// Dashboard screens
import HomeScreen from '@/screens/dashboard/HomeScreen'
import { FlashcardGeneratorScreen } from '@/screens/dashboard/FlashcardGeneratorScreen'
import { FlashcardViewerScreen } from '@/screens/dashboard/FlashcardViewerScreen'
import { StudyAnalyticsScreen } from '@/screens/dashboard/StudyAnalyticsScreen'
import { AIChatScreen } from '@/screens/dashboard/AIChatScreen'
import DocumentResultScreen from '@/screens/dashboard/DocumentResultScreen'
import { DocumentsScreen } from '@/screens/dashboard/DocumentAnalysisScreen'
import CoursesScreen from '@/screens/dashboard/CourseScreen'

// Settings & Profile screens
import { ProfileScreen } from '@/screens/settings/ProfileScreen'
import { SettingsScreen } from '@/screens/settings/SettingScreen'
import { NotificationScreen } from '@/screens/settings/NotificationScreen'


const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function MainTabs() {
    const theme = useSafeTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
                name="Courses"
                component={CoursesScreen}
                options={{
                    tabBarIcon: ({ color }) => <GraduationCap color={color} />,
                }}
            />
            <Tab.Screen
                name="AI Chat"
                component={AIChatScreen}
                options={{
                    tabBarIcon: ({ color }) => <Bot color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <User2 color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}

export function MainNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerShown: false,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="FlashcardViewer" component={FlashcardViewerScreen} />
            <Stack.Screen name="DocumentResult" component={DocumentResultScreen} />
            <Stack.Screen name="Analytics" component={StudyAnalyticsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Documents" component={DocumentsScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
        </Stack.Navigator>
    )
}
