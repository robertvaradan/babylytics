'use client'

import { fromRawFeeding } from '@feedingchart/app/feedingchart/model/feeding'
import { useQuery } from 'convex/react'
import { api } from '@feedingchart/convex/_generated/api'
import { FeedingEntryItem } from './feedingentry'
import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { ChartCounter } from '../common/chartcounter'
import { createRef } from 'react'

export default function FeedingChart() {
    const feedingEntries =
        useQuery(api.feedings.get, { userId: '1' })?.map(fromRawFeeding) ?? []
    const router = useRouter()

    const scrollBody = createRef<HTMLDivElement>()

    return (
        <Flex direction="column" className="p-4 min-h-0" flexGrow="1" gap="4">
            {feedingEntries.length > 0 && (
                <ChartCounter
                    title="Last feeding logged"
                    startTime={feedingEntries[0].time}
                    color="blue"
                    onClick={() => {
                        if (scrollBody.current) {
                            scrollBody.current.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            })
                        }
                    }}
                ></ChartCounter>
            )}
            <div
                className="flex flex-col gap-4 h-full overflow-y-auto no-scrollbar"
                ref={scrollBody}
            >
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
