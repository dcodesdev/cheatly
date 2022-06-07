import TwitterApi from 'twitter-api-v2'
import { serialize } from 'cookie'

import User from '@db/models/User'
import { genToken } from '@lib'
import { ApiHandler } from '@types'
import dayjs from 'dayjs'

const handler: ApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  //

  await GET(req, res)
}

const GET: ApiHandler = async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query

  try {
    if (
      !oauth_verifier ||
      typeof oauth_token !== 'string' ||
      typeof oauth_verifier !== 'string'
    )
      return res.status(400).json({ message: 'Error' })

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY as string,
      appSecret: process.env.TWITTER_API_SECRET as string,
      accessToken: oauth_token,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN as string,
    })

    const result = await client.login(oauth_verifier)

    if (!result) throw Error('Invalid request!')

    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY as string,
      appSecret: process.env.TWITTER_API_SECRET as string,
      accessToken: result.accessToken,
      accessSecret: result.accessSecret,
    })

    const userData = await userClient.v1.verifyCredentials({
      include_email: true,
    })

    const user = await User.findOneAndUpdate(
      {
        twitter_user_id: result.userId,
      },
      {
        username: userData.screen_name,
        email: userData.email,
        twitter_access_token: result.accessToken,
        twitter_access_secret: result.accessSecret,
        profile_picture: userData.profile_image_url_https,
        name: userData.name,
      },
      {
        upsert: true,
        new: true,
      }
    )

    const token = genToken(user._id)

    if (!token) throw Error('Internal server error!')

    res
      .setHeader(
        'Set-Cookie',
        serialize('token', token, {
          expires: dayjs().add(30, 'days').toDate(),
          path: '/',
        })
      )
      .redirect(`${process.env.CLIENT_URL}/dashboard`)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: 'Internal server error.' })
  }
}

export default handler
