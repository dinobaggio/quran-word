import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { faker } from '@faker-js/faker'
import crypto from 'crypto'
import app from '../src/app'

chai.use(chaiHttp)
chai.should()

const ENDPOINT = '/api/v1/users'
const LOGIN_ENDPOINT = '/api/v1/auth/login'
const CREDENTIALS_LOGIN = {
  email: 'admin@admin.com',
  password: 'password'
}

describe('[Test user] /api/v1/users', function() {
  it('[List user] unathorized /', async () => {
    const res = await chai.request(app).get(ENDPOINT)
    res.should.have.status(401)
    res.body.should.have.own.property('message')
    res.body.message.should.equal('Unauthorized.')
  })
  it('[List user] success /', async () => {
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
  
  it('[Create user] unathorized /', async () => {
    const res = await chai.request(app).post(ENDPOINT)
      .send(data)
      res.should.have.status(401)
      res.body.should.have.own.property('message')
      res.body.message.should.equal('Unauthorized.')
  })
  it('[Create user] validate empty /', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).post(ENDPOINT)
      .set('Authorization', `Bearer ${login.token}`)
    res.should.have.status(422)
    res.body.should.have.own.property('message')
    res.body.should.have.own.property('errors')
    res.body.message.should.equal('Unprocessable Entity.')
  })
  const data = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: 'password'
  }
  it('[Create user] success /', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).post(ENDPOINT)
      .set('Authorization', `Bearer ${login.token}`)
      .send(data)
    res.should.have.status(201)
    res.body.should.have.own.property('message')
    res.body.should.have.own.property('data')
    res.body.data.email.should.equal(data.email)
    res.body.data.name.should.equal(data.name)
    res.body.data.should.own.property('id')
    res.body.data.should.own.property('uuid')
    data['id'] = res.body.data.id
    data['uuid'] = res.body.data.uuid
  })
  it('[Create user] login after create /', async () => {
    const res = await chai.request(app).post(LOGIN_ENDPOINT)
      .send({
        email: data.email,
        password: data.password
      })
    res.should.have.status(200)
    res.body.should.have.own.property('message')
    res.body.should.have.own.property('token')
  })
  it('[Create user] create with same email /', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).post(ENDPOINT)
      .set('Authorization', `Bearer ${login.token}`)
      .send(data)
    res.should.have.status(422)
    res.body.should.have.own.property('message')
    res.body.message.should.equal('Unprocessable Entity.')
    res.body.should.have.own.property('errors')
  })
  it('[Detail user] success /:uuid', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).get(`${ENDPOINT}/${data.uuid}`)
      .set('Authorization', `Bearer ${login.token}`)
    res.should.have.status(200)
    res.body.should.have.own.property('message')
    res.body.message.should.equal('Success.')
  })
  it('[Detail user] not found user /:uuid', async () => {
    const randUUID = crypto.randomUUID()
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).get(`${ENDPOINT}/${randUUID}`)
      .set('Authorization', `Bearer ${login.token}`)
    res.should.have.status(404)
    res.body.should.have.own.property('message')
    res.body.message.should.not.equal('Success.')
  })
  it('[Update user] no empty /:uuid', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).put(`${ENDPOINT}/${data.uuid}`)
      .set('Authorization', `Bearer ${login.token}`)
      res.should.have.status(422)
      res.body.should.have.own.property('message')
      res.body.message.should.equal('Unprocessable Entity.')
  })
  const updateData = {
    name: faker.name.fullName()
  }
  it('[Update user] update user not found /:uuid', async () => {
    const randUUID = crypto.randomUUID()
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).put(`${ENDPOINT}/${randUUID}`)
      .set('Authorization', `Bearer ${login.token}`)
      .send(updateData)
      res.should.have.status(404)
      res.body.should.have.own.property('message')
      res.body.message.should.not.equal('Success.')
  })
  it('[Update user] success /:uuid', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).put(`${ENDPOINT}/${data.uuid}`)
      .set('Authorization', `Bearer ${login.token}`)
      .send(updateData)
      res.should.have.status(200)
      res.body.should.have.own.property('message')
      res.body.should.have.own.property('data')
      res.body.data.should.have.own.property('name')
      res.body.data.name.should.equal(updateData.name)
  })
  it('[Delete user] user not found /:uuid', async () => {
    const randUUID = crypto.randomUUID()
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).delete(`${ENDPOINT}/${randUUID}`)
      .set('Authorization', `Bearer ${login.token}`)
      res.should.have.status(404)
      res.body.should.have.own.property('message')
      res.body.message.should.not.equal('Success.')
  })
  it('[Delete user] success /:uuid', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).delete(`${ENDPOINT}/${data.uuid}`)
      .set('Authorization', `Bearer ${login.token}`)
      res.should.have.status(200)
      res.body.should.have.own.property('message')
  })
  it('[Delete user] user not found after delete /:uuid', async () => {
    const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
      .send(CREDENTIALS_LOGIN)
    const res = await chai.request(app).delete(`${ENDPOINT}/${data.uuid}`)
      .set('Authorization', `Bearer ${login.token}`)
      res.should.have.status(404)
      res.body.should.have.own.property('message')
      res.body.message.should.not.equal('Success.')
  })
})