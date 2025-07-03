import React, { useCallback } from 'react'
import { YStack, ScrollView, Switch, Separator, Text } from 'tamagui'
import { Moon, Sun, Bell, User, Lock, HelpCircle } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { SettingsHeader } from '@/components/Settings/Header'
import { SettingsItem } from '@/components/Settings/Item'
import { useTheme } from '@/styles/ThemeContext'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '@/types'
import { LinearGradient } from 'tamagui/linear-gradient'

export function SettingsScreen() {
    const { isDark, toggleTheme, colors } = useTheme()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handleToggleTheme = useCallback(() => {
        toggleTheme()
        Haptics.selectionAsync()
    }, [toggleTheme])

    // Gradient colors
    const gradients = isDark
        ? [
            ['#2a2a4f', '#3f3f7f'],
            ['#223344', '#445566'],
            ['#2c2c4c', '#4c4c6c'],
        ]
        : [
            ['#42C6A1', '#4B0082'],
            ['#4B0082', '#42C6A1'],
            ['#42C6A1', '#4B0082'],
        ]

    return (
        <ScrollView showsVerticalScrollIndicator={false} backgroundColor={colors.background}>
            <YStack space="$4" padding="$4">
                <SettingsHeader onBack={() => navigation.goBack()} />

                {/* Account Group */}
                <LinearGradient
                    colors={gradients[0]}
                    start={[0, 0]}
                    end={[1, 1]}
                    borderRadius={16}
                    padding="$3"
                >
                    <Text color="white" fontWeight="600" mb="$2">Account</Text>
                    <YStack borderRadius="$4" overflow="hidden" bg="rgba(255,255,255,0.1)">
                        <SettingsItem icon={User}
                            label="Edit Profile" onPress={() => navigation.navigate('EditProfile' as never)} />
                        <Separator />
                        <SettingsItem icon={Lock} label="Privacy" onPress={() => navigation.navigate('Privacy' as never)} />
                    </YStack>
                </LinearGradient>

                {/* Preferences Group */}
                <LinearGradient
                    colors={gradients[1]}
                    start={[0, 0]}
                    end={[1, 1]}
                    borderRadius={16}
                    padding="$3"
                >
                    <Text color="white" fontWeight="600" mb="$2">Preferences</Text>
                    <YStack borderRadius="$4" overflow="hidden" bg="rgba(255,255,255,0.1)">
                        <SettingsItem
                            icon={isDark ? Moon : Sun}
                            label="Dark Mode"
                            onPress={handleToggleTheme}
                        >
                            <Switch
                                size="$2"
                                checked={isDark}
                                onCheckedChange={() => {
                                    toggleTheme()
                                    Haptics.selectionAsync()
                                }}
                            >
                                <Switch.Thumb />
                            </Switch>
                        </SettingsItem>
                        <Separator />
                        <SettingsItem icon={Bell} label="Notifications" onPress={() => navigation.navigate('NotificationSettings' as never)} />
                    </YStack>
                </LinearGradient>

                {/* Support Group */}
                <LinearGradient
                    colors={gradients[2]}
                    start={[0, 0]}
                    end={[1, 1]}
                    borderRadius={16}
                    padding="$3"
                >
                    <Text color="white" fontWeight="600" mb="$2">Support</Text>
                    <YStack borderRadius="$4" overflow="hidden" bg="rgba(255,255,255,0.1)">
                        <SettingsItem icon={HelpCircle} label="Help Center" onPress={() => navigation.navigate('Help' as never)} />
                        <Separator />
                        <SettingsItem icon={Lock} label="Terms & Privacy" onPress={() => navigation.navigate('Terms' as never)} />
                    </YStack>
                </LinearGradient>
            </YStack>
        </ScrollView>
    )
}
