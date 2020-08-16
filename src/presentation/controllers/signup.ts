import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-errors'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-errros'

export class SignUpController implements Controller {
  private readonly _emailValidation: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this._emailValidation = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]
    for (const required of requiredFields) {
      if (!httpRequest.body[required]) {
        return badRequest(new MissingParamError(required))
      }
    }

    const isValidEmail = this._emailValidation.isValid(httpRequest.body.email)

    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
