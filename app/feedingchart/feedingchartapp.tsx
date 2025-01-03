'use client'
import { Flex, Tabs } from '@radix-ui/themes'
import FeedingChart from './components/chart/feedingchart/feedingchart'
import { DiaperChart } from './components/chart/diaperchart/diaperchart'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function FeedingChartApp() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedingChartAppContent></FeedingChartAppContent>
        </Suspense>
    )
}

function FeedingChartAppContent() {
    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') ?? 'feedings'

    return (
        <Tabs.Root className="flex flex-col flex-1" defaultValue={tab}>
            <Tabs.List
                className="TabsList flex-shrink-0"
                aria-label="Choose chart type"
                size="2"
            >
                <Flex justify="center" width="100%">
                    <Tabs.Trigger
                        className="TabsTrigger"
                        style={{ flexGrow: '1', height: '64px' }}
                        value="feedings"
                        data-accent-color="blue"
                    >
                        Feedings
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className="TabsTrigger"
                        style={{ flexGrow: '1', height: '64px' }}
                        value="diapers"
                        data-accent-color="purple"
                    >
                        Diapers
                    </Tabs.Trigger>
                </Flex>
            </Tabs.List>
            <Tabs.Content
                className="TabsContent flex flex-col min-h-0 flex-1"
                value="feedings"
            >
                <FeedingChart></FeedingChart>
            </Tabs.Content>
            <Tabs.Content
                className="TabsContent flex flex-col min-h-0 flex-1"
                value="diapers"
            >
                <DiaperChart></DiaperChart>
            </Tabs.Content>
        </Tabs.Root>
    )
}
