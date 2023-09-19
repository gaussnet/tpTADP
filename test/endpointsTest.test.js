const chai= require('chai');
const chaiHttp= require('chai-http');
const expect= require('chai').expect;

chai.use(chaiHttp);

const url= 'http://localhost:3001';

describe('Prueba post evaluaciones', () => {
    it('prueba post eval', (done) => {
        chai.request(url)
        .post('/api/evaluaciones')
        .send({data:'hola'})
        .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(200)
            done()
        })
    })
})

//const app= require('../models/server').app;


describe('Prueba endpoints', () => {
    it('Prueba get evaluaciones', (done) => {
        chai.request('http://localhost:3001/api/evaluaciones')
            .get('/')
            .end((err, res) => {
                console.log('A');
                console.log(res.body);
                //chai.assert.equal(res.body, {data: 'Hola evaluación'});
                expect(res.body).to.have.property('data', 'Hola evaluación');
                //expect(res.body).to.equal({data: 'Hola evaluación'});
                done();
            })
        console.log('B');
    })
})

