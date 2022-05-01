import Favorite from "@db/models/Favourite"
import { withUser } from "@middlewares"
import { ApiHandler } from "@types"

// to check if the cheat sheet is favourited by the user
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

    res.json(exists)
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    })
  }
}

export default withUser(handler)
