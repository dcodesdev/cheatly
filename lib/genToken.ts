import JWT from "jsonwebtoken"

export const genToken = (id: string) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  })
  return token
}
