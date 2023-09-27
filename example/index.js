import { retry } from "retry";

/**
 * 默认重试次数3次 加上首次执行共四次
 * 默认重试间隔为300ms
 * 基本用法 当adapter的返回值为真值时 重试停止，进入then分支，若达到最大次数仍然为false会抛出promise异常进入catch分支
 */
async function dosomething1() {
  await retry({
    adapter: (remainRetryTimes) => {
      try {
        console.log("remainRetryTimes:", remainRetryTimes);
        return Math.random() > 0.5;
      } catch {
        return false;
      }
    },
  }).catch(() => {
    // 这里是重试达到最大次数的分支
  });
}
dosomething1();

/**
 * 首次执行延迟300毫秒
 * 基本用法 当adapter的返回值为真值时 重试停止，进入then分支，若达到最大次数仍然为false会抛出promise异常进入catch分支
 */
async function dosomething2() {
  await retry({
    delay: 300,
    adapter: (remainRetryTimes) => {
      try {
        console.log("remainRetryTimes:", remainRetryTimes);
        return Math.random() > 0.5;
      } catch {
        return false;
      }
    },
  }).catch((e) => {
    // 这里是重试达到最大次数的分支
  });
}
dosomething2();

/**
 * 重试间隔设置为1000毫秒
 * 基本用法 当adapter的返回值为真值时 重试停止，进入then分支，若达到最大次数仍然为false会抛出promise异常进入catch分支
 */
async function dosomething3() {
  await retry({
    interval: 1000,
    adapter: (remainRetryTimes) => {
      try {
        console.log("remainRetryTimes:", remainRetryTimes);
        return Math.random() > 0.5;
      } catch {
        return false;
      }
    },
  });
}
dosomething3();

/**
 * 重试间隔设置为1000毫秒
 * 首次适配器执行延迟300毫秒
 * 共五次重试次数
 * 基本用法 当adapter的返回值为真值时 重试停止
 */
async function dosomething4() {
  await retry({
    times: 5,
    interval: 1000,
    delay: 300,
    adapter: (remainRetryTimes) => {
      try {
        console.log("remainRetryTimes:", remainRetryTimes);
        return Math.random() > 0.5;
      } catch {
        return false;
      }
    },
  });
}
dosomething4();

/**
 * 异步适配器 可以做轮询操作 可以设置最大轮询次数
 * 重试间隔设置为1000毫秒
 * 首次适配器执行延迟300毫秒
 * 共五次重试次数
 * 基本用法 当adapter的返回值为真值时 重试停止，进入then分支，若达到最大次数仍然为false会抛出promise异常进入catch分支
 */
async function dosomething4() {
  await retry({
    times: 5,
    interval: 1000,
    delay: 300,
    adapter: async (remainRetryTimes) => {
      try {
        console.log("remainRetryTimes:", remainRetryTimes);
        // 也可以在这里发请求如下
        const res = await fetch("https://xxxxxxxxxxxxxxxx");
        const ret = await res.json();
        return ret.code === 100;
      } catch {
        return false;
      }
    },
  });
}
dosomething4();
