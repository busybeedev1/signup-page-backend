import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// configuring app
const app = express();

//middlewares
const port = process.env.PORT;
app.use(express.json());

// use cors
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4017",
    "http://localhost:3030",
    "https://signup-page-frontend.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// function to connect the database
async function connectingDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected: You Can Proceed!");
    } catch (error) {
        console.log(error.message);
    }
};

connectingDatabase();

// test to ensure that backend is working
app.get("/", (req, res) => {
    res.send("backend is working!")
});


// routing
import useRouter from "./routers/userRouter.js";

app.use("/api/v1", useRouter);

// use cors

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// port being listened to
app.listen(port, () => {
    console.log(`server is up and running at ${port}`);
});
