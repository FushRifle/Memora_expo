import { Tabs, Text, XStack } from 'tamagui'
import { useTheme } from 'react-native-paper'

export const FlashcardTabs = ({ activeTab, setActiveTab }: {
    activeTab: string,
    setActiveTab: (tab: string) => void
}) => {
    return (
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            borderBottomWidth={1}
            borderBottomColor="#e0e0e0"
            backgroundColor="white"
        >
            <XStack>
                <Tabs.List>
                    <Tabs.Trigger value="create">
                        <Text>Create</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="preview">
                        <Text>Preview</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="study">
                        <Text>Study</Text>
                    </Tabs.Trigger>
                </Tabs.List>
            </XStack>
        </Tabs>
    )
}