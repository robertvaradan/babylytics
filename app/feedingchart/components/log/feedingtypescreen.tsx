import { Button, Flex } from '@radix-ui/themes'
import { FeedingType } from '../../model/feeding'
import { CheckCircledIcon } from '@radix-ui/react-icons'

export function FeedingTypeScreen({
    selectType,
    currentType,
}: {
    selectType: (type: FeedingType) => void
    currentType: FeedingType
}) {
    return (
        <Flex className="flex-shrink" direction="column" gap="4" height="384px">
            <Button
                color="blue"
                variant="soft"
                size="4"
                style={{ flexGrow: '1' }}
                onClick={() => selectType(FeedingType.Breast)}
            >
                {currentType === FeedingType.Breast && <CheckCircledIcon />}
                Breast
            </Button>
            <Button
                color="green"
                variant="soft"
                size="4"
                style={{ flexGrow: '1' }}
                onClick={() => selectType(FeedingType.Donor)}
            >
                {currentType === FeedingType.Donor && <CheckCircledIcon />}
                Donor
            </Button>
            <Button
                color="orange"
                variant="soft"
                size="4"
                style={{ flexGrow: '1' }}
                onClick={() => selectType(FeedingType.Formula)}
            >
                {currentType === FeedingType.Formula && <CheckCircledIcon />}
                Formula
            </Button>
        </Flex>
    )
}
