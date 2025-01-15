import { FeedingEntry, FeedingType } from '@babylytics/app/src/model/feeding'
import { api } from '@babylytics/convex/_generated/api'
import { Id } from '@babylytics/convex/_generated/dataModel'
import { Flex, Text, Badge, Box } from '@radix-ui/themes'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { EntryCard } from '../../entry/entrycard'

export function FeedingEntryItem({
    feedingEntry,
    highlightDay,
}: {
    feedingEntry: FeedingEntry
    highlightDay?: boolean
}) {
    const removeFeeding = useMutation(api.feedings.remove)
    const router = useRouter()

    return (
        <EntryCard
            onDelete={() => {
                if (
                    confirm(
                        `Are you sure you want to delete this feeding entry from ${new Date(
                            feedingEntry.time
                        ).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })} at ${new Date(feedingEntry.time).toLocaleTimeString(
                            'en-US',
                            {
                                hour: 'numeric',
                                minute: 'numeric',
                            }
                        )}?`
                    )
                ) {
                    removeFeeding({ id: feedingEntry._id as Id<'feedings'> })
                }
            }}
            onEdit={() => router.push(`/feeding/log/${feedingEntry._id}`)}
        >
            <Flex gap="4" align="center">
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
            </Flex>
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
            <Box>
                {feedingEntry.type != FeedingType.Breast ? (
                    <Flex gap="4">
                        <Text size="2">Amount: </Text>
                        <Text size="2" weight="bold">
                            {feedingEntry.amountMl}ml
                        </Text>
                    </Flex>
                ) : (
                    <>
                        <Flex gap="4">
                            <Text className="w-12" size="2">
                                Left:
                            </Text>

                            <Text size="2" weight="bold">
                                {feedingEntry.durationL} min
                            </Text>
                        </Flex>
                        <Flex gap="4">
                            <Text className="w-12" size="2">
                                Right:
                            </Text>

                            <Text size="2" weight="bold">
                                {feedingEntry.durationR} min
                            </Text>
                        </Flex>
                    </>
                )}
            </Box>
        </EntryCard>
    )
}
