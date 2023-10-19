const chai= require('chai');
const chaiHttp= require('chai-http');
const expect= require('chai').expect;

chai.use(chaiHttp);

const url= 'http://localhost:3001/api';

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjMmJkN2RiNTM5Y2ViOTBlY2Y0NmUiLCJpYXQiOjE2OTc3NDQ3OTUsImV4cCI6MTY5Nzc1OTE5NX0.mFMvQXjQ2Ml6gGXUexeHxZR5FGZm0N5krusix7-MyUg';
const matricula= 'mls765'
const matriculaNoExistente= 'aaa000'
const turnoYaExistente= "2023-10-24T11:10:00"
const turnoNuevo= "2023-10-25T11:20:00";
const idTurno='6531882ab76afa48f17ffcc1'
/*
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
*/

//const app= require('../models/server').app;

/*
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
*/

describe('Pruebas turnos', () => {
    it('Prueba get turnos libres', (done) => {
        chai.request(url)
            .get('/turnos/libres')
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
    it('Prueba get turnos confirmados', (done) => {
        chai.request(url)
            .get('/turnos/confirmados')
            .set('x-token', token)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
    it('Prueba get turnos confirmados sin token', (done) => {
        chai.request(url)
            .get('/turnos/confirmados')
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(401);
                done();
            })
    })
    it('Prueba get turnos confirmados x matrícula', (done) => {
        chai.request(url)
            .get(`/turnos/confirmados/${matricula}`)
            .set('x-token', token)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
    it('Prueba get turnos confirmados x matrícula sin token', (done) => {
        chai.request(url)
            .get(`/turnos/confirmados/${matricula}`)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(401);
                done();
            })
    })
    it('Prueba post turno nuevo', (done) => {
        chai.request(url)
            .post('/turnos')
            .set('x-token', token)
            .send({
                "fechaYhora": turnoNuevo
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(201);
                done();
            })
    })
    it('Prueba post turno ya existente', (done) => {
        chai.request(url)
            .post('/turnos')
            .set('x-token', token)
            .send({
                "fechaYhora": turnoYaExistente
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(400);
                done();
            })
    })
    it('Prueba put confirma turno', (done) => {
        chai.request(url)
            .put(`/turnos/${idTurno}`)
            .send({
                "matricula": "cba123"
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
});

describe('Pruebas evaluaciones', () => {
    it('Prueba get evaluaciones', (done) => {
        chai.request(url)
            .get('/evaluaciones')
            .set('x-token', token)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
    it('Prueba get evaluaciones sin token', (done) => {
        chai.request(url)
            .get('/evaluaciones')
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(401);
                done();
            })
    })
    it('Prueba get evaluaciones x matrícula', (done) => {
        chai.request(url)
            .get(`/evaluaciones/${matricula}`)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
    })
    it('Prueba get evaluaciones x matrícula no existe evaluación', (done) => {
        chai.request(url)
            .get(`/evaluaciones/${matriculaNoExistente}`)
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(404);
                done();
            })
    })
})

