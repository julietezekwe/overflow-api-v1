import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
const { expect } = chai;

let authToken;

describe('Answers', () => {
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

  it('it should not post a answer with empty feilds', (done) => {
    
    const answer = {
      body: ' ',
      
    };
    chai.request(app)
      .post('/api/v1/question/1/answer')
      .send(answer)
      .end((err, res) => {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
  });


  it('it should not post answer for user without token', (done) => {
  
    const answer = {
       
        body: "body"
    };
    chai.request(app)
     .post('/api/v1/question/1/answer')
      .send(answer)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('it should not post answer for user with wrong token', (done) => {
    const wrongToken = `${authToken}somewrong text`;
    const answer = {
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question/1/answer')
      .set('Authorization', wrongToken)
      .send(answer)
      .end((err, res) => {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should post answer for user with valid token and question exist', (done) => {
  
    const question = {
        title: "title",
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question/1/answer')
      .set('Authorization', authToken)
      .send(question)
      .end((err, res) => {
        expect(res.body.message).to.eql('succefully created answer');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });
  
  it('should post not answer for a question that does not exist', (done) => {
  
    const question = {
        title: "title",
        body: "body"
    };
    chai.request(app)
      .post('/api/v1/question/9/answer')
      .set('Authorization', authToken)
      .send(question)
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
          .get('/api/v1/question/9/answers')
          .end((err, res) => {
            expect(res.body.message).to.eql('no answers found');
            expect(res.body.error).to.eql(true);
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('it should question\' answers ', (done) => {
  
        chai.request(app)
          .get('/api/v1/question/1/answers')
          .end((err, res) => {
            expect(res.body.message).to.eql('Success');
            expect(res.status).to.equal(201);
            done();
          });
      });
    });
});
