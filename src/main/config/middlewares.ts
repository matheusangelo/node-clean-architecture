import { Express } from 'express'
import { BodyParser } from '../middlewares/body-parser/body-parser'
import { Cors } from '../middlewares/cors/cors'

export default (app: Express): void => {
  app.use(BodyParser)
  app.use(Cors)
}
