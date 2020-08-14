import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest<any>): HttpResponse<any> {
    if (!httpRequest.body.name) {
      return {
        ...httpRequest, statusCode: 400, body: new Error('Missing params: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        ...httpRequest, statusCode: 400, body: new Error('Missing params: email')
      }
    }
  }
}
