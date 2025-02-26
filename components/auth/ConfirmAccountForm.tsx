"use client"
import { confirmAccount } from '@/actions/confirm-account-action'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

export default function ConfirmAccountForm() {
    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")
    const confirmAccountWithToken = confirmAccount.bind(null, token)//Bind generauna nueva función con la anterior pero permite pasarle datos adicionales como el token
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(isComplete) {//Funcion que verfica que el token haya finalizado para que lleguen los 6 numeros
            dispatch()
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success) {
            toast.success(state.success, {
                onClose: () => {
                    router.push('/auth/login')
                }
            })
        }
    }, [state, router])

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

  return (
    <>
        <div className='flex justify-center gap-5 my-10'>
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
            </PinInput>
        </div>
    </>
  )
}
