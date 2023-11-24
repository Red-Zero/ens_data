import { DataSource } from 'typeorm';
import { getConfig } from '../getConfig/index';
import { TaskConfig } from 'src/entity/taskCongig';

const AppDataSource = new DataSource(getConfig('db'));
export async function Init() {
  //typeorm 初始化
  await AppDataSource.initialize();
  //同步任务初始化
  const taskconfig =await AppDataSource.manager.findOne(TaskConfig,{
    where:{
      task_name:'ens_data'
    }
  })
  if(!taskconfig){
    const entity=new TaskConfig()
    entity.block_number=16591691
    entity.block_nums=500
    entity.deviation=20
    entity.task_name='ens_data'
   await AppDataSource.manager.save(entity)
  }

}
export default AppDataSource;