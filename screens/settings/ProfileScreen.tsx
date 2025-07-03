import { YStack, ScrollView, Separator, Text, H4 } from 'tamagui'
import { Bookmark, Bell, Mail } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import { ProfileHeader } from '@/components/Profile/Header'
import { ProfileCard } from '@/components/Profile/Card'
import { ProfileMenuItem } from '@/components/Profile/MenuItem'
import { ActivityItem } from '@/components/Profile/Activity'
import { MotiView } from 'moti'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'

export function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const stats = [
        { value: '245', label: 'Notes' },
        { value: '1.2K', label: 'Views' },
        { value: '48', label: 'Following' }
    ]

    const menuItems = [
        { icon: Bookmark, label: 'Saved Items', screen: 'Saved' },
        { icon: Bell, label: 'Notifications', screen: 'Notifications' },
        { icon: Mail, label: 'Messages', screen: 'Messages' }
    ]

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <YStack space="$5" padding="$4">
                {/* Header */}
                <ProfileHeader onSettingsPress={() => navigation.navigate('Settings')} />

                {/* Profile card */}
                <ProfileCard
                    name="Fush"
                    username="fush_learner"
                    bio="Lifelong learner and knowledge collector. Building digital gardens."
                    stats={stats}
                />

                {/* Menu items */}
                <YStack space="$2" marginTop="$4">
                    {menuItems.map((item, index) => (
                        <ProfileMenuItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            onPress={() => navigation.navigate(item.screen as never)}
                            delay={200 + index * 50}
                        />
                    ))}
                </YStack>

                {/* Recent activity */}
                <YStack space="$3" marginTop="$6">
                    <MotiView
                        from={{ opacity: 0, translateY: -8 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'spring', delay: 150 }}
                    >
                        <H4 fontWeight="700" fontSize="$6">
                            Recent Activity
                        </H4>
                    </MotiView>

                    {[1, 2, 3].map((item) => (
                        <ActivityItem
                            key={item}
                            title="Created new note"
                            time={`${item} day${item !== 1 ? 's' : ''} ago`}
                            isLast={item === 3}
                        />
                    ))}
                </YStack>
            </YStack>
        </ScrollView>
    )
}
