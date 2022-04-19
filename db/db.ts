import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log("MongoDB connected")
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}

connectDb()
