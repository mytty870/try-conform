'use client'

import { useFormState } from "react-dom"
import { userRegister } from "../actions"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { schema } from "../schema"

export const Form = () => {
  const [lastResult, action] = useFormState(userRegister, undefined)

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      userName: 'aa',
      email: 'aa',
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema })
    },
    // バリデーションのタイミング。入力時にバリデーションを行う
    shouldValidate: 'onInput',
    // リバリデーションのタイミング(送信ボタンを押した後)。入力時にリバリデーションを行う
    shouldRevalidate: 'onInput',
  })

  console.log(form.errors)

  return (
    <form {...getFormProps(form)} action={action} onSubmit={form.onSubmit}  className="m-4">
      <div>
        <label htmlFor={fields.userName.id}>Username</label>
        <input
          {...getInputProps(fields.userName, { type: 'text'})}
          className="border-2 border-gray-300 rounded-md p-2 w-full"
        />
        <div id={fields.userName.errorId} className="text-red-500">{fields.userName.errors}</div>
      </div>
      <div>
				<label htmlFor={fields.email.id}>Email</label>
				<input
          {...getInputProps(fields.email, { type: 'email' })}
          className="border-2 border-gray-300 rounded-md p-2 w-full"
				/>
				<div id={fields.email.errorId} className="text-red-500">{fields.email.errors}</div>
			</div>
      {form.errors && (
        <div>
      <ul>
            {form.errors.map((error) => (
              <li className="text-red-500" key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="px-2.5 py-2 bg-blue-500 rounded-md text-white">送信</button>
    </form>
  )
}
