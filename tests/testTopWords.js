import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'

chai.use(chaiHttp)
chai.should()

describe('Top Words', () => {
  it('should return 200', (done) => {
    chai.request(app)
      .get('/api/v1/quran/top-word-quran')
      .query({ surah_number: 3 })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).equal(200)
        done()
      })
  }).timeout(30000)
})