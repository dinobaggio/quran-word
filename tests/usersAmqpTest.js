import dotenv from 'dotenv'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { faker } from '@faker-js/faker'
import crypto from 'crypto'
import app from '../src/app'
import { create } from '../src/handler/users/crud'

dotenv.config()

const {
  ACTIVE_RABBITMQ
} = process.env

chai.use(chaiHttp)
chai.should()

const ENDPOINT = '/amqp/users'
const LOGIN_ENDPOINT = '/api/v1/auth/login'
const CREDENTIALS_LOGIN = {
  email: 'admin@admin.com',
  password: 'password'
}

if (ACTIVE_RABBITMQ === 'no') {
  describe('No test users amqp', () => {
    it('no test users amqp', (done) => {done()})
  })
} else if (ACTIVE_RABBITMQ === 'yes') {
  describe('[RabbitMQ] Test users amqp', () => {
    it('[Create user] success /', async () => {
      const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
        .send(CREDENTIALS_LOGIN)
      const res = await chai.request(app).post(ENDPOINT)
        .set('Authorization', `Bearer ${login.token}`)
        .send({
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: 'password'
        })
      res.should.have.status(201)
      res.body.should.have.own.property('message')
    })
    it('[Update user] success /', async () => {
      const user = await create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: 'password'
      })
      const updateName = faker.name.fullName()
      const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
        .send(CREDENTIALS_LOGIN)
      const res = await chai.request(app).put(`${ENDPOINT}/${user.uuid}`)
        .set('Authorization', `Bearer ${login.token}`)
        .send({
          name: updateName
        })
      res.should.have.status(200)
      res.body.should.have.own.property('message')
    })
    it('[Delete user] success /', async () => {
      const user = await create({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: 'password'
      })
      const { body: login } = await chai.request(app).post(LOGIN_ENDPOINT)
        .send(CREDENTIALS_LOGIN)
      const res = await chai.request(app).delete(`${ENDPOINT}/${user.uuid}`)
        .set('Authorization', `Bearer ${login.token}`)
      res.should.have.status(200)
      res.body.should.have.own.property('message')
    })
  })
}