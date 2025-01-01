'use client'
import { api } from '@feedingchart/convex/_generated/api'
import { Flex, Button } from '@radix-ui/themes'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { fromRawDiaperEntry } from '@feedingchart/app/feedingchart/model/diaper'
import { DiaperEntryItem } from './diaperentry'
import { ChartCounter } from '../common/chartcounter'
import { createRef } from 'react'

export function DiaperChart() {
    const diaperEntries =
        useQuery(api.diapers.list, { userId: '1' })?.map(fromRawDiaperEntry) ??
        []
    const router = useRouter()

    const scrollBody = createRef<HTMLDivElement>()

    return (
        <Flex direction="column" className="p-4 min-h-0" flexGrow="1" gap="4">
            {diaperEntries.length > 0 && (
                <ChartCounter
                    title="Last diaper change logged"
                    startTime={diaperEntries[0].time}
                    color="purple"
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
                {diaperEntries.map((diaperEntry, i) => (
                    <DiaperEntryItem
                        key={diaperEntry._id}
                        diaper={diaperEntry}
                        highlightDay={
                            diaperEntry.time.getDay() !=
                            diaperEntries[i - 1]?.time.getDay()
                        }
                    ></DiaperEntryItem>
                ))}
            </div>
            <Button
                color="purple"
                size="4"
                onClick={() => router.push('/baby/diaper/log')}
            >
                Log a diaper change
            </Button>
        </Flex>
    )
}
