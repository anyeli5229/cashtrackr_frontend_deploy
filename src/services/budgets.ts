import getToken from "@/src/auth/token"
import { BudgetAPIResponseSchema } from "@/src/schemas"
import { notFound } from "next/navigation"
import { cache } from "react"

export const getBudget = cache(async (budgetId: string) => {
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }
    const budget = BudgetAPIResponseSchema.parse(json)
    return budget
})