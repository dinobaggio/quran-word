import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

chai.use(chaiHttp)
chai.should()

const ENDPOINT = '/api/v1/users'
const LOGIN_ENDPOINT = '/api/v1/auth/login'
const CREDENTIALS_LOGIN = {
  email: 'admin@admin.com',
  password: 'password'
}

describe('Test /api/v1/users', function() {
  it('List unathorized /', async () => {
    const res = await chai.request(app).get(ENDPOINT)
    res.should.have.status(401)
    res.body.should.have.own.property('message')
    res.body.message.should.equal('Unauthorized.')
  })
  it('List success /', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).get(ENDPOINT)
      .set('Authorization', `Bearer ${login.token}`)
    res.should.have.status(200)
    res.body.should.to.have.property('message')
    res.body.should.to.have.property('meta')
    res.body.should.to.have.property('data')
    res.body.data.should.to.be.an('array').to.be.not.empty
  })
})