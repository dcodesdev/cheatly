import JWT from "jsonwebtoken"
import TwitterApi from "twitter-api-v2"

import User from "@db/models/User"
import { WithUser } from "."

export const withUser: WithUser = (handler) => {
  return async (req, res) => {
    try {
      const tokenWithBearer = req.headers.authorization
      const token = tokenWithBearer?.split(" ")[1]

      if (!token) throw Error()

      const { id } = JWT.verify(token, process.env.JWT_SECRET as string) as {
        id: string
      }

      const user = await User.findById(id)
        .select("twitter_access_token twitter_access_secret")
        .lean()

      if (!user) throw Error()

      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY as string,
        appSecret: process.env.TWITTER_API_SECRET as string,
        accessToken: user.twitter_access_token,
        accessSecret: user.twitter_access_secret,
      })

      req.client = client
      req.user = await User.findById(id)
        .select("-twitter_access_token -twitter_access_secret")
        .lean()

      return await handler(req, res)
    } catch (error) {
      res.status(401).json({ message: "Unauthenticated" })
    }
  }
}
