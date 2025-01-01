'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, IconButton } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ConfirmScreen } from './confirmscreen'
import { DateScreen } from './datescreen'
import { useMutation } from 'convex/react'
import { api } from '@feedingchart/convex/_generated/api'
import { Id } from '@feedingchart/convex/_generated/dataModel'
import { purple } from '@radix-ui/colors'
import { Diaper, DiaperType } from '../../model/diaper'
import { DiaperTypesScreen } from './diapertypesscreen'

enum Screen {
    Date = 0,
    Type = 1,
    Confirm = 2,
}

export default function LogDiaperView({ editDiaper }: { editDiaper?: Diaper }) {
    const router = useRouter()

    const [screen, setScreen] = useState(Screen.Date)

    /* Diaper data */
    const date = editDiaper ? new Date(editDiaper.time) : new Date()

    const initialDateWithSlashes = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })

    const [month, day, year] = initialDateWithSlashes.split('/')

    const initialDateString = `${year}-${month}-${day}`

    const [dateString, setDateString] = useState(initialDateString)

    const [timeString, setTimeString] = useState(
        date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        })
    )

    const [types, selectTypes] = useState(
        editDiaper != null
            ? (editDiaper.types as DiaperType[])
            : [DiaperType.Wet]
    )

    const insertDiaper = useMutation(api.diapers.insert)
    const updateDiaper = useMutation(api.diapers.update)

    const diaper = {
        _id: '',
        userId: '1',
        time: new Date(`${dateString}T${timeString}`),
        types,
    }

    const background = `linear-gradient(to right, ${purple.purple12}, ${purple.purple9})`

    return (
        <Flex direction="column" className="h-dvh">
            {editDiaper && (
                <Box className="p-4" style={{ background }}>
                    Editing diaper from&nbsp;
                    {new Date(editDiaper.time).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                    &nbsp;at&nbsp;
                    {new Date(editDiaper.time).toLocaleTimeString('en-US', {
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
                            ? 'When was the diaper change?'
                            : screen === Screen.Type
                            ? 'What type of diaper was it?'
                            : 'Does this look right?'}
                    </Heading>
                    <IconButton
                        color="red"
                        className="bor"
                        variant="surface"
                        onClick={() => {
                            router.push('/baby?tab=diapers')
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
                    <DiaperTypesScreen
                        selectTypes={(newTypes) => {
                            if (
                                newTypes.includes(DiaperType.Dry) &&
                                types.includes(DiaperType.Dry)
                            ) {
                                selectTypes(
                                    newTypes.filter(
                                        (type) => type !== DiaperType.Dry
                                    )
                                )
                            } else if (
                                newTypes.includes(DiaperType.Dry) &&
                                !types.includes(DiaperType.Dry)
                            ) {
                                selectTypes([DiaperType.Dry])
                            } else {
                                selectTypes(newTypes)
                            }
                        }}
                        currentTypes={types}
                    />
                )}
                {screen === Screen.Confirm && (
                    <ConfirmScreen diaper={diaper}></ConfirmScreen>
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
                        color={screen < Screen.Confirm ? 'purple' : 'green'}
                        onClick={() => {
                            if (screen < Screen.Confirm) {
                                setScreen(screen + 1)
                                return
                            }

                            if (editDiaper != null) {
                                const { _id: _, ...diaperEntry } = diaper
                                updateDiaper({
                                    id: editDiaper._id as Id<'diapers'>,
                                    diaper: {
                                        ...diaperEntry,
                                        time: diaper.time.getTime(),
                                    },
                                })
                            } else {
                                const { _id: _, ...diaperEntry } = diaper
                                insertDiaper({
                                    diaper: {
                                        ...diaperEntry,
                                        time: diaper.time.getTime(),
                                    },
                                })
                            }

                            router.push('/baby?tab=diapers')
                        }}
                    >
                        {screen < Screen.Confirm ? 'Next' : 'Confirm and log'}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
