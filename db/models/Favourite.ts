import {
  Model,
  Schema,
  models,
  model,
  Document,
  SchemaTimestampsConfig,
  Types,
} from "mongoose"
import CheatSheet from "@db/models/Cheatsheet"
import User from "@db/models/User"
import "../db"

interface FavoriteType extends Document, SchemaTimestampsConfig {
  cheatsheet_id: string
  user_id: string
}

const favoriteSchema = new Schema(
  {
    cheatsheet_id: {
      type: Types.ObjectId,
      ref: CheatSheet,
    },
    user_id: {
      type: Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
)

favoriteSchema.index({ cheatsheet_id: 1, user_id: 1 }, { unique: true })

const Favorite: Model<FavoriteType> =
  models.Favorite || model("Favorite", favoriteSchema)

export default Favorite
