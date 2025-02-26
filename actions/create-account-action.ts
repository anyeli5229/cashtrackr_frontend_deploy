"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
   success: string
}

export async function register(prevState: ActionStateType, formData: FormData) {
    const registerData = {//Se obtinen los datos del formulario como objeto
        email: formData.get('email'),//Se obtienen mediante el name que tengan en el formulario
        name: formData.get('name'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }
    //validar
    const register = RegisterSchema.safeParse(registerData)
    const errors = register.error?.errors.map(error => error.message)
    if(!register.success){
        const errors = register.error.errors.map(error => error.message)
        return {//Si hay errores se detiene la ejecución del código para que después data no sea undefined
            errors,
            success: prevState.success
        }
    }
    console.log(errors)
    //Registrar Usuario
    const url =`${process.env.API_URL}/auth/create-account`
    const req = await fetch(url, {//Se hace la petición
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({//Se mandan los datos en forma de json
            name: register.data.name,
            password: register.data.password,
            email: register.data.email
        })
    })
    const json = await req.json()
    if(req.status === 409){//Si hay un usuario duplicado
        const error = ErrorResponseSchema.parse(json)
        return {
            errors: [error.error],
            success: ''
        }
    }
    const success = SuccessSchema.parse(json)//Parse evalúa unicamente la variable y no todos los errores como safeParse
    return {//Si no hay errores se regresa el arrglo de errores limpio para que register no sea undefined
        errors: [],
        success
    }
}