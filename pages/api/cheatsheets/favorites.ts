import CheatSheet from "../../../db/models/Cheatsheet"
import Favorite from "../../../db/models/Favourite"
import Like from "../../../db/models/Like"
import User from "../../../db/models/User"
import View from "../../../db/models/View"
import withUser from "../../../middlewares/withUser"
import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  try {
    const favs = await Favorite.find({
      user_id: req.user._id,
    })
      .select("-_id cheatsheet_id")
      .lean()

    const cheatsheets = await CheatSheet.find({
      _id: {
        $in: favs.map((fav) => fav.cheatsheet_id),
      },
    })
      .populate({ path: "user_id", select: "name" })
      .limit(10)
      .lean()

    const promises = cheatsheets.map(async (cheatsheet) => ({
      ...cheatsheet,
      views: await View.countDocuments({ cheatsheet_id: cheatsheet._id }),
      likes: await Like.countDocuments({ cheatsheet_id: cheatsheet._id }),
    }))

    const data = await Promise.all(promises)

    res.json(data)
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    })
  }
}

export default withUser(handler)
