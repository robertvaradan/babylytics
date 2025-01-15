import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { DiaperSchemaValidator } from '@babylytics/app/src/model/diaper'

export const list = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        const userId = user?.tokenIdentifier.split('|')[1]

        if (!user || userId !== args.userId) {
            return []
        }

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
        const user = await ctx.auth.getUserIdentity()
        const userId = user?.tokenIdentifier.split('|')[1]

        if (args.id == null) {
            return undefined
        }

        const entry = await ctx.db.get(args.id)

        if (!user) {
            return Promise.reject('User not authenticated')
        }

        if (!entry) {
            return Promise.reject('Feeding entry not found')
        }

        if (userId !== entry.userId) {
            return Promise.reject(
                `User token identifier ${userId} does not match diaper entry user ID ${entry.userId}`
            )
        }

        return entry
    },
})

export const insert = mutation({
    args: { diaper: DiaperSchemaValidator },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        const userId = user?.tokenIdentifier.split('|')[1]

        if (!user) {
            return Promise.reject('User not authenticated')
        }

        if (userId !== args.diaper.userId) {
            return Promise.reject(
                `User token identifier ${userId} does not match diaper entry user ID ${args.diaper.userId}`
            )
        }

        return await ctx.db.insert('diapers', {
            ...args.diaper,
            time: args.diaper.time,
        })
    },
})

export const update = mutation({
    args: { id: v.id('diapers'), diaper: DiaperSchemaValidator },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        const entry = await ctx.db.get(args.id)
        const userId = user?.tokenIdentifier.split('|')[1]

        if (!user) {
            return Promise.reject('User not authenticated')
        }

        if (entry == null) {
            return Promise.reject('Feeding entry not found')
        }

        if (entry.userId !== args.diaper.userId) {
            return Promise.reject(
                'Feeding entry user ID does not match provided feeding user ID'
            )
        }

        if (userId !== args.diaper.userId) {
            return Promise.reject(
                `User token identifier ${userId} does not match diaper entry user ID ${args.diaper.userId}`
            )
        }

        return await ctx.db.patch<'diapers'>(args.id, args.diaper)
    },
})

export const remove = mutation({
    args: { id: v.id('diapers') },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        const entry = await ctx.db.get(args.id)
        const userId = user?.tokenIdentifier.split('|')[1]

        if (!user) {
            return Promise.reject('User not authenticated')
        }

        if (entry == null) {
            return Promise.reject('Feeding entry not found')
        }

        if (userId !== entry.userId) {
            return Promise.reject(
                `User token identifier ${userId} does not match diaper entry user ID ${entry.userId}`
            )
        }

        return await ctx.db.delete(args.id)
    },
})
