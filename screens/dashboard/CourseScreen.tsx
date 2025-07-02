import React, { useState } from 'react'
import {
    YStack, ScrollView, XStack, Input,
    Text, Button
} from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { CourseHeader } from '@/components/Course/Header'
import { CourseCard } from '@/components/Course/Card'
import { ModuleItem } from '@/components/Course/ModuleItem'
import { CourseEmptyState } from '@/components/Course/EmptyState'

type Course = {
    id: string
    title: string
    instructor: string
    progress: number
    duration: string
    students: number
    modules: {
        id: string
        title: string
        duration: string
        completed: boolean
        locked: boolean
    }[]
}

export const CoursesScreen = () => {
    const [courses, setCourses] = useState<Course[]>([
        {
            id: '1',
            title: 'Advanced Calculus',
            instructor: 'Dr. Sarah Johnson',
            progress: 65,
            duration: '8 weeks',
            students: 124,
            modules: [
                { id: '1', title: 'Introduction to Calculus', duration: '45 min', completed: true, locked: false },
                { id: '2', title: 'Limits and Continuity', duration: '1h 20min', completed: true, locked: false },
                { id: '3', title: 'Derivatives', duration: '1h 45min', completed: false, locked: false },
                { id: '4', title: 'Integrals', duration: '2h 10min', completed: false, locked: true },
            ]
        },
        {
            id: '2',
            title: 'Modern Physics',
            instructor: 'Prof. Michael Chen',
            progress: 30,
            duration: '10 weeks',
            students: 89,
            modules: [
                { id: '1', title: 'Quantum Mechanics Basics', duration: '50 min', completed: true, locked: false },
                { id: '2', title: 'Wave-Particle Duality', duration: '1h 15min', completed: false, locked: false },
                { id: '3', title: 'Schrödinger Equation', duration: '1h 30min', completed: false, locked: true },
            ]
        }
    ])
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const handleAddCourse = () => {
        const newCourse = {
            id: Date.now().toString(),
            title: `New Course ${courses.length + 1}`,
            instructor: 'New Instructor',
            progress: 0,
            duration: '4 weeks',
            students: 0,
            modules: []
        }
        setCourses(prev => [newCourse, ...prev])
    }

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <YStack flex={1} backgroundColor="#f5f5f5">
            <CourseHeader title={selectedCourse ? selectedCourse.title : "My Courses"} />

            {selectedCourse ? (
                <ScrollView p="$3">
                    <Text fontWeight="600" color="#1976d2" mb="$3">
                        Course Progress: {selectedCourse.progress}%
                    </Text>

                    <YStack mb="$4">
                        {selectedCourse.modules.map(module => (
                            <ModuleItem
                                key={module.id}
                                title={module.title}
                                duration={module.duration}
                                completed={module.completed}
                                locked={module.locked}
                                onPress={() => console.log(`Open module ${module.id}`)}
                            />
                        ))}
                    </YStack>

                    <Button
                        backgroundColor="#1976d2"
                        onPress={() => setSelectedCourse(null)}
                    >
                        <Text color="white">Back to All Courses</Text>
                    </Button>
                </ScrollView>
            ) : (
                <ScrollView p="$3">
                    <XStack p="$2" mb="$3" backgroundColor="white" borderRadius={8}>
                        <Input
                            flex={1}
                            placeholder="Search courses..."
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

                    {filteredCourses.length > 0 ? (
                        <YStack space="$3">
                            {filteredCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    title={course.title}
                                    instructor={course.instructor}
                                    progress={course.progress}
                                    duration={course.duration}
                                    students={course.students}
                                    onPress={() => setSelectedCourse(course)}
                                />
                            ))}
                        </YStack>
                    ) : (
                        <CourseEmptyState onAddCourse={handleAddCourse} />
                    )}
                </ScrollView>
            )}
        </YStack>
    )
}

export default CoursesScreen