require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    dbUrl: process.env.DATABASE_URL,
    eastId: process.env.EAST_ID,
    westId: process.env.WEST_ID,
  },
};

module.exports = nextConfig
