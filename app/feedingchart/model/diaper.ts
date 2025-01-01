import { v } from 'convex/values'

export type Diaper = {
    _id: string
    userId: string
    time: Date
    type: DiaperType
}

export enum DiaperType {
    Wet = 'wet',
    Stool = 'stool',
    Dry = 'dry',
}

export const DiaperSchemaValidator = v.object({
    userId: v.string(),
    time: v.number(),
    type: v.union(v.literal('wet'), v.literal('stool'), v.literal('dry')),
})

export type RawDiaperEntry = {
    _id: string
    _creationTime: number
    userId: string
    time: number
    type: 'wet' | 'stool' | 'dry'
}

export function fromRawDiaperEntry(diaper: RawDiaperEntry): Diaper {
    return {
        _id: diaper._id,
        userId: diaper.userId,
        time: new Date(diaper.time),
        type: diaper.type as DiaperType,
    }
}
