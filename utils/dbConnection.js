import mongoose from "mongoose";

export const dbConnection = async () => {
          try {
                    await mongoose.connect(process.env.DB_CONNECTION).then(() => {
                             console.log("Database connected successfully");
                    })
          } catch (error) {
               console.log(error.message);
                    
          }
}