import request from 'supertest'
import app from '../../config/app'

describe('Name of the group', () => {
  test('should ', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*')
  })
})
