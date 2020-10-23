module.exports = {
	type: process.env.WRITE_DB_TYPE,
	host: process.env.WRITE_DB_HOST,
	port: process.env.WRITE_DB_PORT,
	username: process.env.WRITE_DB_USERNAME,
	password: process.env.WRITE_DB_PASSWORD,
	database: process.env.WRITE_DB_NAME,
	entities: ["./src/**/*.entity.ts", "./dist/**/*.entity.ts"],
	synchronize: true,
	logging: true,
};
