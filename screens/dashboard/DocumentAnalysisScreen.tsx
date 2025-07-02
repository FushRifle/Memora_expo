import React, { useState } from 'react'
import { YStack, ScrollView, XStack, Input, Button } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { DocumentHeader } from '@/components/Documents/Header'
import { DocumentCard } from '@/components/Documents/Card'
import { DocumentUpload } from '@/components/Documents/Upload'
import { DocumentEmptyState } from '@/components/Documents/EmptyState'

type Document = {
    id: string
    title: string
    type: string
    date: string
    size: string
}

export const DocumentsScreen = () => {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: '1',
            title: 'Calculus Chapter 3 Notes',
            type: 'pdf',
            date: '2 days ago',
            size: '2.4 MB'
        },
        {
            id: '2',
            title: 'History Research Paper',
            type: 'docx',
            date: '1 week ago',
            size: '1.8 MB'
        },
        {
            id: '3',
            title: 'Chemistry Formulas',
            type: 'txt',
            date: '3 weeks ago',
            size: '0.4 MB'
        }
    ])
    const [searchQuery, setSearchQuery] = useState('')

    const handleUpload = () => {
        // In a real app, this would open a file picker
        const newDoc = {
            id: Date.now().toString(),
            title: `New Document ${documents.length + 1}`,
            type: 'pdf',
            date: 'Just now',
            size: '1.2 MB'
        }
        setDocuments(prev => [newDoc, ...prev])
    }

    const handleDelete = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id))
    }

    const handleView = (id: string) => {
        // Navigation to document viewer would happen here
        console.log(`Viewing document ${id}`)
    }

    const filteredDocs = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <YStack flex={1} backgroundColor="#f5f5f5">
            <DocumentHeader />

            <ScrollView p="$3">
                <DocumentUpload onUpload={handleUpload} />

                <XStack p="$2" mb="$3" backgroundColor="white" borderRadius={8}>
                    <Input
                        flex={1}
                        placeholder="Search documents..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        backgroundColor="white"
                        borderWidth={0}
                        fontSize="$5"
                        placeholderTextColor="#9e9e9e"
                    />
                    <Button
                        unstyled
                        icon={<Search size={20} color="#757575" />}
                    />
                </XStack>

                {filteredDocs.length > 0 ? (
                    <YStack space="$2">
                        {filteredDocs.map(doc => (
                            <DocumentCard
                                key={doc.id}
                                title={doc.title}
                                type={doc.type}
                                date={doc.date}
                                size={doc.size}
                                onView={() => handleView(doc.id)}
                                onDelete={() => handleDelete(doc.id)}
                            />
                        ))}
                    </YStack>
                ) : (
                    <DocumentEmptyState onUpload={handleUpload} />
                )}
            </ScrollView>
        </YStack>
    )
}