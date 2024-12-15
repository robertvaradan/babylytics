import { Flex, Heading } from '@radix-ui/themes'
import { NumberInput } from '../core/numberinput'

export function FeedingDurationScreen({
    leftDuration,
    rightDuration,
    onLeftDurationChange,
    onRightDurationChange,
}: {
    leftDuration: number
    rightDuration: number
    onLeftDurationChange: (value: number) => void
    onRightDurationChange: (value: number) => void
}) {
    const updateLeftDuration = (value: number) => {
        if (value < 0) {
            value = 0
        }

        onLeftDurationChange(value)
    }
    const updateRightDuration = (value: number) => {
        if (value < 0) {
            value = 0
        }

        onRightDurationChange(value)
    }

    return (
        <Flex className="flex-shrink" direction="column" gap="4">
            <Heading size="6">Left:</Heading>
            <NumberInput onChange={updateLeftDuration} value={leftDuration} />
            <Heading size="6">Right:</Heading>
            <NumberInput onChange={updateRightDuration} value={rightDuration} />
        </Flex>
    )
}
