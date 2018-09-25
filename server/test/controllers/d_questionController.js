import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

let authToken;

describe('Questions', () => {
    /*
    * Test the /POST requests
  */
    describe('/POST REQUESTS', () => {
  before((done) => {
    const userDetails = {
      email: 'juliet@gmail.com',
      password: 'juliet'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userDetails)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it('it should not post a question with empty feilds', (done) => {
    
    const question = {
      title: '   ',
      body: 'The body exists',
      
    };
    chai.request(app)
      .post('/api/v1/question')
      .send(question)
      .end((err, res) => {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
  });


  it('it should not post question for user without token', (done) => {
  
    const question = {
        title: "title",
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question')
      .send(question)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not post question for user with wrong token', (done) => {
    const wrongToken = `${authToken}somewrong text`;
    const question = {
        title: "title",
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question')
      .set('Authorization', wrongToken)
      .send(question)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should post question for user with valid token', (done) => {
  
    const question = {
        title: "title",
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question')
      .set('Authorization', authToken)
      .send(question)
      .end((err, res) => {
        expect(res.body.message).to.eql('succefully created a question');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });
  });

 

  /*
    * Test the /GET requests
  */
  describe('/GET REQUESTS', () => {
    const wrongToken = `${authToken}somewrong text`;
    it('it should not get a user Question if user is not signed in', (done) => {
     
      chai.request(app)
        .get('/api/v1/question/1/questions')
        .set('Authorization', wrongToken)
        .end((err, res) => {
          expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
          expect(res.body.error).to.eql(true);
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('it should not get user\'s question for user without token', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/1/questions')
          .end((err, res) => {
            expect(res.body.message).to.eql('Kindly sign in');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(403);
            done();
          });
      });
      it('it should not get questions without a valid id ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/0bcc/questions')
          .set('Authorization', authToken)
          .end((err, res) => {
            expect(res.body.message).to.eql('ID can only be a number');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('it should not get questions without a valid id ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/0bcc')
          .end((err, res) => {
            expect(res.body.message).to.eql('ID can only be a number');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });

      it('it should not get questions that does not exist ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/100')
          .end((err, res) => {
            expect(res.body.message).to.eql('no questions found');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('it should get valid questions ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/1')
          .end((err, res) => {
            expect(res.body.message).to.eql('Success');
            expect(res.status).to.equal(201);
            done();
          });
      });
      it('it should not get questions when the user does not have questions ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/3/questions')
          .set('Authorization', authToken)
          .end((err, res) => {
            expect(res.body.message).to.eql('no questions found');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });

      it('should get question for user with valid token', (done) => {
  
       
        chai.request(app)
          .get('/api/v1/question/1/questions')
          .set('Authorization', authToken)
          .end((err, res) => {
            expect(res.body.message).to.eql('Success');
            expect(res.body).to.have.property('questions');
            expect(res.body).to.have.property('user');
            expect(res.status).to.equal(201);
            done();
          });
        });

      it('should get all questions', (done) => {

    
        chai.request(app)
            .get('/api/v1/questions')
            .end((err, res) => {
            expect(res.body.message).to.eql('success');
            expect(res.body).to.have.property('questionModel');
            expect(res.status).to.equal(201);
            done();
            });
        });
     
});

// delete question
describe('/DELETE REQUESTS', () => {

  
    
  
   
  
    it('it should not delete question for user without token', (done) => {
  
        chai.request(app)
          .delete('/api/v1/question/1')
          .end((err, res) => {
            expect(res.body.message).to.eql('Kindly sign in');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(403);
            done();
          });
      });
    
      it('it should not post question for user with wrong token', (done) => {
        const wrongToken = `${authToken}somewrong text`;
    
        chai.request(app)
          .delete('/api/v1/question/3')
          .set('Authorization', wrongToken)
          .end((err, res) => {
            expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(403);
            done();
          });
      });
    
      it('User can only delete its owned question', (done) => {
 
    
        chai.request(app)
          .delete('/api/v1/question/2')
          .set('Authorization', authToken)
          .end((err, res) => {
            expect(res.body.message).to.eql('You have no question with this ID.');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should delete question for user with valid token', (done) => {
      
        chai.request(app)
          .delete('/api/v1/question/1')
          .set('Authorization', authToken)        
          .end((err, res) => {
            expect(res.body.message).to.eql('Deleted successfully');
            expect(res.status).to.equal(201);
            done();
          });
    
      });
    
});
});
