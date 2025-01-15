import { Diaper } from '../../model/diaper'
import { Feeding } from '../../model/feeding'
import { DiaperEntryItem } from '../chart/diaperchart/diaperentry'
import { FeedingEntryItem } from '../chart/feedingchart/feedingentry'

export function ConfirmScreen({
    feeding,
    diaper,
}: {
    feeding?: Feeding
    diaper?: Diaper
}) {
    return (
        <>
            {feeding && (
                <FeedingEntryItem
                    feedingEntry={{ _id: '', ...feeding }}
                    highlightDay={true}
                ></FeedingEntryItem>
            )}
            {diaper && (
                <DiaperEntryItem
                    diaper={diaper}
                    highlightDay={true}
                ></DiaperEntryItem>
            )}
        </>
    )
}
