export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  wsPort: parseInt(process.env.WS_PORT, 10) || 3000,
  trustedDomain: process.env.TRUSTED_DOMAIN,
  throttle: {
    ttl: process.env.THROTTLE_TTL,
    limit: process.env.THROTTLE_LIMIT,
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_CHAT_DB_NAME,
      synchronize: Boolean(process.env.POSTGRES_SYNC), // shouldn't be used in production
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
});
