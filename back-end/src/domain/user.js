
class User {
    constructor(email, password, country,occupation, name, birthday, fone, image  ) {
      this.email = email;
      this.password = password;
      this.country = country;
      this.occupation = occupation;
      this.name = name;
      this.birthday = birthday;
      this.fone = fone;
      this.image = image;
    }
  }
  
  module.exports = User;