import { Feeding } from '../../model/feeding'
import { FeedingEntryItem } from '../chart/feedingchart/feedingentry'

export function ConfirmScreen({ feeding }: { feeding: Feeding }) {
    return (
        <FeedingEntryItem
            feedingEntry={{ _id: '', ...feeding }}
            highlightDay={true}
        ></FeedingEntryItem>
    )
}
