
import { contract as enscontract, provider,decodeTopic } from '../lib/ether/enscontract'
import { Transfer } from '../entity/transfer'
import AppDataSource from '../dbsource/index'
import { TaskConfig } from 'src/entity/taskCongig'




//获取任务进度
async function getTaskConfig() {
    const taskconfig = await AppDataSource.manager.findOne(TaskConfig, {
        where: {
            task_name: "ens_data"
        }
    })
    //当前区块高度
    const block_number_now = await provider.getBlockNumber()
    //如果发生区块回滚
    if(block_number_now<taskconfig.block_number){
        //数据回滚
        await rollback(block_number_now)
        taskconfig.block_number=block_number_now-1
        await AppDataSource.manager.save(taskconfig)
        return {start:0,end:0,taskconfig}
    }
    //计算需要获取数据的区块区间
    const start = taskconfig.block_number+1
    const end = taskconfig.block_number + taskconfig.block_nums > block_number_now - taskconfig.deviation ?
        block_number_now - taskconfig.deviation : taskconfig.block_number + taskconfig.block_nums

    return {start,end,taskconfig}
}

//获取ens数据
async function getEnsTransfers(startbolocknum, endblocknum) {
    //console.log(startbolocknum,endblocknum)
    const datas = await enscontract.queryFilter('Transfer', startbolocknum, endblocknum)
    const insertArr = []
    for (const item of datas) {
        const decodeData=decodeTopic(item)
        const entity = new Transfer()
        entity.address_from = decodeData.args[0]
        entity.address_to = decodeData.args[1]
        entity.token_id = decodeData.args[2]
        entity.blocknumber = item.blockNumber
        entity.hash = item.transactionHash

        insertArr.push(entity)
    }

    await AppDataSource.createQueryBuilder().insert().into(Transfer).values(insertArr).execute()
    //console.log(`更新插入${datas.length}条数据`)

}
async function  rollback(blocknumber) {
    //若数据量大，后期可改为少量多次删除
    await AppDataSource.createQueryBuilder()
    .delete()
    .from(Transfer)
    .where("blocknumber = :blocknumber", { blocknumber: blocknumber-1 })
    .execute()
}
 async function start(){
    const {start,end,taskconfig}=await getTaskConfig()
    if(start ==0 && end ==0){
        //数据已回滚
        return 
    }
    //获取数据
    console.log(`数据跟新开始，当前区块:${start-1},目标区块:${end}`)
    await getEnsTransfers(start,end)
    //跟新任务进度
    taskconfig.block_number=end
    await AppDataSource.manager.save(taskconfig)

    console.log(`数据跟新结束，当前区块:${end}`)
 }

export { start } 