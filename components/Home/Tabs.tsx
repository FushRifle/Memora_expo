import React, { useState } from 'react';
import { useWindowDimensions, View, Text } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { useTheme } from '@/styles/ThemeContext';
import { RecentActivity } from './Activity';
import { StudyCalendar } from './Events';
import { ScrollView } from 'tamagui';

export default function HomeTabs() {
    const { colors, isDark } = useTheme();
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'overview', title: 'Overview' },
        { key: 'schedule', title: 'Schedule' },
    ]);

    const renderScene = ({ route }: { route: any }) => {
        switch (route.key) {
            case 'overview':
                return (
                    <View style={{ flex: 1 }}>
                        <RecentActivity />
                    </View>
                );
            case 'schedule':
                return (
                    <View style={{ flex: 1 }}>
                        <StudyCalendar />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy={false}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={{
                            backgroundColor: isDark ? '#1e293b' : '#f9fafb',
                            borderWidth: 1,
                            borderColor: isDark ? '#334155' : colors.primary,
                            borderRadius: 8,
                            marginBottom: 16,
                            marginHorizontal: 16,
                            elevation: 2,
                        }}
                        indicatorStyle={{
                            backgroundColor: isDark ? '#2dd4bf' : colors.primary,
                            height: 3,
                            borderRadius: 2,
                        }}
                        activeColor={isDark ? '#2dd4bf' : colors.primary as any}
                        inactiveColor={isDark ? '#94a3b8' : '#888'}
                    />
                )}
            />
        </ScrollView>
    );
}
