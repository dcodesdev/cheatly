import {
  Model,
  model,
  models,
  Schema,
  SchemaTimestampsConfig,
  Document,
  Types,
} from "mongoose"
import CheatSheet from "./Cheatsheet"
import "../db"

interface ViewType extends Document, SchemaTimestampsConfig {
  ip: string
  cheatsheet_id: string
}

const viewSchema = new Schema(
  {
    ip: {
      type: String,
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

const View: Model<ViewType> = models.View || model("View", viewSchema)

export default View
