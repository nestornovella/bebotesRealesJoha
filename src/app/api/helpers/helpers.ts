import { NextResponse } from "next/server"

type Status = 'ok' | 'error'


interface ResponseInterface<T> {
    ok?: boolean
    error?:boolean
    response: T
}



export function response<T> (status:Status, response: T, statusCode = 200){


    const res: ResponseInterface<T> = {
        [status]: true,
        response: response
    }


    return NextResponse.json(res, {status: statusCode})

}


