import {
    Feeding,
    FeedingType,
} from '@feedingchart/app/feedingchart/model/feeding'
import { FormField, FormControl, FormLabel } from '@radix-ui/react-form'
import { Table, Select } from '@radix-ui/themes'

export default function LogFeedingRow({
    feeding: feedingEntry,
    onChange,
}: {
    feeding: Feeding
    onChange: (editedFeeding: Feeding) => void
}) {
    return (
        <Table.Row align="center">
            <Table.Cell colSpan={2}>
                <FormField name="time">
                    <FormControl
                        type="datetime-local"
                        defaultValue={feedingEntry.time
                            .toISOString()
                            .slice(0, 16)}
                        onChange={(event) => {
                            onChange({
                                ...feedingEntry,
                                time: new Date(event.target.value),
                            })
                        }}
                    ></FormControl>
                </FormField>
            </Table.Cell>
            <Table.Cell>
                <FormField name="durationL">
                    {feedingEntry.type === FeedingType.Breast ? (
                        <FormControl
                            className="w-12"
                            type="number"
                            step="1"
                            min="0"
                            defaultValue={feedingEntry.durationL}
                            onChange={(event) => {
                                onChange({
                                    ...feedingEntry,
                                    durationL: parseInt(event.target.value),
                                })
                            }}
                        ></FormControl>
                    ) : (
                        <FormLabel className="opacity-30">--</FormLabel>
                    )}
                </FormField>
            </Table.Cell>
            <Table.Cell>
                <FormField name="durationR">
                    {feedingEntry.type === FeedingType.Breast ? (
                        <FormControl
                            className="w-12"
                            type="number"
                            step="1"
                            min="0"
                            defaultValue={feedingEntry.durationR}
                            onChange={(event) => {
                                onChange({
                                    ...feedingEntry,
                                    durationR: parseInt(event.target.value),
                                })
                            }}
                        ></FormControl>
                    ) : (
                        <FormLabel className="opacity-30">--</FormLabel>
                    )}
                </FormField>
            </Table.Cell>
            <Table.Cell>
                <FormField name="type" className="w-32">
                    <FormControl asChild>
                        <Select.Root
                            defaultValue={feedingEntry.type}
                            onValueChange={(value) =>
                                onChange({
                                    ...feedingEntry,
                                    type: value as FeedingType,
                                })
                            }
                        >
                            <Select.Trigger placeholder="Type" />
                            <Select.Content>
                                <Select.Item value={FeedingType.Breast}>
                                    Breast
                                </Select.Item>
                                <Select.Item value={FeedingType.Donor}>
                                    Donor
                                </Select.Item>
                                <Select.Item value={FeedingType.Formula}>
                                    Formula
                                </Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </FormControl>
                </FormField>
            </Table.Cell>
            <Table.Cell>
                <FormField name="amountMl" className="flex gap-2">
                    {feedingEntry.type !== FeedingType.Breast && (
                        <>
                            <FormControl
                                type="number"
                                step="1"
                                min="0"
                                defaultValue={feedingEntry.amountMl}
                                className="w-12"
                            ></FormControl>
                            <FormLabel>ml</FormLabel>
                        </>
                    )}
                </FormField>
            </Table.Cell>
        </Table.Row>
    )
}
