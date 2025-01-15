'use client'
import LogFeedingView from '@babylytics/app/src/components/log/logfeedingview'
import { fromRawFeeding } from '@babylytics/app/src/model/feeding'
import { api } from '@babylytics/convex/_generated/api'
import { Id } from '@babylytics/convex/_generated/dataModel'
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
