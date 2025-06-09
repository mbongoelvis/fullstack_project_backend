import express from "express";
import {
          createClass,
          getClasses,
          getClass,
          updateClass,
          deleteClass,
          addAttendee,
          removeAttendee,
} from "../controllers/class.js";

const router = express.Router();

// Create a new class
router.post("/", createClass);

// Get all classes
router.get("/", getClasses);

// Get a single class
router.get("/:id", getClass);

// Update a class
router.put("/:id", updateClass);

// Delete a class
router.delete("/:id", deleteClass);

// Add attendee to class
router.post("/:id/attendees", addAttendee);

// Remove attendee from class
router.delete("/:id/attendees", removeAttendee);

export default router; 