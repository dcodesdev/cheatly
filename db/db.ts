import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cheatsheets")
    console.log("MongoDB connected")
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}

connectDb()
