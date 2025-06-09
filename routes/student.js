import express from "express";
import {
          createStudent,
          getStudents,
          getStudent,
          updateStudent,
          deleteStudent,
          loginStudent
} from "../controllers/student.js";

const router = express.Router();

// Create a new student
router.post("/", createStudent);

// Create a new student
router.post("/login", loginStudent);

// Get all students
router.get("/", getStudents);

// Get a single student
router.get("/:id", getStudent);

// Update a student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

export default router; 