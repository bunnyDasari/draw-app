import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SEC } from "@repo/backend-common/config"
import { userSignSchema, userRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db-store/client"
const app = express()
app.use(express.json())
console.log(JWT_SEC)
app.get("/", (req, res) => {
    res.json("hi there")
})

app.post("/login", async (req, res) => {
    const { username, password, photo } = userSignSchema.parse(req.body)
    try {
        const userCheck = await prismaClient.user.findFirst({
            where: {
                username
            }
        })
        console.log(userCheck)
        if (userCheck) {
            const token = jwt.sign({
                token: userCheck.id
            }, JWT_SEC)
            res.json({ token })
        } else {
            res.json({ msg: "username not found" })
        }
    } catch (error) {
        res.json({ error })
    }
})

app.post("/signup", async (req, res) => {
    const { username, password, photo } = userSignSchema.parse(req.body)
    try {
        await prismaClient.user.create({
            data: {
                username,
                password,
                photo
            }
        })
        res.json({ msg: "user is created" })
    } catch (error) {
        res.json({ error })
    }

})

app.post("/create-room", async (req, res) => {
    const parsed = userRoomSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error })
    }

    const { name } = parsed.data
    // const token = req.headers.token as string
    // const decoded = jwt.verify(token, JWT_SEC) as { token: number }
    // console.log({
    //     slug: name,
    //     adminId: decoded.token
    // }, decoded)
    try {
        const token = req.headers.token as string
        const decoded = jwt.verify(token, JWT_SEC) as { token: number }

        const room = await prismaClient.room.create({
            data: {
                slug: name,
                adminId: decoded.token
            }
        })
        res.json({ id: room.id })
    } catch (error) {
        res.json({ error })
    }


})

app.get("/chats/:roomId", async (req, res) => {
    const roomId = req.params.roomId
    console.log(roomId)
    try {
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: Number(roomId)
            },
            orderBy: {
                id: "desc",
            },
            take: 50

        })
        res.json({
            chats
        })
    } catch (error) {
        console.log("error", error)
    }
})

app.listen(3002, () => {
    console.log("server is runnig at port 3002")
})