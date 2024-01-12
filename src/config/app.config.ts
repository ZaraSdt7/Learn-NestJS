const configs = {
  port: Number(process.env.PORT) || 4000,
  NODE_ENV: String(process.env.NODE_ENV),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.TOKEN_JWT),
  JWT_EXPIRES: String(process.env.EXPIRE_TOKEN),
};

export default () => configs;
export type ConfigsType = typeof configs;
