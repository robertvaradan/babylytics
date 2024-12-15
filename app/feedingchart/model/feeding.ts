import { v } from 'convex/values'

export type Feeding = {
    userId: string
    time: Date
    durationL: number // In minutes
    durationR: number
    type: FeedingType
    amountMl: number
}

export type FeedingEntry = Feeding & {
    _id: string
}

export enum FeedingType {
    Breast = 'breast',
    Donor = 'donor',
    Formula = 'formula',
}

export const FeedingTypeValidator = v.union(
    v.literal('breast'),
    v.literal('donor'),
    v.literal('formula')
)

// Define Feeding schema
export const FeedingSchemaValidator = v.object({
    userId: v.string(),
    time: v.number(),
    durationL: v.number(),
    durationR: v.number(),
    type: FeedingTypeValidator,
    amountMl: v.number(),
})

export type RawFeedingEntry = {
    _id: string
    _creationTime: number
    type: 'breast' | 'donor' | 'formula'
    userId: string
    time: number
    durationL: number
    durationR: number
    amountMl: number
}

export function fromRawFeeding(feeding: RawFeedingEntry): FeedingEntry {
    return {
        _id: feeding._id,
        userId: feeding.userId,
        time: new Date(feeding.time),
        durationL: feeding.durationL,
        durationR: feeding.durationR,
        type: feeding.type as FeedingType,
        amountMl: feeding.amountMl,
    }
}
