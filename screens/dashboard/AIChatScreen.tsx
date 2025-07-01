import React, { useState, useRef, useEffect } from 'react'
import { YStack, ScrollView } from 'tamagui'
import { ChatHeader } from '@/components/Chat/Header'
import { ChatMessage } from '@/components/Chat/Message'
import { ChatInput } from '@/components/Chat/Input'

type Message = {
    id: string
    text: string
    fromAI: boolean
    timestamp?: Date
}

export const AIChatScreen = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "👋 Hello! I'm your Memora AI assistant. How can I help you with your studies today?",
            fromAI: true,
            timestamp: new Date(),
        },
    ])

    const scrollViewRef = useRef<ScrollView>(null)

    const sendMessage = (text: string) => {
        if (!text.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            fromAI: false,
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])

        // Simulate AI typing delay
        setTimeout(() => {
            const aiReply: Message = {
                id: Date.now().toString() + '_ai',
                text: getAIResponse(text),
                fromAI: true,
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, aiReply])
        }, 1000)
    }

    const getAIResponse = (userInput: string) => {
        const responses = [
            "That's an interesting question! 📚 Based on your notes, I'd suggest...",
            "I can help with that! ✏️ Here's what I found...",
            "Great question! 🤔 Let me explain it simply...",
            "Sure! Here's a quick breakdown of that concept...",
            "Based on your recent study topics, here's something useful..."
        ]
        return responses[Math.floor(Math.random() * responses.length)]
    }

    useEffect(() => {
        // Always scroll to bottom when messages update
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    return (
        <YStack flex={1} bg="#f5f5f5">
            <ChatHeader />

            <ScrollView
                ref={scrollViewRef}
                flex={1}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 6 }}
            >
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        text={msg.text}
                        fromAI={msg.fromAI}
                    />
                ))}
            </ScrollView>

            <ChatInput onSend={sendMessage} />
        </YStack>
    )
}
