
import { start as ensTart } from './getEnsTransfer'
import redis from '../lib/redis'
import timer from 'src/lib/timer'

  function StartEnsTask() {
    timer.run({ second: [10,30,60]}, async function () {
        //获取锁,后期可换成分布式锁，如redlock
        const key = 'ens_data_key'//后期可设置成任务枚举常量
        const lock = await redis.get(key)
        try {
            if (!lock) {
                console.log('获取锁成功，任务开始')
                await redis.set(key, 1)
                await ensTart()
            } else {
                console.log('获取锁失败')
            }
        } catch (err) {
            console.log(err)
        }
        finally {
            //解锁
            await redis.del(key)
        }
    })

    //console.log(res)
}

async function clearLock(){
    await redis.del('ens_data_key')
}

async function initTasks() {
    await clearLock()
    StartEnsTask()
}
export { initTasks } 