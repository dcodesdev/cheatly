import CheatSheet from "../../../db/models/Cheatsheet"
import Like from "../../../db/models/Like"
import User from "../../../db/models/User"
import View from "../../../db/models/View"
import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (req, res) => {
  try {
    const popularCheatsheets = await CheatSheet.find({})
      .limit(10)
      .sort({ createdAt: "desc" })
      .lean()

    const promises = popularCheatsheets.map(async (cheatsheet) => ({
      ...cheatsheet,
      author: await User.findOne({ _id: cheatsheet.user_id }).select(
        "name profile_picture"
      ),
      likes: await Like.countDocuments({ cheatsheet_id: cheatsheet._id }),
      views: await View.countDocuments({ cheatsheet_id: cheatsheet._id }),
    }))

    const data = await Promise.all(promises)

    res.json(data)
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    })
  }
}

export default handler
