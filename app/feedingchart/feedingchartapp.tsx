import { Flex, Tabs } from '@radix-ui/themes'
import FeedingChart from './components/chart/feedingchart/feedingchart'

export default function FeedingChartApp() {
    return (
        <Tabs.Root className="flex flex-col h-dvh" defaultValue="feedings">
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
                    >
                        Feedings
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        className="TabsTrigger"
                        style={{ flexGrow: '1', height: '64px' }}
                        value="diapers"
                    >
                        Diapers
                    </Tabs.Trigger>
                </Flex>
            </Tabs.List>
            <Tabs.Content
                className="TabsContent flex flex-col flex-grow min-h-0"
                value="feedings"
            >
                <FeedingChart></FeedingChart>
            </Tabs.Content>
            <Tabs.Content
                className="TabsContent flex flex-col flex-grow p-4"
                value="diapers"
            >
                Nothing here yet :)
            </Tabs.Content>
        </Tabs.Root>
    )
}
