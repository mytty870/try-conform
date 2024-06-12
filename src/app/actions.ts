'use server'
import { parseWithZod } from "@conform-to/zod"
import { schema } from "./schema"
import { redirect } from "next/navigation"

export const userRegister = async (prevState: any, formData: FormData) => {
  const submission = parseWithZod(formData, { schema })

  // パースに失敗した場合は、クライアントに報告
  if (submission.status !== 'success') {
    return submission.reply()
  }

  console.log(submission.value.userName)
  console.log(submission.value.email)

  return submission.reply({
    formErrors: ['ユーザー名が重複しています', 'メールアドレスが重複しています']
  })

  // return redirect('/home')
}