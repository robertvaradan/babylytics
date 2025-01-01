import { RadixColor } from '@feedingchart/app/feedingchart/util/colors'
import { ClockIcon } from '@radix-ui/react-icons'
import { Button, Callout } from '@radix-ui/themes'
import moment from 'moment'
import { useEffect, useState } from 'react'

export function ChartCounter({
    title,
    startTime,
    color,
    onClick,
}: {
    title: string
    startTime: Date
    color: RadixColor
    onClick: () => void
}) {
    const getTimeAgo = () => {
        const hoursDiff = moment(new Date()).diff(startTime, 'hours')
        const minutesDiff = moment(new Date()).diff(startTime, 'minutes')

        if (hoursDiff == 0) {
            return `${minutesDiff} minute${minutesDiff != 1 ? 's' : ''} ago`
        }

        const hoursDiffText = `${hoursDiff} hour${hoursDiff != 1 ? 's' : ''}`

        const minutesDiffWithoutHours = minutesDiff - hoursDiff * 60

        const minutesDiffWithoutHoursText = `${minutesDiffWithoutHours} minute${
            minutesDiffWithoutHours != 1 ? 's' : ''
        } ago`

        return `${hoursDiffText} ${minutesDiffWithoutHoursText}`
    }

    const [timeAgo, setTimeAgo] = useState(getTimeAgo())

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(getTimeAgo())
        }, 1)

        return () => {
            clearInterval(interval)
        }
    })
    return (
        <Callout.Root color={color}>
            <Callout.Icon>
                <ClockIcon />
            </Callout.Icon>
            <Callout.Text>
                <Button onClick={onClick} color={color} variant="ghost">
                    <span className="text-left">
                        {title} {timeAgo}
                    </span>
                </Button>
            </Callout.Text>
        </Callout.Root>
    )
}
