import { Button, Flex } from '@radix-ui/themes'
import { DiaperType } from '../../model/diaper'
import { CheckCircledIcon } from '@radix-ui/react-icons'

type ButtonConfig = {
    color: 'yellow' | 'purple' | 'green'
    type: DiaperType
    label: string
}

export function DiaperTypesScreen({
    selectTypes,
    currentTypes,
}: {
    selectTypes: (types: DiaperType[]) => void
    currentTypes: DiaperType[]
}) {
    const buttonConfigs: ButtonConfig[] = [
        { color: 'yellow', type: DiaperType.Wet, label: 'Wet' },
        { color: 'purple', type: DiaperType.Stool, label: 'Stool' },
        { color: 'green', type: DiaperType.Dry, label: 'Dry' },
    ]
    return (
        <Flex
            className="flex-shrink"
            direction="column"
            gap="4"
            height="100%"
            maxHeight="384px"
        >
            {buttonConfigs.map((buttonConfig, i) => (
                <Button
                    key={i}
                    color={buttonConfig.color}
                    variant="soft"
                    size="4"
                    style={{ flexGrow: '1' }}
                    onClick={() => {
                        if (currentTypes.includes(buttonConfig.type)) {
                            selectTypes([
                                ...new Set<DiaperType>(currentTypes).difference(
                                    new Set([buttonConfig.type])
                                ),
                            ])
                        } else {
                            selectTypes([
                                ...new Set<DiaperType>(currentTypes).union(
                                    new Set([buttonConfig.type])
                                ),
                            ])
                        }
                    }}
                >
                    {currentTypes.includes(buttonConfig.type) && (
                        <CheckCircledIcon />
                    )}
                    {buttonConfig.label}
                </Button>
            ))}
        </Flex>
    )
}
