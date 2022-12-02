import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

chai.use(chaiHttp)
chai.should()

describe('Test /api/v1/auth', function () {
  it('Test success /auth/login',(done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@admin.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.own.property('message')
        res.body.should.have.own.property('token')
        done()
      })
  })
  it('Test in correct email or password /auth/login', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'adminsss@admin.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.own.property('message')
        res.body.message.should.equal('Incorrect email or password.')
        done()
      })
  })
})