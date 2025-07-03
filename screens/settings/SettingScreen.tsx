import { YStack, ScrollView, Switch, Separator } from 'tamagui'
import { Moon, Sun, Bell, User, Lock, HelpCircle } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { SettingsHeader } from '@/components/Settings/Header'
import { SettingsGroup } from '@/components/Settings/Group'
import { SettingsItem } from '@/components/Settings/Item'
import React, { useState } from 'react'

export function SettingsScreen() {
    const navigation = useNavigation()
    const [darkMode, setDarkMode] = React.useState(false)

    return (
        <ScrollView>
            <YStack space="$4" padding="$4">
                <SettingsHeader onBack={() => navigation.goBack()} />

                <SettingsGroup title="Account" index={0}>
                    <SettingsItem icon={User} label="Edit Profile" onPress={() => navigation.navigate('EditProfile' as never)} />
                    <Separator />
                    <SettingsItem icon={Lock} label="Privacy" onPress={() => navigation.navigate('Privacy' as never)} />
                </SettingsGroup>

                <SettingsGroup title="Preferences" index={1}>
                    <SettingsItem
                        icon={darkMode ? Moon : Sun}
                        label="Dark Mode"
                        onPress={() => {
                            setDarkMode(!darkMode)
                            Haptics.selectionAsync()
                        }}
                    >
                        <Switch
                            size="$2"
                            checked={darkMode}
                            onCheckedChange={(val) => {
                                setDarkMode(val)
                                Haptics.selectionAsync()
                            }}
                        >
                            <Switch.Thumb />
                        </Switch>
                    </SettingsItem>
                    <Separator />
                    <SettingsItem icon={Bell} label="Notifications" onPress={() => navigation.navigate('NotificationSettings' as never)} />
                </SettingsGroup>

                <SettingsGroup title="Support" index={2}>
                    <SettingsItem icon={HelpCircle} label="Help Center" onPress={() => navigation.navigate('Help' as never)} />
                    <Separator />
                    <SettingsItem icon={Lock} label="Terms & Privacy" onPress={() => navigation.navigate('Terms' as never)} />
                </SettingsGroup>
            </YStack>
        </ScrollView>
    )
}