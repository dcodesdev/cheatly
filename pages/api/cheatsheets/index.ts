import { NextApiHandler } from "next"
import CheatSheet from "../../../db/models/Cheatsheet"

const POST: NextApiHandler = async (req, res) => {
  try {
    let { name, author_name, cards } = req.body

    if (!name || !author_name || !cards) {
      throw new Error("Missing required fields")
    }

    cards = cards.filter((card: string) => card)

    if (!cards.length) throw Error("No cards provided")

    cards = cards.map((card: string) => ({ content: card }))

    const cheatsheet = await CheatSheet.create({
      name,
      author_name,
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

const handler: NextApiHandler = async (req, res) => {
  const { method } = req
  const handler = handlers[method as keyof typeof handlers]

  if (handler) {
    await handler(req, res)
  } else {
    res.status(404).json({ message: "Method not found" })
  }
}

export default handler
