import express from "express";
import {
          createLecturer,
          getLecturers,
          getLecturer,
          updateLecturer,
          deleteLecturer
} from "../controllers/lecturer.js";

const router = express.Router();

// Create a new lecturer
router.post("/", createLecturer);

// Get all lecturers
router.get("/", getLecturers);

// Get a single lecturer
router.get("/:id", getLecturer);

// Update a lecturer
router.put("/:id", updateLecturer);

// Delete a lecturer
router.delete("/:id", deleteLecturer);

export default router; 