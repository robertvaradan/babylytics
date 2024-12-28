import LogFeedingView from '@feedingchart/app/feedingchart/components/log/logfeedingview'
import { Theme } from '@radix-ui/themes'

export default function Log() {
    return (
        <Theme appearance="dark">
            <LogFeedingView></LogFeedingView>
        </Theme>
    )
}
