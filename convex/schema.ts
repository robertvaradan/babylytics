import { FeedingSchemaValidator } from '@feedingchart/app/feedingchart/model/feeding'
import { defineSchema, defineTable } from 'convex/server'

export default defineSchema({
    feedings: defineTable(FeedingSchemaValidator),
})
