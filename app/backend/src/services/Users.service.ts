import bcrypt = require('bcryptjs');
import criarToken from '../utils/token';
import Users from '../models/UsersModel';
import ResultObject from '../interfaces/ResultInterfaces';

class UserService {
  private user = Users;
  private _invalide = 'Invalid email or password';
  public async findUser(email: string, password: string): Promise<ResultObject> {
    const user = await this.user.findOne({ where: { email } });
    if (user !== null) {
      const verifica = bcrypt.compareSync(password, user.password);
      if (verifica) return { type: 200, message: await criarToken(email) };
      if (!verifica) return { type: 401, message: this._invalide };
    }
    return { type: 401, message: this._invalide };
  }

  public async findRoleByEmail(email: string): Promise<ResultObject> {
    const user = await this.user.findOne({ where: { email } });
    if (user !== null) {
      return { type: 200, message: user.role };
    }
    return { type: 401, message: this._invalide };
  }
}

export default UserService;
