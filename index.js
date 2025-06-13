const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB()

const {getSection} = require("./pkg/config/index")
const {login, register} = require ("./handlers/auth")

const app = express();
app.use(express.json());

app.use(
    "/api", 
    jwt({
        secret: getSection("development").jwt_secret,
        algorithms:["HS256"]
    })
    .unless({
        path: ["/auth/login", "/auth/register"]
    })
)

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/auth/login", login);
app.post("/auth/register", register);

app.listen(8000, () => console.log("Server started at port 8000"))
