'use client'
import LogDiaperView from '@babylytics/app/src/components/log/logdiaperview'
import { fromRawDiaperEntry } from '@babylytics/app/src/model/diaper'
import { api } from '@babylytics/convex/_generated/api'
import { Id } from '@babylytics/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'

export default function EditDiaper() {
    const { id } = useParams<{ id: string }>()

    const diaperToEdit = useQuery(api.diapers.getById, {
        id: id as Id<'diapers'>,
    })

    return (
        <>
            {diaperToEdit && (
                <LogDiaperView
                    editDiaper={fromRawDiaperEntry(diaperToEdit)}
                ></LogDiaperView>
            )}
        </>
    )
}
