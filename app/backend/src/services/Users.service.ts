import bcrypt = require('bcryptjs');
import criarToken from '../utils/token';
import Users from '../models/UsersModel';

class UserService {
  private user = Users;
  public async findUser(email: string, password: string) {
    // if (email.length < 1 || password.length < 1)
    const user = await this.user.findOne({ where: { email } });
    if (user !== null) {
      const verifica = bcrypt.compareSync(password, user.password);
      if (verifica) return { type: 200, message: await criarToken(email) };
      if (!verifica) return { type: 401, message: 'Invalid email or password' };
    }
    return { type: 401, message: 'Invalid email or password' };
  }
}

export default UserService;
