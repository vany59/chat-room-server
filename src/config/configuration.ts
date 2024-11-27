export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  trustedDomain: process.env.TRUSTED_DOMAIN,
  throttle: {
    ttl: process.env.THROTTLE_TTL,
    limit: process.env.THROTTLE_LIMIT,
  },
});
