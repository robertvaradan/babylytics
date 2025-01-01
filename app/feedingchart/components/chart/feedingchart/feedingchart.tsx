'use client'

import { fromRawFeeding } from '@feedingchart/app/feedingchart/model/feeding'
import { useQuery } from 'convex/react'
import { api } from '@feedingchart/convex/_generated/api'
import { FeedingEntryItem } from './feedingentry'
import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

export default function FeedingChart() {
    const feedingEntries =
        useQuery(api.feedings.get, { userId: '1' })?.map(fromRawFeeding) ?? []
    const router = useRouter()

    return (
        <Flex direction="column" className="p-4 min-h-0" flexGrow="1" gap="4">
            <div className="flex flex-col gap-4 h-full overflow-y-auto no-scrollbar">
                {feedingEntries.map((feedingEntry, i) => (
                    <FeedingEntryItem
                        key={feedingEntry._id}
                        feedingEntry={feedingEntry}
                        highlightDay={
                            feedingEntry.time.getDay() !=
                            feedingEntries[i - 1]?.time.getDay()
                        }
                    ></FeedingEntryItem>
                ))}
            </div>
            <Button
                color="blue"
                size="4"
                onClick={() => router.push('/baby/feeding/log')}
            >
                Log a feeding
            </Button>
        </Flex>
    )
}
