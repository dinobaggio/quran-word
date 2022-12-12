# starterkit-express
simple starter kit express

## Supported feature

- [x] Database orm sequelize
- [x] Validators router
- [x] Multilanguage i18n (headers: accept-language)
- [x] ES6 Javascript
- [x] Seeder and migration table user
- [x] Basic Login
- [x] JWT token
- [x] Puml format documentation
- [x] Eslint
- [x] User CRUD and validate user token
- [x] Unit test
- [x] Toggle feature rabbitmq
- [ ] Toggle feature redis
- [ ] Sweager API documentation
- [ ] Error Logs

## Installation

- run `npm install`
- copy `.env.example` to `.env` and set up your local configuration and local database, default: mysql
- run `npm install -g sequelize-cli mysql2` and then run `sequelize db:migrate`

## Login

- email: `admin@admin.com`
- password: `password`

## Structure folder

```bash
├── database
│   ├── config
│   ├── migrations
│   └── seeders
├── documents
│   └── database.puml
├── public
│   └── style.css
├── src
│   ├── bin
│   │   ├── amqpListener.js #
│   │   └── server.js #
│   ├── controllers
│   │   ├── amqp
│   │   │   └── usersController.js # for listener rabbitmq
│   │   ├── api
│   │   │   ├── authController.js
│   │   │   └── usersController.js
│   ├── handler
│   │   ├── auth
│   │   │   └── login.js
│   │   ├── users
│   │   │   └── crud.js
│   ├── libs # libs or library
│   │   ├── lang
│   │   │   ├── en.json
│   │   │   └── id.json
│   │   ├── middlewares
│   │   │   ├── validators
│   │   │   │   ├─ authValidator.js
│   │   │   │   ├─ usersValidator.js
│   │   │   │   ├─ validateNotFound.js
│   │   │   │   └─ validateValidator.js
│   │   │   └── authMiddleware.js
│   │   ├── providers
│   │   │   └── rabbitMQ
│   │   │       ├── listener
│   │   │       │   ├─ index.js
│   │   │       │   └─ usersListener.js
│   │   │       └── index.js
│   │   ├── constant.js
│   │   └── passwordHash.js
│   ├── models
│   │   ├── index.js
│   │   └── users.js
│   ├── routes
│   │   ├── amqp
│   │   │   ├── index.js
│   │   │   └── usersRouter.js
│   │   ├── api
│   │   │   ├── authRouter.js
│   │   │   ├── index.js
│   │   │   └── usersRouter.js
│   │   └── index.js
│   └── app.js
├── tests
│   ├── authTest.js
│   ├── rabbitMQTest.js
│   ├── usersAmqpTest.js
│   └── usersTest.js
├── views
│   ├── error.hbs
│   └── index.hbs
├── .env-example
├── .gitignore
├── .sequelizerc
├── package-lock.json
├── package.json
└── README.md
```
