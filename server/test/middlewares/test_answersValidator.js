import chai from 'chai';
import chaiHttp from 'chai-http';
import answerValidator from '../../middleware/answerValidator';

chai.use(chaiHttp);
const { expect } = chai;
const { createAnswerValidator} = answerValidator;



describe('USER VALIDATOR TESTS', () => {
  describe('signup tests', () => {
    it('should be a function', () => {
      expect(createAnswerValidator).to.be.a('function');
    });
     
    it('should accept three arguments', () => {
      expect(createAnswerValidator.length).to.equal(3);
    });

  });
});
