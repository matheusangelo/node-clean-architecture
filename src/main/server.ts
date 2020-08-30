import app from './config/app'
import middlewares from './config/middlewares'

middlewares(app)

app.listen(8000, () => { console.log('Server listen at http://localhost:8000') })
