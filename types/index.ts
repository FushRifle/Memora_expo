import 'tamagui'


export type RootStackParamList = {
    MainTabs: undefined
    FlashcardViewer: undefined
    DocumentResult: undefined
    Analytics: undefined
    Settings: undefined
    Profile: undefined
    Documents: undefined
    Notifications: undefined
    Quiz: undefined
}

declare module 'tamagui' {
    interface Theme {
        accent: string
        accent2: string
        bg: string
        bg2: string
        color: string
        color2: string
    }
}

// Base types
export type Timestamp = string | Date

// Activity types
export type ActivityType = 'flashcards' | 'document' | 'quiz' | 'note'

export interface BaseActivity {
    id: string
    title: string
    type: ActivityType
    time: Timestamp
    subject?: string
}

export interface FlashcardActivity extends BaseActivity {
    type: 'flashcards'
    cardCount: number
    lastScore?: number
}

export interface DocumentActivity extends BaseActivity {
    type: 'document'
    pageCount?: number
    wordCount?: number
}

export type ActivityItem = FlashcardActivity | DocumentActivity

// User types
export interface UserProfile {
    id: string
    name: string
    email: string
    avatarUrl?: string
    joinedDate: Timestamp
    lastActive: Timestamp
}

// Study content types
export interface FlashcardDeck {
    id: string
    title: string
    description?: string
    cardCount: number
    createdAt: Timestamp
    updatedAt: Timestamp
    tags?: string[]
}

export interface StudyDocument {
    id: string
    title: string
    type: 'pdf' | 'text' | 'word' | 'markdown'
    size?: number
    uploadedAt: Timestamp
    lastAccessed?: Timestamp
}

// AI Assistant types
export interface AIConversation {
    id: string
    title: string
    lastMessage: string
    updatedAt: Timestamp
    messageCount: number
}

// Analytics types
export interface StudySession {
    id: string
    duration: number // in minutes
    startTime: Timestamp
    endTime: Timestamp
    activityType: ActivityType
    activityId: string
    focusScore?: number // 1-10
}

export interface ProgressData {
    date: string
    minutesStudied: number
    flashcardsReviewed: number
    documentsProcessed: number
}

// Component props types
export interface RecentActivityProps {
    loading: boolean
    activities: ActivityItem[]
}

export interface ActivityCardProps {
    activity: ActivityItem
    onPress: () => void
}

export interface QuickActionItem {
    id: string
    label: string
    icon: React.ComponentType<any>
    route: string
}