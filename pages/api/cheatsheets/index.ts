import CheatSheet from "../../../db/models/Cheatsheet"
import withUser from "../../../middlewares/withUser"
import { ApiHandler } from "../../../types"

const POST: ApiHandler = async (req, res) => {
  try {
    let { name, cards } = req.body

    if (!name || !cards) {
      throw new Error("Missing required fields")
    }

    cards = cards.filter((card: string) => card)

    if (!cards.length) throw Error("No cards provided")

    cards = cards.map((card: string) => ({ content: card }))

    const cheatsheet = await CheatSheet.create({
      user_id: req.user._id,
      name,
      cards,
    })

    res.json(cheatsheet)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ message: error.message })
  }
}

const handlers = {
  POST,
}

const handler: ApiHandler = async (req, res) => {
  const { method } = req
  const handler = handlers[method as keyof typeof handlers]

  if (handler) {
    await handler(req, res)
  } else {
    res.status(404).json({ message: "Method not found" })
  }
}

export default withUser(handler)
