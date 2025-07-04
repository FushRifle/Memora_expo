import { Text, YStack } from 'tamagui'

export function CustomBadge({ children, color }: { children: React.ReactNode; color: string }) {
    return (
        <YStack
            backgroundColor={color}
            borderRadius={12}
            px="$2"
            py="$1"
            alignItems="center"
            justifyContent="center"
        >
            <Text fontSize="$2" color="white">
                {children}
            </Text>
        </YStack>
    )
}
