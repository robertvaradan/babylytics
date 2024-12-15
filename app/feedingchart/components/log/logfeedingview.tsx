'use client'
import { FeedingType } from '@feedingchart/app/feedingchart/model/feeding'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, IconButton } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FeedingTypeScreen } from './feedingtypescreen'
import { FeedingDurationScreen } from './feedingdurationscreen'
import { ConfirmScreen } from './confirmscreen'
import { DateScreen } from './datescreen'
import { useMutation } from 'convex/react'
import { api } from '@feedingchart/convex/_generated/api'

enum Screen {
    Date = 0,
    Type = 1,
    DurationOrAmount = 2,
    Confirm = 3,
}

export default function LogFeedingView() {
    const [screen, setScreen] = useState(Screen.Date)
    /* Feeding data */
    const [date, setDate] = useState(new Date())
    const [type, selectType] = useState(FeedingType.Breast)
    const [leftDuration, setLeftDuration] = useState(0)
    const [rightDuration, setRightDuration] = useState(0)

    const router = useRouter()
    const insertFeeding = useMutation(api.feedings.insert)
    const feeding = {
        userId: '1',
        time: date,
        durationL: type !== FeedingType.Breast ? 0 : leftDuration,
        durationR: type !== FeedingType.Breast ? 0 : rightDuration,
        type,
        amountMl: type === FeedingType.Breast ? 0 : 0,
    }

    return (
        <Flex direction="column" className="h-dvh p-4" gap="4">
            <Flex
                className="flex-shrink"
                direction="row"
                justify="between"
                align="center"
            >
                <Heading size="8">
                    {screen === Screen.Date
                        ? 'When was the feeding?'
                        : screen === Screen.Type
                        ? 'What type of feeding was it?'
                        : screen === Screen.DurationOrAmount
                        ? type === FeedingType.Breast
                            ? 'How long was it on each side?'
                            : 'How much was it?'
                        : 'Does this look right?'}
                </Heading>
                <IconButton
                    color="red"
                    className="bor"
                    variant="surface"
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    <Cross1Icon></Cross1Icon>
                </IconButton>
            </Flex>
            {screen === Screen.Date && (
                <DateScreen date={date} onDateChange={setDate}></DateScreen>
            )}
            {screen === Screen.Type && (
                <FeedingTypeScreen selectType={selectType} currentType={type} />
            )}
            {screen === Screen.DurationOrAmount &&
            type === FeedingType.Breast ? (
                <FeedingDurationScreen
                    leftDuration={leftDuration}
                    rightDuration={rightDuration}
                    onLeftDurationChange={setLeftDuration}
                    onRightDurationChange={setRightDuration}
                ></FeedingDurationScreen>
            ) : (
                <></>
            )}
            {screen === Screen.Confirm && (
                <ConfirmScreen feeding={feeding}></ConfirmScreen>
            )}
            <Box className="flex-grow"></Box>
            <Flex direction="column" className="w-full" gap="4">
                {screen !== Screen.Date && (
                    <Button
                        size="4"
                        color="orange"
                        onClick={() => {
                            setScreen(screen - 1)
                        }}
                    >
                        Back
                    </Button>
                )}
                <Button
                    size="4"
                    color={screen < Screen.Confirm ? 'blue' : 'green'}
                    onClick={() => {
                        if (screen < 3) {
                            setScreen(screen + 1)
                            return
                        }

                        insertFeeding({
                            feeding: {
                                ...feeding,
                                time: feeding.time.getTime(),
                            },
                        })

                        router.push('/')
                    }}
                >
                    {screen < Screen.Confirm ? 'Next' : 'Confirm and log'}
                </Button>
            </Flex>
        </Flex>
    )
}
