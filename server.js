import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { dbConnection } from "./utils/dbConnection.js"
import studentRoutes from "./routes/student.js"
import lecturerRoutes from "./routes/lecturer.js"
import classRoutes from "./routes/class.js"

dotenv.config()
const app = express()

app.use(express.json())

// creating the port
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

// call the database function here
dbConnection()

// Routes
app.use("/api/students", studentRoutes)
app.use("/api/lecturers", lecturerRoutes)
app.use("/api/classes", classRoutes)

app.listen(PORT, () => {
          console.log(`server is running on port: ${PORT}`);
})


