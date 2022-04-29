import CheatSheet from "../../../../db/models/Cheatsheet"
import View from "../../../../db/models/View"
import withUser from "../../../../middlewares/withUser"
import { ApiHandler } from "../../../../types"

const PUT: ApiHandler = async (req, res) => {
  let { name, cards } = req.body

  try {
    if (!name || !cards) {
      throw new Error("Missing required fields")
    }

    cards = cards.filter((card: string) => card)

    if (!cards.length) throw Error("No cards provided")

    cards = cards.map((card: string) => ({ content: card }))

    const cheatsheet = await CheatSheet.findOneAndUpdate(
      {
        _id: req.query.id,
        user_id: req.user._id,
      },
      {
        name,
        cards,
      },
      {
        new: true,
      }
    )

    res.json(cheatsheet)
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

const GET: ApiHandler = async (req, res) => {
  try {
    const { id } = req.query
    if (!id) throw Error()

    const [cheatsheet, views] = await Promise.all([
      CheatSheet.findOne({ _id: id }).lean(),
      View.countDocuments({ cheatsheet_id: id }),
    ])

    res.json({
      ...cheatsheet,
      views,
    })
  } catch (error) {
    res.json({
      message: "Something went wrong",
    })
  }
}

const DELETE: ApiHandler = async (req, res) => {
  try {
    await CheatSheet.deleteOne({
      _id: req.query.id,
    })

    res.json({
      message: "Cheatsheet deleted",
    })
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

const handlers = {
  PUT,
  GET,
  DELETE,
}

const handler: ApiHandler = async (req, res) => {
  const handler = handlers[req.method as keyof typeof handlers]

  if (handler) {
    await handler(req, res)
    return
  }

  res.status(405).send({
    error: "Method not allowed",
  })
}

export default withUser(handler)
