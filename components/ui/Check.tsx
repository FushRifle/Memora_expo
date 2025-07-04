import React from 'react'
import { XStack } from 'tamagui'
import { FaCheck } from 'react-icons/fa'


type CheckIndicatorProps = {
    checked: boolean
    color?: string
}

export const CheckIndicator = ({ checked, color = '$blue10' }: CheckIndicatorProps) => {
    return (
        <XStack
            width={20}
            height={20}
            borderRadius={10}
            borderWidth={1.5}
            borderColor={checked ? color : '$gray8'}
            alignItems="center"
            justifyContent="center"
            backgroundColor={checked ? color : 'transparent'}
        >
            {checked && <FaCheck size={12} color="white" />}
        </XStack>
    )
}
