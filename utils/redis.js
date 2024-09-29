const redis = require('redis');
const { promisify } = requir('util');

/**
 * create the Redis Client
 */


class RedisClient {
    constructor() {
        this.client = redis.createclient();
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.client.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error.message}`);
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key){
        return this.getAsync(key);
    }

    async set(key, value, duration){
        this.client.setex(key, value, duration);
    }
    async del(key){
        this.client.del(key);
    }
}

const redisClient = new RedisClient();

export default redisClient;