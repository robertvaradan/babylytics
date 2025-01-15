'use client'
import { api } from '@babylytics/convex/_generated/api'
import { Flex, Button } from '@radix-ui/themes'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { DiaperEntryItem } from './diaperentry'
import { ChartCounter } from '../common/chartcounter'
import { createRef } from 'react'
import { fromRawDiaperEntry } from '@babylytics/app/src/model/diaper'
import { useUser } from '@clerk/nextjs'

export function DiaperChart() {
    const user = useUser()
    const diaperEntries =
        useQuery(api.diapers.list, { userId: user.user?.id ?? '' })?.map(
            fromRawDiaperEntry
        ) ?? []
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
                className="flex flex-col gap-4 overflow-y-auto no-scrollbar flex-grow"
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
                style={{ marginBottom: '16px' }}
                onClick={() => router.push('/baby/diaper/log')}
            >
                Log a diaper change
            </Button>
        </Flex>
    )
}
