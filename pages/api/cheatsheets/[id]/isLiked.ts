import { withUser } from "@middlewares"
import { ApiHandler } from "@types"
import Like from "@db/models/Like"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query
    const isLiked = await Like.findOne({
      cheatsheet_id: id,
      user_id: req.user._id,
    })

    res.json(!!isLiked)
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

export default withUser(handler)
