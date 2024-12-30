'use client'
import {
    FeedingEntry,
    FeedingType,
} from '@feedingchart/app/feedingchart/model/feeding'
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
import { Id } from '@feedingchart/convex/_generated/dataModel'
import { purple } from '@radix-ui/colors'

enum Screen {
    Date = 0,
    Type = 1,
    DurationOrAmount = 2,
    Confirm = 3,
}

export default function LogFeedingView({
    editFeeding,
}: {
    editFeeding?: FeedingEntry
}) {
    const router = useRouter()

    const [screen, setScreen] = useState(Screen.Date)

    /* Feeding data */
    const date = editFeeding ? new Date(editFeeding.time) : new Date()

    const initialDateWithSlashes = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })

    const [month, day, year] = initialDateWithSlashes.split('/')

    const initialDateString = `${year}-${month}-${day}`

    const [dateString, setDateString] = useState(initialDateString)

    const [timeString, setTimeString] = useState(
        date.toLocaleTimeString('en-US', { hour12: false })
    )

    console.log(dateString, timeString)

    const [type, selectType] = useState(
        editFeeding != null
            ? (editFeeding.type as FeedingType)
            : FeedingType.Breast
    )

    const [leftDuration, setLeftDuration] = useState(
        editFeeding?.durationL ?? 0
    )

    const [rightDuration, setRightDuration] = useState(
        editFeeding?.durationR ?? 0
    )

    const insertFeeding = useMutation(api.feedings.insert)
    const updateFeeding = useMutation(api.feedings.update)

    const feeding = {
        userId: '1',
        time: new Date(`${dateString}T${timeString}`),
        durationL: type !== FeedingType.Breast ? 0 : leftDuration,
        durationR: type !== FeedingType.Breast ? 0 : rightDuration,
        type,
        amountMl: type === FeedingType.Breast ? 0 : 0,
    }

    const background = `linear-gradient(to right, ${purple.purple12}, ${purple.purple9})`

    return (
        <Flex direction="column" className="h-dvh">
            {editFeeding && (
                <Box className="p-4" style={{ background }}>
                    Editing {editFeeding.type} feeding from&nbsp;
                    {new Date(editFeeding.time).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                    &nbsp;at&nbsp;
                    {new Date(editFeeding.time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </Box>
            )}
            <Flex
                direction="column"
                gap="4"
                className="flex-grow p-4"
                minHeight="0"
            >
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
                            router.push('/baby')
                        }}
                    >
                        <Cross1Icon></Cross1Icon>
                    </IconButton>
                </Flex>
                {screen === Screen.Date && (
                    <DateScreen
                        date={dateString}
                        time={timeString}
                        onDateChange={setDateString}
                        onTimeChange={setTimeString}
                    ></DateScreen>
                )}
                {screen === Screen.Type && (
                    <FeedingTypeScreen
                        selectType={selectType}
                        currentType={type}
                    />
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

                            if (editFeeding != null) {
                                updateFeeding({
                                    id: editFeeding._id as Id<'feedings'>,
                                    feeding: {
                                        ...feeding,
                                        time: feeding.time.getTime(),
                                    },
                                })
                            } else {
                                insertFeeding({
                                    feeding: {
                                        ...feeding,
                                        time: feeding.time.getTime(),
                                    },
                                })
                            }

                            router.push('/baby')
                        }}
                    >
                        {screen < Screen.Confirm ? 'Next' : 'Confirm and log'}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
