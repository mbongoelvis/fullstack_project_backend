import Student from "../models/student.js";
import bcrypt from "bcrypt";

// Create a new student
export const createStudent = async (req, res) => {
  const { username, password, email, matricule } = req.body;
  try {
    // check if they didn't send any
    if (!username || !password || !email || !matricule) {
      return res.status(400).json({ message: "all fields are required" });
    }
    // Check if student already exists
    const existingStudent = await Student.findOne({ username: username });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    console.log("Creating new student...");
    const newStudent = await new Student({
      username,
      matricule,
      email,
      isStudent: true,
      password: hashedPassword,
    }).save();
    return res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// student login
export const loginStudent = async (req, res) => {
  const { username, password } = req.body;
  try {
            if (!username || !password) {
              return res.status(400).json({ message: "All fields are required" });
    }
    // find the user if they exist or not
    const existingStudent = await Student.findOne({ username: username });
    if (!existingStudent) {
      return res
        .status(400)
        .json({ message: "Student not found, create an account" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingStudent.password
    );
    if (!comparePassword) {
      return res.status(400).json({ message: "wrong cridentials" });
    }
    return res.status(200).json(existingStudent);
  } catch (error) {}
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.status(200).json({ students: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by ID
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
