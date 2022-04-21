import TwitterApi from "twitter-api-v2"

if (
  !process.env.TWITTER_API_KEY ||
  !process.env.TWITTER_API_SECRET ||
  !process.env.TWITTER_ACCESS_TOKEN ||
  !process.env.TWITTER_ACCESS_SECRET
)
  throw Error("Missing Twitter API credentials")

const Twitter = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
})

export default Twitter
