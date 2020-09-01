import request from 'supertest'
import app from '../../config/app'

describe('Name of the group', () => {
  test('should ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Matheus' })
      .expect({ name: 'Matheus' })
  })
})
