import { FeedingSchemaValidator } from '@feedingchart/app/feedingchart/model/feeding'
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return (
            await ctx.db
                .query('feedings')
                .filter((query) => query.eq(query.field('userId'), args.userId))
                .collect()
        ).sort((a, b) => -(a.time - b.time))
    },
})

export const getById = query({
    args: { id: v.optional(v.id('feedings')) },
    handler: async (ctx, args) => {
        return args.id ? await ctx.db.get(args.id) : undefined
    },
})

export const insert = mutation({
    args: { feeding: FeedingSchemaValidator },
    handler: async (ctx, args) => {
        return await ctx.db.insert('feedings', {
            ...args.feeding,
            time: args.feeding.time,
        })
    },
})

export const update = mutation({
    args: { id: v.id('feedings'), feeding: FeedingSchemaValidator },
    handler: async (ctx, args) => {
        return await ctx.db.patch<'feedings'>(args.id, args.feeding)
    },
})

export const remove = mutation({
    args: { id: v.id('feedings') },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id)
    },
})
