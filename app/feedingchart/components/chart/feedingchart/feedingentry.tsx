import {
    FeedingEntry,
    FeedingType,
} from '@feedingchart/app/feedingchart/model/feeding'
import { api } from '@feedingchart/convex/_generated/api'
import { Id } from '@feedingchart/convex/_generated/dataModel'
import { Card, Flex, Text, Badge, Box, Button } from '@radix-ui/themes'
import { useMutation } from 'convex/react'

export function FeedingEntryItem({
    feedingEntry,
    highlightDay,
    tapped,
    ...rootDOMAttributes
}: {
    feedingEntry: FeedingEntry
    highlightDay?: boolean
    tapped?: boolean
    [key: string]: unknown
}) {
    const removeFeeding = useMutation(api.feedings.remove)

    return (
        <Card size={'3'} className="rounded-none" {...rootDOMAttributes}>
            <Flex justify="between" gap="4" wrap="wrap">
                <Flex gap="4" flexShrink="0" justify="between" flexGrow="1">
                    <Flex gap="4" align="center" flexGrow="1">
                        <Box>
                            <Text
                                className={!highlightDay ? 'opacity-30' : ''}
                                as="div"
                                size="2"
                                weight="bold"
                            >
                                {feedingEntry.time.toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </Text>
                            <Text as="div" size="2">
                                {feedingEntry.time.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </Text>
                        </Box>
                        <Badge
                            color={
                                feedingEntry.type === FeedingType.Breast
                                    ? 'blue'
                                    : feedingEntry.type === FeedingType.Donor
                                    ? 'green'
                                    : 'orange'
                            }
                        >
                            {feedingEntry.type === FeedingType.Breast
                                ? 'Breast'
                                : feedingEntry.type === FeedingType.Formula
                                ? 'Formula'
                                : 'Donor'}
                        </Badge>
                        {feedingEntry.type != FeedingType.Breast && (
                            <Text>{feedingEntry.amountMl}ml</Text>
                        )}
                    </Flex>
                    <Box>
                        <Flex gap="4">
                            <Text className="w-12" size="2">
                                Left:
                            </Text>

                            <Text size="2" weight="bold">
                                {feedingEntry.durationL}min
                            </Text>
                        </Flex>
                        <Flex gap="4">
                            <Text className="w-12" size="2">
                                Right:
                            </Text>

                            <Text size="2" weight="bold">
                                {feedingEntry.durationR}min
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
                <Flex
                    className="overflow-hidden transition-all"
                    style={{
                        width: !tapped ? 0 : '156px',
                        height: tapped ? 'unset' : 0,
                    }}
                    flexShrink="0"
                    gap="4"
                    justify="center"
                >
                    <Button color="orange" variant="classic" size="3">
                        Edit
                    </Button>
                    <Button
                        color="red"
                        variant="classic"
                        size="3"
                        onClick={() =>
                            removeFeeding({
                                id: feedingEntry._id as Id<'feedings'>,
                            })
                        }
                    >
                        Delete
                    </Button>
                </Flex>
            </Flex>
        </Card>
    )
}
