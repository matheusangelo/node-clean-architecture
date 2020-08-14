import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-errors'

export class SignUpController {
  handle (httpRequest: HttpRequest<any>): HttpResponse<any> {
    if (!httpRequest.body.name) {
      return {
        ...httpRequest, statusCode: 400, body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        ...httpRequest, statusCode: 400, body: new MissingParamError('email')
      }
    }
  }
}
