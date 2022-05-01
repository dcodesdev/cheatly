import Favorite from "../../../../db/models/Favourite"
import withUser from "../../../../middlewares/withUser"
import { ApiHandler } from "../../../../types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query
    const { user } = req

    if (!id || typeof id !== "string") throw Error()

    const exists = await Favorite.exists({
      cheatsheet_id: id,
      user_id: user._id,
    })

    if (exists) {
      await Favorite.deleteOne({
        cheatsheet_id: id,
        user_id: user._id,
      })
    } else {
      await Favorite.create({
        cheatsheet_id: id,
        user_id: user._id,
      })
    }

    res.status(200).end()
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    })
  }
}

export default withUser(handler)
