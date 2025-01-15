import { Button, Card, Flex } from '@radix-ui/themes'

export function DateScreen({
    date,
    time,
    onDateChange,
    onTimeChange,
}: {
    date: string
    time: string
    onDateChange: (date: string) => void
    onTimeChange: (time: string) => void
}) {
    return (
        <Flex direction="column" justify="center" gap="4">
            <Button
                size="4"
                color="orange"
                variant="surface"
                onClick={() => {
                    const resetDateWithSlashes = new Date().toLocaleDateString(
                        'en-US',
                        {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }
                    )

                    const [month, day, year] = resetDateWithSlashes.split('/')

                    const resetDateString = `${year}-${month}-${day}`

                    onDateChange(resetDateString)
                    onTimeChange(
                        new Date().toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                    )
                }}
            >
                Set to now
            </Button>
            <Flex direction="row" gap="4">
                <Card className="flex-grow">
                    <input
                        className="h-full text-center bg-transparent w-full"
                        type="date"
                        step="1"
                        value={date}
                        onChange={(event) => onDateChange(event.target.value)}
                    />
                </Card>
            </Flex>
            <Flex direction="row" gap="4">
                <Card className="flex-grow">
                    <input
                        className="h-full text-center bg-transparent w-full"
                        type="time"
                        step="60"
                        value={time}
                        onChange={(event) => onTimeChange(event.target.value)}
                    />
                </Card>
            </Flex>
        </Flex>
    )
}
