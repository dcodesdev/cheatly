import type { NextApiRequest, NextApiResponse } from "next"
import type { TwitterApi } from "twitter-api-v2"
import type { UserType } from "@db"

export type Request = NextApiRequest & { user: UserType; client: TwitterApi }

export type ApiHandler = (req: Request, res: NextApiResponse) => Promise<void>
