import { Button, Card, Flex } from '@radix-ui/themes'

export function DateScreen({
    date,
    onDateChange,
}: {
    date: Date
    onDateChange: (date: Date) => void
}) {
    return (
        <Flex direction="column" justify="center" gap="4">
            <Button
                size="4"
                color="blue"
                variant="surface"
                onClick={() => onDateChange(new Date())}
            >
                Now
            </Button>
            <Flex direction="row" gap="4">
                <Card className="flex-grow">
                    <input
                        className="h-full text-center bg-transparent w-full"
                        type="date"
                        step="1"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) =>
                            onDateChange(
                                new Date(
                                    new Date(e.target.value).toLocaleDateString(
                                        'en-US'
                                    ) +
                                        ' ' +
                                        date.toLocaleTimeString('en-US')
                                )
                            )
                        }
                    />
                </Card>
            </Flex>
            <Flex direction="row" gap="4">
                <Card className="flex-grow">
                    <input
                        className="h-full text-center bg-transparent w-full"
                        type="time"
                        step="60"
                        value={date.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}
                        onChange={(e) =>
                            onDateChange(
                                new Date(
                                    date.toLocaleDateString('en-US') +
                                        ' ' +
                                        e.target.value
                                )
                            )
                        }
                    />
                </Card>
            </Flex>
        </Flex>
    )
}
