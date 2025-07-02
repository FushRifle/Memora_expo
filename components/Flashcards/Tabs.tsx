import { Tabs, Text, XStack } from 'tamagui'
import { useTheme } from 'react-native-paper'

export const FlashcardTabs = ({
    activeTab,
    setActiveTab
}: {
    activeTab: string,
    setActiveTab: (tab: string) => void
}) => {
    const theme = useTheme()

    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            borderBottomWidth={1}
            borderBottomColor="#e0e0e0"
            backgroundColor="white"
        >
            <XStack>
                <Tabs.List
                    justifyContent="space-around"
                    backgroundColor="white"
                    padding="$1"
                >
                    {['create', 'preview', 'study'].map((tab) => (
                        <Tabs.Trigger
                            key={tab}
                            value={tab}
                            borderBottomWidth={2}
                            borderBottomColor={activeTab === tab ? '#1976d2' : 'transparent'}
                            backgroundColor="white"
                            px="$4"
                            py="$2"
                        >
                            <Text
                                color={activeTab === tab ? '#1976d2' : '#616161'}
                                fontWeight={activeTab === tab ? '700' : '500'}
                                fontSize={14}
                                textTransform="capitalize"
                            >
                                {tab}
                            </Text>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </XStack>
        </Tabs>
    )
}
