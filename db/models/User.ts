import mongoose, { Model, Document, SchemaTimestampsConfig } from "mongoose"
import { CheatsheetType } from "./Cheatsheet"
import "../db"

export interface UserType extends Document, SchemaTimestampsConfig {
  username: string
  email: string
  twitter_access_token?: string
  twitter_access_secret?: string
  twitter_user_id: string
  profile_picture: string
  name: string
  cheatsheets: CheatsheetType[]
}

const UserSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    twitter_user_id: {
      type: String,
    },
    twitter_access_token: {
      type: String,
    },
    twitter_access_secret: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<UserType> =
  mongoose.models.User || mongoose.model("User", UserSchema)

export default User
