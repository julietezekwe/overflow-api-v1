const userDetails = {
  registeredUser: {
    name: 'Juliet',
    password: 'juliet',
    email: 'juliet@gmail.com',
  },

  newUser: {
    name: 'Seyi Ibezim',
    password: 'seyiii',
    email: 'seyi@gmail.com' 
  },

  wrongPassword: {
    email: 'juliet@gmail.com',
    password: 'jul'
  }
};

const questionDetails = {
  emptyField : {
    title: '   ',
    body: 'The body exists'
  },
  validQuestion : {
    title: "title",
    body: "body"
  },

}

const answerDetails = {
  emptyField : {
    body: ' '
  },
  validAnswer : {
    body: "body"
  },

  answerUpdate : {
    body: "body update body"
  },

  answerAccept : {
    body: "1"
  },


}


export { userDetails, questionDetails, answerDetails };
