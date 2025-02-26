import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"
//Endpoint de API para obtener el presupuesto, este endpoint permite conectarse con la base de datosy obtner los datos, esto se hace debido a que los componentesestán muy anidados como clientes o como servidores, lo que hace complejo realizar una peticion y este endpoint permite realizarlo y os cookies unicamente se almacenan en el servidor
export async function GET(request: Request, {params} : {params: {budgetId: string, expenseId: string}}) {
    await verifySession()

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()

    if(!req.ok) {
        return Response.json(json.error, {status: 403})
    }

    return Response.json(json)
}

