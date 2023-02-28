import UsersModel from '../models/UsersModel';

// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync('12345', salt);

class UserService {
  private users = UsersModel;
  // Store hash in your password DB.
  public async findLogin(email: string) {
    const users = await this.users.findOne({ where: { email } });
    if (users) {
      return { type: null, message: users };
    }
    return { type: 'naoAchouUser', message: users };
  }
}

// const a = bcrypt.compareSync('1234566', senha);
// console.log(a);

export default UserService;

// $2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu;
