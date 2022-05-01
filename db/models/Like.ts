import {
  Schema,
  Model,
  models,
  model,
  Document,
  Types,
  SchemaTimestampsConfig,
} from "mongoose"
import CheatSheet, { CheatsheetType } from "./Cheatsheet"
import User, { UserType } from "./User"
import '../db'

interface LikeType extends Document, SchemaTimestampsConfig {
  user_id: string | UserType
  cheatsheet_id: string | CheatsheetType
}

const likeSchema = new Schema<LikeType>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: User,
    },
    cheatsheet_id: {
      type: Types.ObjectId,
      ref: CheatSheet,
    },
  },

  {
    timestamps: true,
  }
)

likeSchema.index({ user_id: 1, cheatsheet_id: 1 }, { unique: true })

const Like: Model<LikeType> = models.Like || model("Like", likeSchema)

export default Like
