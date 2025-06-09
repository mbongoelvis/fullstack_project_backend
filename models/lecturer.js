import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
          username: {
                    type: String
          },
          password: {
                    type: String
          },
          isLecturer: {
                    type: Boolean,
                    default: true
          }
})

export default mongoose.model("lecturer", lecturerSchema);