import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/db.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Router
app.use("/api/v1/", authRouter)


app.get("/", (req, res) => {
    res.status(200).json(
        {
            status: "Ok",
            message: "Hello from server"
        }
    )
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`)
})