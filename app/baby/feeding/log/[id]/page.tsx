'use client'
import LogFeedingView from '@feedingchart/app/feedingchart/components/log/logfeedingview'
import { fromRawFeeding } from '@feedingchart/app/feedingchart/model/feeding'
import { api } from '@feedingchart/convex/_generated/api'
import { Id } from '@feedingchart/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'

export default function EditFeeding() {
    const { id } = useParams<{ id: string }>()

    const feedingToEdit = useQuery(api.feedings.getById, {
        id: id as Id<'feedings'>,
    })

    return (
        <>
            {feedingToEdit && (
                <LogFeedingView
                    editFeeding={fromRawFeeding(feedingToEdit)}
                ></LogFeedingView>
            )}
        </>
    )
}
