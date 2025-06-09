import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
          username: {
                    type: String
          },
          matricule: {
                    type: String
          },
          email: {
                    type: String
          },
          password: {
                    type: String
          },
          isStudent: {
                    type: Boolean,
                    default: true
          }
})

export default mongoose.model("student", studentSchema);