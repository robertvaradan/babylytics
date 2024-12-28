import { Theme } from '@radix-ui/themes'
import FeedingChartApp from '../feedingchart/feedingchartapp'

export default function Home() {
    return (
        <Theme appearance="dark">
            <FeedingChartApp />
        </Theme>
    )
}
