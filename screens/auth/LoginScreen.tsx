import React from 'react'
import {
    YStack,
    XStack,
    Text,
    Input,
    Button,
    Checkbox,
    Card,
    H2,
    H3,
    Separator,
    ScrollView,
} from 'tamagui'
import { Mail, Lock, ChevronRight, Apple } from '@tamagui/lucide-icons'
import { FaGoogle } from 'react-icons/fa'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
    const router = useRouter()

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <YStack p="$4" space="$4" bg="$background" flex={1}>
                {/* Header */}
                <YStack space="$2" mb="$4">
                    <H2 fontWeight="bold">Welcome back</H2>
                    <Text color="$color2">Continue your journey with Memora</Text>
                </YStack>

                {/* Login Form */}
                <YStack space="$3">
                    <YStack space="$2">
                        <Text fontWeight="500">Email</Text>
                        <XStack
                            borderWidth={1}
                            borderColor="$borderColor"
                            br="$4"
                            px="$3"
                            py="$3"
                            ai="center"
                            space="$2"
                        >
                            <Mail size={16} color="gray" />
                            <Input
                                placeholder="Enter your email"
                                flex={1}
                                borderWidth={0}
                                p={0}
                            // Tamagui Input uses controlled text, add state if needed
                            />
                        </XStack>
                    </YStack>

                    <YStack space="$2">
                        <Text fontWeight="500">Password</Text>
                        <XStack
                            borderWidth={1}
                            borderColor="$borderColor"
                            br="$4"
                            px="$3"
                            py="$3"
                            ai="center"
                            space="$2"
                        >
                            <Lock size={16} color="gray" />
                            <Input
                                placeholder="Enter your password"
                                secureTextEntry
                                flex={1}
                                borderWidth={0}
                                p={0}
                            />
                        </XStack>
                    </YStack>

                    <XStack jc="space-between" ai="center">
                        <XStack space="$2" ai="center">
                            <Checkbox size="$2" defaultChecked>
                                <Checkbox.Indicator />
                            </Checkbox>
                            <Text fontSize="$2">Remember me</Text>
                        </XStack>
                        <Button unstyled onPress={() => alert('Forgot password?')}>
                            <Text color="$accent" fontSize="$2">
                                Forgot password?
                            </Text>
                        </Button>
                    </XStack>

                    <Button
                        bg="$accent"
                        py="$3"
                        br="$4"
                        onPress={() => router.push('/home')}
                        elevation="$2"
                    >
                        <Text color="white" fontWeight="bold">
                            Log in
                        </Text>
                    </Button>
                </YStack>

                {/* Social Login */}
                <YStack space="$3" my="$4">
                    <XStack jc="center" ai="center" space="$2">
                        <Separator />
                        <Text color="$color2" fontSize="$2">
                            OR
                        </Text>
                        <Separator />
                    </XStack>

                    <XStack space="$3">
                        <Button
                            flex={1}
                            bg="$background"
                            borderWidth={1}
                            borderColor="$borderColor"
                            py="$2"
                            br="$4"
                            icon={<FaGoogle name="google" size={16} color="black" />}
                        >
                            <Text>Google</Text>
                        </Button>
                        <Button
                            flex={1}
                            bg="$background"
                            borderWidth={1}
                            borderColor="$borderColor"
                            py="$2"
                            br="$4"
                            icon={<Apple size={16} />}
                        >
                            <Text>Apple</Text>
                        </Button>
                    </XStack>
                </YStack>

                <XStack jc="center" mt="$2">
                    <Text color="$color2">Don't have an account? </Text>
                    <Button unstyled onPress={() => router.push('/signup')}>
                        <Text color="$accent">Create Account</Text>
                    </Button>
                </XStack>

                {/* Services Section */}
                <YStack mt="$6" space="$4">
                    <H3 fontWeight="bold">Services</H3>
                    <Card elevate p="$4" br="$4">
                        <YStack space="$3">
                            <XStack space="$3">
                                <Image
                                    source={require('@/assets/memora-icon.png')}
                                    style={{ width: 40, height: 40 }}
                                />
                                <YStack>
                                    <Text fontWeight="bold">Flashcards</Text>
                                    <Text fontWeight="bold">Notes</Text>
                                    <Text fontWeight="bold">AI Tutor</Text>
                                    <Text fontWeight="bold">Analytics</Text>
                                </YStack>
                            </XStack>

                            <Card bg="$accentBackground" p="$3" br="$3">
                                <Text color="$accent" fontWeight="bold">
                                    25% OFF Premium
                                </Text>
                            </Card>

                            <Text fontWeight="bold">Memora AI Assistant</Text>
                            <Text color="$color2">Study Session Status</Text>

                            <Button bg="$accent" py="$2" br="$4" iconAfter={<ChevronRight size={16} />}>
                                <Text color="white" fontWeight="bold">
                                    Get Started
                                </Text>
                            </Button>
                        </YStack>
                    </Card>
                </YStack>

                {/* Popular Nearby Section */}
                <YStack mt="$4" space="$4">
                    <H3 fontWeight="bold">Popular Study Groups Nearby</H3>

                    <Card elevate p="$4" br="$4">
                        <YStack space="$3">
                            <XStack space="$3">
                                <Image
                                    source={require('@/assets/study-group1.png')}
                                    style={{ width: 40, height: 40 }}
                                />
                                <YStack>
                                    <Text fontWeight="bold">CS101 Study Group</Text>
                                    <XStack space="$2" ai="center">
                                        <Text color="$color2">★★★★★ (105)</Text>
                                    </XStack>
                                    <XStack space="$2" ai="center">
                                        <Text color="$color2">Open • 2km</Text>
                                    </XStack>
                                </YStack>
                            </XStack>
                        </YStack>
                    </Card>

                    <Card elevate p="$4" br="$4">
                        <YStack space="$3">
                            <XStack space="$3">
                                <Image
                                    source={require('@/assets/study-group2.png')}
                                    style={{ width: 40, height: 40 }}
                                />
                                <YStack>
                                    <Text fontWeight="bold">Math Club</Text>
                                    <XStack space="$2" ai="center">
                                        <Text color="$color2">★★★★★ (105)</Text>
                                    </XStack>
                                    <XStack space="$2" ai="center">
                                        <Text color="$color2">Open • 1.3km</Text>
                                    </XStack>
                                </YStack>
                            </XStack>
                        </YStack>
                    </Card>
                </YStack>
            </YStack>
        </ScrollView>
    )
}
