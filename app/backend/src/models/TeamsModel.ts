import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';
// import OtherModel from './OtherModel';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init(
  {
    // ... Campos
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    modelName: 'team',
    timestamps: false,
  },
);

TeamsModel.hasMany(MatchesModel, { foreignKey: 'id', as: 'home_team_id' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'id', as: 'away_team_id' });

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default TeamsModel;
