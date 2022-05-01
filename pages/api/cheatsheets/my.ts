import CheatSheet from "@db/models/Cheatsheet"
import Like from "@db/models/Like"
import View from "@db/models/View"
import { withUser } from "@middlewares"
import { ApiHandler } from "@types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  const page = parseInt(req.query.page?.toString()) || 1
  const pageSize = 10

  try {
    const myCheatsheets = await CheatSheet.find({ user_id: req.user._id })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .lean()

    const promises = myCheatsheets.map(async (cheatsheet) => ({
      ...cheatsheet,
      views: await View.countDocuments({ cheatsheet_id: cheatsheet._id }),
      likes: await Like.countDocuments({ cheatsheet_id: cheatsheet._id }),
    }))

    const data = await Promise.all(promises)

    res.json(data)
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      })
  }
}

export default withUser(handler)
