import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
          className: {
                    type: String,
                    required: true,
                    unique: true
          },
          createdBy: {
                    type: String,
                    required: true
          },
          createdAt: {
                    type: Date,
                    default: Date.now
          },
          level: {
                    type: String,
                    required: true
          },
          isOngoing: {
                    type: String,
                    enum: ["onGoing", "ended", "toStart"],
                    default: "toStart"
          },
          venu: {
                    type: String,
                    required: true
          },
          attendees: [{
                    matricule: {
                              type: String,
                              required: true
                    },
                    name: {
                              type: String,
                              required: true
                    },
                    addedAt: {
                              type: Date,
                              default: Date.now
                    }
          }]
});

export default mongoose.model("class", classSchema);