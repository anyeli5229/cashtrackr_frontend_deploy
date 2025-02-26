import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata : Metadata = {
    title: 'CashTrakr - Crear Cuenta',
    description: 'CashTrakr - Crear Cuenta'
}

export default function RegisterPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Crea una cuenta</h1>
            <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">fínanzas</span></p>
            <RegisterForm/>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link href='/auth/login' className="text-center text-gray-500">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>
                <Link href='/auth/forgot-password' className="text-center text-gray-500">
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}
