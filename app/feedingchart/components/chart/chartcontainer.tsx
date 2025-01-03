import { Flex } from '@radix-ui/themes'
import { RadixColor } from '../../util/colors'

export function ChartContainer({
    colorScheme,
    children,
}: {
    colorScheme: RadixColor
    children: React.ReactNode
}) {
    return (
        <Flex
            direction="column"
            className="p-4 min-h-0"
            flexGrow="1"
            gap="4"
        ></Flex>
    )
}
