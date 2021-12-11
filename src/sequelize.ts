import { Sequelize, DataType } from "sequelize";
const sequelize = new Sequelize(process.env.DATABASE || "sqlite:dev.sqlite3")

const _nn = (t: DataType) => ({type: t, allowNull: true});
const _d = (t: DataType, d: unknown) => ({type: t, defaultValue: d});

await sequelize.authenticate()
await sequelize.sync()
export default sequelize;
export { _nn, _d };
