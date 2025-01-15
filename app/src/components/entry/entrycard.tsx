import { Button, Card, Flex } from '@radix-ui/themes'
import { useState } from 'react'

export function EntryCard({
    onEdit,
    onDelete,
    children,
}: {
    onEdit: () => void
    onDelete: () => void
    children: React.ReactNode
}) {
    const [tapped, setTapped] = useState(false)

    return (
        <Card
            size="3"
            className="rounded-none flex-shrink-0 cursor-pointer"
            onClick={(event) => {
                event.stopPropagation()
                setTapped(!tapped)
            }}
        >
            <Flex justify="between" gap="4" direction="column">
                <Flex
                    gap="4"
                    flexShrink="0"
                    justify="between"
                    flexGrow="1"
                    align="center"
                >
                    {children}
                </Flex>
            </Flex>
            <Flex
                className="overflow-hidden transition-all"
                style={{
                    width: tapped ? '100%' : 0,
                    height: tapped ? 'unset' : 0,
                    marginTop: tapped ? '8px' : 0,
                }}
                flexShrink="0"
                gap="4"
                justify="center"
            >
                <Button
                    color="orange"
                    variant="soft"
                    size="3"
                    style={{ flexGrow: '1' }}
                    onClick={(event) => {
                        event.stopPropagation()
                        onEdit()
                    }}
                >
                    Edit
                </Button>
                <Button
                    color="red"
                    variant="soft"
                    size="3"
                    style={{ flexGrow: '1' }}
                    onClick={(event) => {
                        event.stopPropagation()
                        onDelete()
                    }}
                >
                    Delete
                </Button>
            </Flex>
        </Card>
    )
}
