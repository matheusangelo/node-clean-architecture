import { HttpResponse } from '../protocols/http'
import { InternalServerError } from '../errors/internal-server-error'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new InternalServerError()
  }
}

export const ok = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body: body
  }
}
