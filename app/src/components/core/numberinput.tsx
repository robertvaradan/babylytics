import { green } from '@radix-ui/colors'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { Card, Flex, Text } from '@radix-ui/themes'

export function NumberInput({
    value,
    onChange,
}: {
    value: number
    onChange: (value: number) => void
}) {
    const green11 = green.green11

    return (
        <Flex gap="4">
            <Flex>
                <button
                    data-accent-color="green"
                    className="rt-BaseButton rt-r-size-4 rt-variant-soft rt-IconButton"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50% 0 0 50%',
                        borderRight: `solid 1px ${green11}`,
                    }}
                    onClick={() => onChange(value - 5)}
                >
                    <MinusIcon width="24" height="18" />
                    <Text size="6">5</Text>
                </button>
                <button
                    data-accent-color="green"
                    className="rt-BaseButton rt-r-size-4 rt-variant-soft rt-IconButton"
                    onClick={() => onChange(value - 1)}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '0 50% 50% 0',
                    }}
                >
                    <MinusIcon width="18" height="18" />
                    <Text size="6">1</Text>
                </button>
            </Flex>
            <Card className="w-full">
                <input
                    className="h-full w-full text-center bg-transparent webkit-spin-button"
                    type="number"
                    pattern="[0-9]"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                />
            </Card>
            <Flex>
                <button
                    data-accent-color="green"
                    className="rt-BaseButton rt-r-size-4 rt-variant-soft rt-IconButton"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50% 0 0 50%',
                        borderRight: `solid 1px ${green11}`,
                    }}
                    onClick={() => onChange(value + 5)}
                >
                    <PlusIcon width="24" height="18" />
                    <Text size="6">5</Text>
                </button>
                <button
                    data-accent-color="green"
                    className="rt-BaseButton rt-r-size-4 rt-variant-soft rt-IconButton"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '0 50% 50% 0',
                    }}
                    onClick={() => onChange(value + 1)}
                >
                    <PlusIcon width="24" height="18" />
                    <Text size="6">1</Text>
                </button>
            </Flex>
        </Flex>
    )
}
