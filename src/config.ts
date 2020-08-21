export default {
    PORT: process.env.PORT || '8080',
    DATABASE_USER: process.env.DATABASE_USER || 'user',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'password',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_SCHEMA: process.env.DATABASE_SCHEMA || 'db',
    DATABASE_PORT: process.env.DATABASE_PORT || '3306',
    JWT: process.env.JWT || 'tokenultrasecreto',
};
