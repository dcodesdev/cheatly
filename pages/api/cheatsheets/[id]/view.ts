import moment from "moment"
import { ApiHandler } from "../../../../types"
import requestIp from "request-ip"
import View from "../../../../db/models/View"

const handler: ApiHandler = async (req, res) => {
  try {
    const { id } = req.query
    if (!id) throw Error()
    if (typeof id !== "string") throw Error()

    const ip = requestIp.getClientIp(req)

    const userViewed = await View.findOne({
      ip,
      cheatsheet_id: id,
      createdAt: {
        $gte: moment().subtract(15, "minutes").toDate(),
      },
    })

    if (!userViewed) {
      await View.create({ ip, cheatsheet_id: id })
      res.status(200).end()
      return
    }

    res.status(200).end()
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}

export default handler
