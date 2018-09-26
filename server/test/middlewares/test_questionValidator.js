import chai from 'chai';
import chaiHttp from 'chai-http';
import questionValidator from '../../middleware/questionValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { createQuestionValidator} = questionValidator;



describe('USER VALIDATOR TESTS', () => {
  describe('signup tests', () => {
    it('should be a function', () => {
      expect(createQuestionValidator).to.be.a('function');
    });
     
    it('should accept three arguments', () => {
      expect(createQuestionValidator.length).to.equal(3);
    });

  });
});
