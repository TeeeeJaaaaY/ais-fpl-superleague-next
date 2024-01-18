require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    dbUrl: process.env.DATABASE_URL,
    EAST_ID: process.env.EAST_ID,
    WEST_ID: process.env.WEST_ID,
  },
};

module.exports = nextConfig
