import { NextApiRequest, NextApiResponse } from "next"
import { TwitterApi } from "twitter-api-v2"
import { UserType } from "./db/models/User"

export type Request = NextApiRequest & { user: UserType; client: TwitterApi }

export type ApiHandler = (req: Request, res: NextApiResponse) => Promise<void>
