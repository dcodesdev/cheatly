import CheatSheet from "../../../db/models/Cheatsheet"
import withUser from "../../../middlewares/withUser"
import { ApiHandler } from "../../../types"

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

    res.json(myCheatsheets)
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        message: error.message,
      })
  }
}

export default withUser(handler)
