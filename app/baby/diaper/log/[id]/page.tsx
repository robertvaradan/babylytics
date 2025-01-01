'use client'
import LogDiaperView from '@feedingchart/app/feedingchart/components/log/logdiaperview'
import { fromRawDiaperEntry } from '@feedingchart/app/feedingchart/model/diaper'
import { api } from '@feedingchart/convex/_generated/api'
import { Id } from '@feedingchart/convex/_generated/dataModel'
import { Box } from '@radix-ui/themes'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'

export default function EditDiaper() {
    const { id } = useParams<{ id: string }>()

    const diaperToEdit = useQuery(api.diapers.getById, {
        id: id as Id<'diapers'>,
    })

    return (
        <Box className="h-dvh">
            {diaperToEdit && (
                <LogDiaperView
                    editDiaper={fromRawDiaperEntry(diaperToEdit)}
                ></LogDiaperView>
            )}
        </Box>
    )
}
