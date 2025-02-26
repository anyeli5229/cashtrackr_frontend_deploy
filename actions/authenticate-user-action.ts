"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
    const loginCredencials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredencials)
    if(!auth.success){
        return {
            errors: auth.error.errors.map(error => error.message)
        }
    }
    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email
        })
    })
    const json = await req.json()
    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        return{
            errors: [error]
        }
    }
    //Setear Cookies
    cookies().set({
        name: 'CASHTRACKR_TOKEN',
        value: json,
        httpOnly: true,
        path: '/'
    })

    redirect('/admin')
}