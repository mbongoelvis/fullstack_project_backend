import Lecturer from "../models/lecturer.js";
import bcrypt from "bcrypt";

// Create a new lecturer
export const createLecturer = async (req, res) => {
          try {
                    const { username, password } = req.body;

                    // Check if lecturer already exists
                    const existingLecturer = await Lecturer.findOne({ username });
                    if (existingLecturer) {
                              return res.status(400).json({ message: "Lecturer already exists" });
                    }

                    // Hash password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);

                    // Create new lecturer
                    const newLecturer = new Lecturer({
                              username,
                              password: hashedPassword,
                              isLecturer: true
                    });

                    // Save lecturer
                    const savedLecturer = await newLecturer.save();

                    // Remove password from response
                    const { password: _, ...lecturerWithoutPassword } = savedLecturer.toObject();

                    res.status(201).json(lecturerWithoutPassword);
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
};

// Get all lecturers
export const getLecturers = async (req, res) => {
          try {
                    const lecturers = await Lecturer.find().select("-password");
                    res.status(200).json(lecturers);
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
};

// Get a single lecturer by ID
export const getLecturer = async (req, res) => {
          try {
                    const lecturer = await Lecturer.findById(req.params.id).select("-password");
                    if (!lecturer) {
                              return res.status(404).json({ message: "Lecturer not found" });
                    }
                    res.status(200).json(lecturer);
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
};

// Update a lecturer
export const updateLecturer = async (req, res) => {
          try {
                    const { username, password } = req.body;
                    const updateData = {};

                    if (username) updateData.username = username;
                    if (password) {
                              const salt = await bcrypt.genSalt(10);
                              updateData.password = await bcrypt.hash(password, salt);
                    }

                    const updatedLecturer = await Lecturer.findByIdAndUpdate(
                              req.params.id,
                              updateData,
                              { new: true }
                    ).select("-password");

                    if (!updatedLecturer) {
                              return res.status(404).json({ message: "Lecturer not found" });
                    }

                    res.status(200).json(updatedLecturer);
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
};

// Delete a lecturer
export const deleteLecturer = async (req, res) => {
          try {
                    const deletedLecturer = await Lecturer.findByIdAndDelete(req.params.id);
                    if (!deletedLecturer) {
                              return res.status(404).json({ message: "Lecturer not found" });
                    }
                    res.status(200).json({ message: "Lecturer deleted successfully" });
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
}; 