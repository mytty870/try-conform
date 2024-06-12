import { z } from "zod";

export const schema = z.object({
  userName: z
  .string({ required_error: 'ユーザー名を入力してください'})
  .min(1, { message: 'ユーザー名を入力してください' })
  .min(2, { message: 'ユーザー名は2文字以上にしてください' })
  .max(14, { message: 'ユーザー名は10字以内にしてください' }),
  email: z.string({ required_error: 'メールアドレスを入力してください'}).email({ message: 'メールアドレスの形式で入力してください' }),
})