import dotenv from 'dotenv';

dotenv.config();

export const config = {
	SERVER_PORT: Number(process.env.SERVER_PORT) || 8080,
	MONGO: process.env.MONGO || '',
	ID_CHANELS: process.env.ID_CHANELS || '',
	API_KEY_YOTUBE: process.env.API_KEY_YOTUBE || '',
};
