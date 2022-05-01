import "../db"
import { UserType } from "@db"
import User from "@db/models/User"
import {
  Document,
  SchemaTimestampsConfig,
  Schema,
  model,
  models,
  Model,
  Types,
} from "mongoose"

export interface CheatsheetType extends Document, SchemaTimestampsConfig {
  user_id: string | UserType
  name: string
  cards: Card[]
  verified: boolean
}

interface Card extends Document {
  content: string
}

const cardSchema = new Schema<Card>({
  content: {
    type: String,
    maxlength: 300,
  },
})

const cheatsheetSchema = new Schema<CheatsheetType>(
  {
    name: {
      type: String,
      maxlength: 320,
    },
    cards: {
      type: [cardSchema],
      maxlength: 100,
    },
    verified: {
      type: Boolean,
      default: false,
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

const CheatSheet: Model<CheatsheetType> =
  models.CheatSheet || model("CheatSheet", cheatsheetSchema)

export default CheatSheet
