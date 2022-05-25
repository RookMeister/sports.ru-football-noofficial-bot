import dotenv from 'dotenv';

dotenv.config();

export const config = {
	SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
	// SERVER_PORT: process.env.SERVER_PORT || 3000,

	// JWT_SECRET: process.env.JWT_SECRET,
	// JWT_HEADER: process.env.JWT_HEADER,
	// JWT_EXPIRY: Number(process.env.JWT_EXPIRY),

	// MONGO_HOST: process.env.MONGO_HOST,
	// MONGO_PORT: process.env.MONGO_PORT,
	MONGO: process.env.MONGO,
};
