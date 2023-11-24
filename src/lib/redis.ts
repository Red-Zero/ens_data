'use strict';
import Redis from 'ioredis';
import { getConfig } from 'src/getConfig';

const config = getConfig('redis');
const redis = new Redis(config);
export default redis ;