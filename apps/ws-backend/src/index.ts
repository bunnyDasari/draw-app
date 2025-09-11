import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SEC } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db-store/client";

const wss = new WebSocketServer({ port: 3001 });

interface User { //userinterface
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];


//ws connection
wss.on('connection', (ws, request) => {
    const url = request.headers.token; // req an token from headers
    if (!url) {
        return
    }

    // console.log(new URLSearchParams(url.split('?')[0]))
    // console.log(new URLSearchParams(url.split('?')[1]))
    // const queryParams = new URLSearchParams(url.split('?')[1]);
    // const tokenCheck = queryParams.get('token') || "";
    if (typeof url !== "string") {
        return;
    }
    const verifyToken = jwt.verify(url, JWT_SEC) as JwtPayload

    if (verifyToken === null) {
        ws.close()
        return null;
    }


    users.push({
        userId: verifyToken.token,
        rooms: [],
        ws
    })

    console.log(users)
    ws.on('message', async (data) => {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data);
        }

        if (parsedData.type === "join_room") {
            console.log(users)
            const user = users.find(x => x.ws === ws);
            console.log(user)
            user?.rooms.push(parsedData.roomId);
        }
        console.log(parsedData)
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }

            user.rooms = user?.rooms.filter(x => x === parsedData.room);

        }

        console.log("message received")
        console.log(parsedData);

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId: verifyToken.token
                }
            });

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }

    });

});