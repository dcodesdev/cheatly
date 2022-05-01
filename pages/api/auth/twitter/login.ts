import { NextApiHandler } from "next"

import Twitter from "@lib/twitter"

const GET: NextApiHandler = async (req, res) => {
  try {
    const callbackUrl = `${process.env.SERVER_URL}/api/auth/twitter/authorize`
    const { url } = await Twitter.generateAuthLink(callbackUrl)

    res.redirect(url)
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: "Internal server error." })
  }
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  await GET(req, res)
}

export default handler
