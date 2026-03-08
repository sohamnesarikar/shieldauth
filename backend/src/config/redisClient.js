import redis from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.log(`Missing redis url`);
  process.exit(1);
}

export const redisClient = redis.createClient({
  url: redisUrl,
});

async function connectToRedis() {
  try {
    await redisClient.connect();
    console.log("connected to redis successfully");
  } catch (err) {
    console.log("redis connection failed", err.message);
  }
}

export default connectToRedis;
