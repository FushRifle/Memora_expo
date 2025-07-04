import React, { useState, useEffect } from 'react'
import {
    XStack, YStack, Text, Button, Image, Input, Stack,
    AnimatePresence, H4, H6, Spinner, Circle, styled, Card
} from 'tamagui'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'tamagui/linear-gradient'
import { MotiView } from 'moti'
import { Menu, Search } from '@tamagui/lucide-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useTheme } from '@/styles/ThemeContext'
import { colors } from '@/styles/globalStyles'

const FloatingBadge = styled(Circle, {
    position: 'absolute',
    top: 0,
    right: -6,
    backgroundColor: '$red10',
    size: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '$red10',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }
})

const ProfileImageContainer = styled(Stack, {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '$primaryDarkDark',
    shadowRadius: 6,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 }
})

const ActionButton = styled(Stack, {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '$primaryDarkDark',
    backgroundColor: '$surface',
    shadowColor: '$background',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }
})

export const HomeHeader = () => {
    const { isDark } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [unreadCount, setUnreadCount] = useState<number>(3)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (unreadCount > 0) {
            const timer = setTimeout(() => {
                setUnreadCount((prev) => Math.max(0, prev - 1))
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [unreadCount])

    const handleProfilePress = () => navigation.navigate('Profile')
    const handleNotificationPress = () => navigation.navigate('Notifications')
    const handleSettingsPress = () => navigation.navigate('Settings')

    const handleSearchPress = () => {
        if (searchQuery.trim()) {
            setIsSearching(true)
            setTimeout(() => {
                setIsSearching(false)
                console.log('Searching:', searchQuery)
            }, 1500)
        }
    }

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent.key === 'Enter') handleSearchPress()
    }

    return (
        <Card
            borderRadius={24}
            overflow="hidden"
            shadowColor="#000"
            shadowOpacity={0.15}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 6 }}
            mt="$4"
        >
            <YStack
                padding="$4"
                backgroundColor={isDark ? colors.secondary : colors.primary}
            >
                <YStack space="$4">
                    {/* Top row */}
                    <XStack justifyContent="space-between" ai="center">
                        <Button unstyled onPress={handleProfilePress}>
                            <MotiView from={{ scale: 1 }} animate={{ scale: 1.03 }} transition={{ loop: true, duration: 1000 }}>
                                <ProfileImageContainer>
                                    <Image
                                        source={require('@/assets/user.png')}
                                        width="100%"
                                        height="100%"
                                        resizeMode="cover"
                                    />
                                </ProfileImageContainer>
                            </MotiView>
                        </Button>

                        <YStack ai="center" flex={1} px="$3">
                            <H6 color="white" fontWeight="500" letterSpacing={0.5}>
                                Good {getTimeOfDay()},
                            </H6>
                            <MotiView from={{ opacity: 0, translateY: 5 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200 }}>
                                <H4 color="white" fontWeight="900">Fush</H4>
                            </MotiView>
                        </YStack>

                        <XStack space="$3">
                            <Button unstyled onPress={handleNotificationPress}>
                                {unreadCount > 0 && (
                                    <MotiView from={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring' }}
                                    >
                                        <FloatingBadge>
                                            <Text color="white" fontSize="$1" fontWeight="900">{unreadCount}</Text>
                                        </FloatingBadge>
                                    </MotiView>
                                )}
                                <Stack position="relative">
                                    <ActionButton>
                                        <Feather name="bell" size={20} color="white" />
                                    </ActionButton>

                                </Stack>
                            </Button>

                            <Button unstyled
                                onPress={handleSettingsPress}>
                                <ActionButton>
                                    <Menu size={20}
                                        color="white" />
                                </ActionButton>
                            </Button>
                        </XStack>
                    </XStack>

                    {/* Subtitle */}
                    <MotiView from={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 100 }}>
                        <Text fontSize="$4" color="#F3F3F3" textAlign="center" fontWeight="500">
                            What would you like to learn today?
                        </Text>
                    </MotiView>

                    {/* Search */}
                    <XStack space="$3" ai="center">
                        <XStack
                            flex={1}
                            borderWidth={2}
                            borderColor="white"
                            borderRadius={14}
                            backgroundColor="rgba(255,255,255,0.1)"
                            ai="center"
                            px="$3"
                            py="$2"
                        >
                            <Search size={18} color="white" mr="$2" />
                            <Input
                                flex={1}
                                placeholder="Search notes, flashcards..."
                                placeholderTextColor={isDark ? 'white' : '#ddd'}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyPress={handleKeyPress}
                                borderWidth={0}
                                fontSize="$2"
                                height="$3"
                                backgroundColor="transparent"
                                color="white"
                            />
                            {searchQuery && (
                                <AnimatePresence>
                                    <MotiView from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                        <Button unstyled onPress={() => setSearchQuery('')}>
                                            <Feather name="x" size={18} color="white" />
                                        </Button>
                                    </MotiView>
                                </AnimatePresence>
                            )}
                        </XStack>
                        <Button
                            onPress={handleSearchPress}
                            backgroundColor="white"
                            borderRadius={14}
                            px="$4"
                            py="$2.5"
                            icon={isSearching ? <Spinner color="#4B0082" /> : undefined}
                            disabled={isSearching}
                        >
                            {!isSearching && (
                                <Text color="#4B0082" fontWeight="800" fontSize="$3">
                                    Search
                                </Text>
                            )}
                        </Button>
                    </XStack>
                </YStack>
            </YStack>
        </Card>
    )
}

function getTimeOfDay() {
    const hour = new Date().getHours()
    if (hour < 5) return 'night'
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
}
