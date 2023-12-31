const chai= require('chai');
const chaiHttp= require('chai-http');
const expect= require('chai').expect;

chai.use(chaiHttp);

const url= 'http://localhost:3001/api';

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFjMmJkN2RiNTM5Y2ViOTBlY2Y0NmUiLCJpYXQiOjE3MDA1NzA4NTMsImV4cCI6MTcwMDU4NTI1M30.Xzw7F7BEzEg8VJ3mC7DJlmKhUkrikyxZjEQAoptUnzo';
const matricula= 'mls765'                       //Para get turno por matrícula y get evaluaciones por matrícula
const matriculaNoExistente= 'aaa000'
const turnoYaExistente= "2023-10-24T11:10:00"
const turnoNuevo= "2023-11-25T11:30:00";
const idTurno='654fc3fb58992f738dea3428'    //Turno a confirmar


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
    }).timeout(5000);
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
    it('Prueba post evaluacion', (done) => {
        chai.request(url)
            .post('/evaluaciones')
            .set('x-token', token)
            .send({
                "matricula":"mls765",
                "pruebas": {
                    "pruebaFrenos": {
                        "tipo": "FRENOS",
                        "puntaje": 8
                    },
                    "pruebaSuspension": {
                        "tipo": "SUSPENSION",
                        "puntaje": 5
                    },
                    "pruebaLuces": {
                        "tipo": "LUCES",
                        "puntaje": 9
                    },
                    "pruebaMotor": {
                        "tipo": "MOTOR",
                        "puntaje": 4
                    },
                    "pruebaAlineacion": {
                        "tipo": "ALINEACION",
                        "puntaje": 6
                    },
                    "pruebaContaminacion": {
                        "tipo": "CONTAMINACION",
                        "puntaje": 9
                    },
                    "pruebaTrenDelantero": {
                        "tipo": "TREN_DELANTERO",
                        "puntaje": 5
                    },
                    "pruebaTrenTrasero": {
                        "tipo": "TREN_TRASERO",
                        "puntaje": 10
                    },
                    "pruebaCinturones": {
                        "tipo": "CINTURONES",
                        "puntaje": 5
                    },
                    "pruebaMatafuego": {
                        "tipo": "MATAFUEGO",
                        "puntaje": 9
                    }
                },
                "observaciones": "Tren delantero defectuoso" 
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(201);
                done();
            })
    }).timeout(5000);
    it('Prueba post evaluacion sin token', (done) => {
        chai.request(url)
            .post('/evaluaciones')
            .send({
                "matricula":"mls765",
                "pruebas": {
                    "pruebaFrenos": {
                        "tipo": "FRENOS",
                        "puntaje": 8
                    },
                    "pruebaSuspension": {
                        "tipo": "SUSPENSION",
                        "puntaje": 5
                    },
                    "pruebaLuces": {
                        "tipo": "LUCES",
                        "puntaje": 9
                    },
                    "pruebaMotor": {
                        "tipo": "MOTOR",
                        "puntaje": 4
                    },
                    "pruebaAlineacion": {
                        "tipo": "ALINEACION",
                        "puntaje": 6
                    },
                    "pruebaContaminacion": {
                        "tipo": "CONTAMINACION",
                        "puntaje": 9
                    },
                    "pruebaTrenDelantero": {
                        "tipo": "TREN_DELANTERO",
                        "puntaje": 5
                    },
                    "pruebaTrenTrasero": {
                        "tipo": "TREN_TRASERO",
                        "puntaje": 10
                    },
                    "pruebaCinturones": {
                        "tipo": "CINTURONES",
                        "puntaje": 5
                    },
                    "pruebaMatafuego": {
                        "tipo": "MATAFUEGO",
                        "puntaje": 9
                    }
                },
                "observaciones": "Tren delantero defectuoso" 
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(401);
                done();
            })
    }).timeout(5000);
    it('Prueba post evaluacion faltan campos', (done) => {
        chai.request(url)
            .post('/evaluaciones')
            .set('x-token', token)
            .send({
                "matricula":"mls765",
                "pruebas": {
                    "pruebaSuspension": {
                        "tipo": "SUSPENSION",
                        "puntaje": 5
                    },
                    "pruebaLuces": {
                        "tipo": "LUCES",
                        "puntaje": 9
                    },
                    "pruebaMotor": {
                        "tipo": "MOTOR",
                        "puntaje": 4
                    },
                    "pruebaAlineacion": {
                        "tipo": "ALINEACION",
                        "puntaje": 6
                    },
                    "pruebaContaminacion": {
                        "tipo": "CONTAMINACION",
                        "puntaje": 9
                    },
                    "pruebaTrenDelantero": {
                        "tipo": "TREN_DELANTERO",
                        "puntaje": 5
                    },
                    "pruebaTrenTrasero": {
                        "tipo": "TREN_TRASERO",
                        "puntaje": 10
                    },
                    "pruebaCinturones": {
                        "tipo": "CINTURONES",
                        "puntaje": 5
                    },
                    "pruebaMatafuego": {
                        "tipo": "MATAFUEGO",
                        "puntaje": 9
                    }
                },
                "observaciones": "Tren delantero defectuoso" 
            })
            .end((err, res) => {
                //console.log(res.body);
                expect(res).to.have.status(400);
                done();
            })
    }).timeout(5000);
})

