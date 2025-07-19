// class EmailService {
//   sendEmail(){
//     // logic here 
//   }
// }

// class UserService {
//   private emailService=EmailService
//   constructor(){
//     this.emailService=new EmailService()
//   }

//   createUser(){
//     //;logic of creating Users

//     this.emailService.sendEMail()
//   }


// }

// const user= new UserService()
// user.createUser();

/// WHAT AFTER DI Implemented

class EmailService{
  sendEMail(){

  }
}

class UserService{
  private emailService=EmailService
  constructor(emailService:EmailService){
    this.emailService=emailService
  }

  cretaeUser(){
    this.emailService.sendEmail()
  }
}

const emailService= new EmailService()
const userService= new UserService(emailService)

userService.cretaeUser()
