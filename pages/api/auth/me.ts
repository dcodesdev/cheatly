import moment from "moment"
import User from "../../../db/models/User"
import withUser from "../../../middlewares/withUser"
import { ApiHandler, Request } from "../../../types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  try {
    const fifteenMins = 1000 * 60 * 15
    const lastUpdatedUser = moment(req.user.updatedAt as string)

    // if fifteen minute is passed since the last update
    // then fetch the user from the twitter api and update the user
    const isPassed = moment().diff(lastUpdatedUser) > fifteenMins

    if (isPassed) {
      const user = await getUserFromTwitter(req)
      res.json(user)
    } else {
      res.json(req.user)
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error." })
  }
}

const getUserFromTwitter = async (req: Request) => {
  const currentUser = await req.client.currentUser()

  const user = await User.findOneAndUpdate(
    {
      twitter_user_id: currentUser.id,
    },
    {
      username: currentUser.screen_name,
      profile_picture: currentUser.profile_image_url_https,
    },
    {
      upsert: true,
      new: true,
    }
  ).select("-twitter_access_token -twitter_access_secret")

  return user
}

export default withUser(handler)
