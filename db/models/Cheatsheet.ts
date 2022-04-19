import mongoose, {
  Document,
  SchemaTimestampsConfig,
  Model,
  Schema,
} from "mongoose"
import "../db"

export interface CheatsheetType extends Document, SchemaTimestampsConfig {
  name: string
  author_name: string
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
    author_name: {
      type: String,
      maxlength: 320,
    },
    cards: {
      type: [cardSchema],
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
)

const CheatSheet: Model<CheatsheetType> =
  mongoose.models.CheatSheet || mongoose.model("CheatSheet", cheatsheetSchema)

export default CheatSheet
