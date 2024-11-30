import express from "express"
import http from 'http'
import {WebSocketServer} from 'ws'   
import cors from "cors"
import "dotenv/config"
import { redis } from "./connection/redis.connect.js"
import router from "./routes/join.routes.js"

const app = express();
const Server = http.createServer(app);
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN
}))

app.get("/",(req,res)=>{
    res.send({message:"Humraha"})
})

//adding routes
app.use("/join",router)

const webSocket = new WebSocketServer({server:Server});
const rooms = {};

webSocket.on("connection",(ws,req)=>{
    ws.send("Connected Web Socket Server...!");
    ws.on("message",(data)=>{
        const parsedData = JSON.parse(data)
        switch(parsedData.action){
            case "join":
                joinUser(ws,parsedData.room);
        }
        console.log(parsedData)
    })
})


function joinUser(ws,room){
    if(!rooms[room]){
        rooms[room] = [];
    }
    rooms[room].push(ws);
    console.log(rooms)
    // console.log(ws)
    return ws.send(JSON.stringify({action:"join",room}));
}

function passXAndYValue(ws,room,data){
    if(rooms[room]){
        rooms[room].forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({ action: "sendLocation", x:data.x, y:data.y }));
             }
        });
    }

}
//server and redis connection
redis.on("connect",()=>{
    console.log("redis connect")
})

Server.listen(PORT,()=>{
    console.log("Server is Running ",PORT)
})