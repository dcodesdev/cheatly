import CheatSheet from "../../../db/models/Cheatsheet"
import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (req, res) => {
  try {
    const popularCheatsheets = await CheatSheet.find({
      verified: true,
    }).limit(10)

    res.json(popularCheatsheets)
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    })
  }
}

export default handler
