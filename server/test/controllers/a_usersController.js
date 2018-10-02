import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { userDetails } from "../testData";
chai.use(chaiHttp);
const { expect } = chai;
const { registeredUser, newUser, wrongPassword } = userDetails;
let authToken; 
describe('User', () => {
  it('not register a user if email is not unique', (done) => {
  
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.body.message).to.eql('email already exist');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should register a user successfully', (done) => {

    chai.request(app)
    .post('/api/v1/auth/signup')
    .send(newUser)
    .end((err, res) => {
      expect(res.body.message).to.eql('Signed up successfully');
      expect(res.body).to.have.property('token');
      expect(res.status).to.equal(201);
      authToken = res.body.token;
      done();
      });
  });

  it('it should not login a user with wrong credential', (done) => {
   
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('wrong credentials');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should login a valid user', (done) => {
   
   
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(registeredUser)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.message).eql('logged in successfully');
        expect(res.body).to.have.property('token');
        expect(res.status).to.equal(201);
        authToken = res.body.token;
        done();
      });
  });

  it('should not get a user that does not exist', (done) => {
   
    chai.request(app)
      .get('/api/v1/auth/50')
      .end((err, res) => {
        expect(res.body.message).to.eql('No user found');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should get a user that exist', (done) => {
   
    chai.request(app)
      .get('/api/v1/auth/1')
      .end((err, res) => {
        expect(res.body.message).to.eql('success');
        expect(res.status).to.equal(201);
        done();
      });
  });

});
