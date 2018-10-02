import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import { userDetails, answerDetails } from "../testData";
const { registeredUser } = userDetails;
const { emptyField, validAnswer, answerAccept, answerUpdate } = answerDetails
chai.use(chaiHttp);
const { expect } = chai;

let authToken;

describe('Answers', () => {
    /*
    * Test the /POST requests
  */
    describe('/POST REQUESTS', () => {
  before((done) => {
   
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(registeredUser)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

  it('it should not post a answer with empty feilds', (done) => {
    chai.request(app)
      .post('/api/v1/question/1/answer')
      .send(emptyField)
      .end((err, res) => {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
  });


  it('it should not post answer for user without token', (done) => {
    chai.request(app)
     .post('/api/v1/question/2/answer')
      .send(validAnswer)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not post answer for user with wrong token', (done) => {
    const wrongToken = `${authToken}somewrong text`;
    chai.request(app)
      .post('/api/v1/question/2/answer')
      .set('Authorization', wrongToken)
      .send(validAnswer)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should post answer for user with valid token and question does not belong to user', (done) => {
  
    chai.request(app)
      .post('/api/v1/question/2/answer')
      .set('Authorization', authToken)
      .send(validAnswer)
      .end((err, res) => {
        expect(res.body.message).to.eql('succefully created answer');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });
    it('should not post answer for user that owns the question', (done) => {
      chai.request(app)
        .post('/api/v1/question/1/answer')
        .set('Authorization', authToken)
        .send(validAnswer)
        .end((err, res) => {
          expect(res.body.message).to.eql('You cannot comment on your question');
          expect(res.body.error).to.eql(true);
          expect(res.status).to.equal(401);
          done();
        });
      });

      
    it('should not update answer that does not exist', (done) => {
  
      chai.request(app)
        .put('/api/v1/question/4/answers/50')
        .set('Authorization', authToken)
        .send(answerUpdate)
        .end((err, res) => {
          expect(res.body.message).to.eql('You have no answer with this ID.');
          expect(res.body.error).to.eql(true);
          expect(res.status).to.equal(401);
          done();
        });
      });

      
  it('should update answer for user that owns the answer', (done) => {
    chai.request(app)
      .put('/api/v1/question/2/answers/1')
      .set('Authorization', authToken)
      .send(answerUpdate)
      .end((err, res) => {
        expect(res.body.message).to.eql('succefully updated an answer');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });

  it('should accept the answer for the question owner', (done) => {
    chai.request(app)
      .put('/api/v1/question/1/answers/2')
      .set('Authorization', authToken)
      .send(answerAccept)
      .end((err, res) => {
        expect(res.body.message).to.eql('You have accepted this answer');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });
  
  it('should not post answer for a question that does not exist', (done) => {
  
    chai.request(app)
      .post('/api/v1/question/50/answer')
      .set('Authorization', authToken)
      .send(validAnswer)
      .end((err, res) => {
        expect(res.body.message).to.eql('this question does not exist');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
 

  /*
    Test the /GET requests
  */
  describe('/GET REQUESTS', () => {
    const wrongToken = `${authToken}somewrong text`;

      it('it should not get answer without a valid id ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/0bcc/answers')
          .end((err, res) => {
            expect(res.body.message).to.eql('ID can only be a number');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });

      it('it should not get answers that does not exist ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/50/answers')
          .end((err, res) => {
            expect(res.body.message).to.eql('no answers found');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('it should get question\' answers ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/2/answers')
          .end((err, res) => {
            expect(res.body.message).to.eql('Success');
            expect(res.status).to.equal(201);
            done();
          });
      });
    });
});
