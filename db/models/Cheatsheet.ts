import mongoose, {
  Document,
  SchemaTimestampsConfig,
  Model,
  Schema,
} from "mongoose"
import User, { UserType } from "./User"
import "../db"

export interface CheatsheetType extends Document, SchemaTimestampsConfig {
  user_id: string | UserType
  name: string
  cards: Card[]
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
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
)

const CheatSheet: Model<CheatsheetType> =
  mongoose.models.CheatSheet || mongoose.model("CheatSheet", cheatsheetSchema)

export default CheatSheet
