import Like from "../../../../db/models/Like"
import { ApiHandler } from "../../../../types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  try {
    const { id } = req.query
    const likes = await Like.countDocuments({
      cheatsheet_id: id,
    })

    res.json(likes)
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

export default handler
