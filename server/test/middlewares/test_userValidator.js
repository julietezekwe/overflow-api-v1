import chai from 'chai';
import chaiHttp from 'chai-http';
import userValidator from '../../middleware/userValidator';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;
const { userSignUp , userLogin} = userValidator;



describe('USER VALIDATOR TESTS', () => {
  describe('signup tests', () => {
    it('should be a function', () => {
      expect(userSignUp).to.be.a('function');
    });
     
    it('should accept three arguments', () => {
      expect(userSignUp.length).to.equal(3);
    });
    it('should not accept empty fields', (done) => {
  
      const userDetails = {
     
        name: '    ',
        password: '',
        email: 'julietunique@gmail.com',
       
       
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userDetails)
        .end((err, res) => {
          expect(res.body.message).to.eql('Please fill in all fields');
          expect(res.body.error).to.eql(true);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not accept empty fields', (done) => {
  
      const userDetails = {
     
        password: '',
        email: 'julietunique@gmail.com',
       
       
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.body.message).to.eql('Please fill in all fields');
          expect(res.body.error).to.eql(true);
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not accept invalid email', (done) => {
  
      const userDetails = {
        email: 'julietun',
        password : 'juliet'
       
       
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not accept invalid email', (done) => {
  
      const userDetails = {
        name: 'name',
        email: 'julietun',
        password : 'ju'
       
       
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should be a function', () => {
      expect(userLogin).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(userLogin.length).to.equal(3);
    });
  });
});
