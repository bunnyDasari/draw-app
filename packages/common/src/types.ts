import { z } from "zod"

export const userSignSchema = z.object({
    username: z.string(),

})

export const userSignupSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const userRoomSchema = z.object({
    name: z.string()
})




