'use client'

import { fromRawFeeding } from '@feedingchart/app/feedingchart/model/feeding'
import { useQuery } from 'convex/react'
import { api } from '@feedingchart/convex/_generated/api'
import { useState } from 'react'
import { FeedingEntryItem } from './feedingentry'
import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

export default function FeedingChart() {
    const feedingEntries =
        useQuery(api.feedings.get, { userId: '1' })?.map(fromRawFeeding) ?? []
    const [selected, setSelected] = useState(undefined as string | undefined)
    const router = useRouter()

    return (
        <Flex direction="column" className="p-4 h-dvh" flexShrink="0" gap="4">
            <div
                className="flex flex-col gap-4 h-full overflow-y-auto no-scrollbar"
                onClick={() => setSelected(undefined)}
            >
                {feedingEntries.map((feedingEntry, i) => (
                    <FeedingEntryItem
                        className="flex-shrink-0 cursor-pointer"
                        tapped={selected == feedingEntry._id}
                        key={feedingEntry._id}
                        feedingEntry={feedingEntry}
                        highlightDay={
                            feedingEntry.time.getDay() !=
                            feedingEntries[i - 1]?.time.getDay()
                        }
                        onClick={(event: MouseEvent) => {
                            event.stopPropagation()
                            if (selected == feedingEntry._id) {
                                setSelected(undefined)
                                return
                            }
                            setSelected(feedingEntry._id)
                        }}
                    ></FeedingEntryItem>
                ))}
            </div>
            <Button color="blue" size="4" onClick={() => router.push('/log')}>
                Log a feeding
            </Button>
        </Flex>
    )
}
