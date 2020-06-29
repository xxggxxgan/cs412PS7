const app = require('../app');
const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const {expect} = chai;
const {describe} = mocha;

chai.use(chaiHttp);

describe('covid api',()=>{
    it('should return 200 success',(done)=>{
        chai.request(app)
        .post('/current').end((err,response)=>{
            expect(response).to.have.status(200);
            done();
        })
    })

})

describe('covid api',()=>{
    it('the type should be text/html',(done)=>{
        chai.request(app)
            .post('/current').end((err,response)=>{
            expect(response).to.be.html;
            done();
        })
    })
})

describe('covid api',()=>{
    it('should not have error',(done)=>{
        chai.request(app)
            .post('/current').end((err,response)=>{
            expect(err).to.be.null;
            done();
        })
    })
})