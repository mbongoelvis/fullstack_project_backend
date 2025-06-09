import Class from "../models/class.js";

// Create a new class
export const createClass = async (req, res) => {
  const { className, level, venu, createdBy } = req.body;
  try {
    if (!className || !level || !venu || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if class already exists
    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await new Class({
      className,
      level,
      venu,
      createdBy,
      isOngoing: "toStart",
      attendees: [],
    }).save();

    res.status(201).json({ data: newClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single class by ID
export const getClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classData = await Class.findOne({ _id: id });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class
export const updateClass = async (req, res) => {
  try {
    const { className, level, venu, isOngoing } = req.body;
    const updateData = {};

    if (className) updateData.className = className;
    if (level) updateData.level = level;
    if (venu) updateData.venu = venu;
    if (isOngoing) updateData.isOngoing = isOngoing;

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("createdBy", "username email");

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add attendee to class
export const addAttendee = async (req, res) => {
  try {
    const { matricule, name } = req.body;
    if (!matricule || !name) {
      return res
        .status(400)
        .json({ message: "Matricule and name are required" });
    }

    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Check if student with this matricule is already in attendees
    const existingAttendee = classData.attendees.find(
      (attendee) => attendee.matricule === matricule
    );

    if (existingAttendee) {
      return res.status(400).json({
        message: "Student with this matricule is already in class",
        attendee: existingAttendee,
      });
    }

    // Add new attendee
    classData.attendees.push({
      matricule,
      name,
      addedAt: new Date(),
    });

    await classData.save();

    res.status(200).json({
      message: "Attendee added successfully",
      class: classData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove attendee from class
export const removeAttendee = async (req, res) => {
  try {
    const { matricule } = req.body;
    if (!matricule) {
      return res.status(400).json({ message: "Matricule is required" });
    }

    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Remove student from attendees
    classData.attendees = classData.attendees.filter(
      (attendee) => attendee.matricule !== matricule
    );
    await classData.save();

    res.status(200).json({
      message: "Attendee removed successfully",
      class: classData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
