import sequelize, { _nn, _d } from "../sequelize";
import { Op, Model, DataTypes } from "sequelize";

export default class User extends Model {
	
	// Raw data
	public id!: number
	public username!: string
	public nick!: string | null
	public password!: string & {length: 128}
	public admin!: boolean

	// Currencies
	public money!: number
	public trophy!: number
	public rubies!: number
	public spheres!: number
	public shards!: number
	
	// Levels
	public prestiges!: number
	public swordLevel!: number
	public swordMax!: number
	public companionLevel!: number
	public companionMax!: number

	// Stats
	public attackMult!: number
	public healthMult!: number
}
User.init({
	// Raw data
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: new DataTypes.STRING(64),
		allowNull: false
	},
	nick: new DataTypes.STRING(64),
	password: {
		type: new DataTypes.STRING(128),
		allowNull: false
	},
	admin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},

	// Currencies
	money: _d(DataTypes.INTEGER.UNSIGNED, 0),
	trophy: _d(DataTypes.INTEGER.UNSIGNED, 0),
	rubies: _d(DataTypes.INTEGER.UNSIGNED, 0),
	spheres: _d(DataTypes.INTEGER.UNSIGNED, 0),
	shards: _d(DataTypes.INTEGER.UNSIGNED, 0),
	
	// Levels
	prestiges: _d(DataTypes.INTEGER.UNSIGNED, 0),
	swordLevel: _d(DataTypes.INTEGER.UNSIGNED, 1),
	swordMax: _d(DataTypes.INTEGER.UNSIGNED, 5),
	companionLevel: _d(DataTypes.INTEGER.UNSIGNED, 1),
	companionMax: _d(DataTypes.INTEGER.UNSIGNED, 5),

	// Stats
	attackMult: _d(DataTypes.INTEGER.UNSIGNED, 1),
	healthMult: _d(DataTypes.INTEGER.UNSIGNED, 1)
}, { sequelize })

User.sync();
