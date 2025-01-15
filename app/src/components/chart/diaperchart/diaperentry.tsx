import { Diaper, DiaperType } from '@babylytics/app/src/model/diaper'
import { api } from '@babylytics/convex/_generated/api'
import { Text, Badge, Box, Flex } from '@radix-ui/themes'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { EntryCard } from '../../entry/entrycard'
import { Id } from '@babylytics/convex/_generated/dataModel'

export function DiaperEntryItem({
    diaper: diaper,
    highlightDay,
}: {
    diaper: Diaper
    highlightDay?: boolean
    tapped?: boolean
    [key: string]: unknown
}) {
    const removeDiaper = useMutation(api.diapers.remove)
    const router = useRouter()

    return (
        <EntryCard
            onDelete={() => {
                if (
                    confirm(
                        `Are you sure you want to delete this diaper change entry from ${new Date(
                            diaper.time
                        ).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })} at ${new Date(diaper.time).toLocaleTimeString(
                            'en-US',
                            {
                                hour: 'numeric',
                                minute: 'numeric',
                            }
                        )}?`
                    )
                ) {
                    removeDiaper({ id: diaper._id as Id<'diapers'> })
                }
            }}
            onEdit={() => router.push(`/baby/diaper/log/${diaper._id}`)}
        >
            <Box>
                <Text
                    className={!highlightDay ? 'opacity-30' : ''}
                    as="div"
                    size="2"
                    weight="bold"
                >
                    {diaper.time.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </Text>
                <Text as="div" size="2">
                    {diaper.time.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </Text>
            </Box>
            <Flex gap="4">
                {diaper.types
                    .sort((a, b) => a.localeCompare(b, 'en-US'))
                    .map((type, i) => (
                        <Badge
                            key={i}
                            color={
                                type === DiaperType.Wet
                                    ? 'yellow'
                                    : type === DiaperType.Stool
                                      ? 'purple'
                                      : 'green'
                            }
                        >
                            {type === DiaperType.Wet
                                ? 'Wet'
                                : type === DiaperType.Stool
                                  ? 'Stool'
                                  : 'Dry'}
                        </Badge>
                    ))}
            </Flex>
        </EntryCard>
    )
}
