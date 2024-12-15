import { Theme } from '@radix-ui/themes'
import LogFeedingView from '../feedingchart/components/log/logfeedingview'

export default function Log() {
    return (
        <Theme appearance="dark">
            <LogFeedingView></LogFeedingView>
        </Theme>
    )
}
