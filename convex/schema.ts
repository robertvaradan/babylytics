import { DiaperSchemaValidator } from '@babylytics/app/src/model/diaper'
import { FeedingSchemaValidator } from '@babylytics/app/src/model/feeding'
import { defineSchema, defineTable } from 'convex/server'

export default defineSchema({
    feedings: defineTable(FeedingSchemaValidator),
    diapers: defineTable(DiaperSchemaValidator),
})
