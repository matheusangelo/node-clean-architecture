import express from 'express'
import ConfigMiddlewares from '../config/middlewares'

const app = express()

ConfigMiddlewares(app)

export default app
