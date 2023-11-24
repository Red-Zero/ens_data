import * as schedule from "node-schedule";
//dayOfWeek
//month
//dayOfMonth
//hour
//minute
//second
let timer = {
  job: {},
  run: (option, fun) => {
    timer.job = schedule.scheduleJob(option, fun);
  },
};
export default timer;