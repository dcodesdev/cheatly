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
    const { user } = req

    const like = await Like.findOne({
      cheatsheet_id: id,
      user_id: user._id,
    })

    if (!like) {
      await Like.create({
        cheatsheet_id: id,
        user_id: user._id,
      })
    }
    if (like) {
      await Like.deleteOne({
        cheatsheet_id: id,
        user_id: user._id,
      })
    }

    res.status(200).end()
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

export default withUser(handler)
