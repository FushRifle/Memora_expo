import React, { useState, useEffect } from 'react'
import {
    XStack, YStack, Text, Button, Image, Input, Stack,
    AnimatePresence, H4, H6, Spinner, Circle, styled, Card
} from 'tamagui'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'tamagui/linear-gradient'
import { MotiView } from 'moti'
import { FileText, Menu, Search } from '@tamagui/lucide-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'
import { useTheme } from '@/styles/ThemeContext'
import { colors } from '@/styles/globalStyles'

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

export const FlashcardHeader = () => {
    const { isDark } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false)
    const [isFocused, setIsFocused] = useState(false)


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
            overflow="hidden"
            shadowColor="#000"
            shadowOpacity={0.15}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 6 }}
            mt="$4"
            paddingHorizontal={10}
            paddingVertical={10}
        >
            <YStack
                padding="$4"
                space="$4"
                borderRadius={15}
                backgroundColor={isDark ? colors.secondary : colors.primary}
            >
                <XStack ai="center" jc="space-between">
                    <H4 color="white" fontWeight="700">
                        Flashcard Generator
                    </H4>
                    <Button
                        size="$2"
                        icon={<FileText size={16} color="black" />}
                        backgroundColor={isDark ? colors.secondary : 'white'}
                        borderRadius={8}
                        px="$3"
                    >
                        <Text color="black" fontWeight="600">Export</Text>
                    </Button>
                </XStack>

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
