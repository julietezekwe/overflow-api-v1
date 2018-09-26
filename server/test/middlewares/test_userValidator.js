import chai from 'chai';
import chaiHttp from 'chai-http';
import userValidator from '../../middleware/userValidator';

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

  
    it('should be a function', () => {
      expect(userLogin).to.be.a('function');
    });

    it('should accept three arguments', () => {
      expect(userLogin.length).to.equal(3);
    });
  });
});
