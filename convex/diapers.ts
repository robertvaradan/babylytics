import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { DiaperSchemaValidator } from '@feedingchart/app/feedingchart/model/diaper'

export const list = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return (
            await ctx.db
                .query('diapers')
                .filter((query) => query.eq(query.field('userId'), args.userId))
                .collect()
        ).sort((a, b) => -(a.time - b.time))
    },
})

export const getById = query({
    args: { id: v.optional(v.id('diapers')) },
    handler: async (ctx, args) => {
        return args.id ? await ctx.db.get(args.id) : undefined
    },
})

export const insert = mutation({
    args: { diaper: DiaperSchemaValidator },
    handler: async (ctx, args) => {
        return await ctx.db.insert('diapers', {
            ...args.diaper,
            time: args.diaper.time,
        })
    },
})

export const update = mutation({
    args: { id: v.id('diapers'), diaper: DiaperSchemaValidator },
    handler: async (ctx, args) => {
        return await ctx.db.patch<'diapers'>(args.id, args.diaper)
    },
})

export const remove = mutation({
    args: { id: v.id('diapers') },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id)
    },
})
