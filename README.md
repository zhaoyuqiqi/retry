# retry

当做某件事情时若结果不符合预期可以进行重试，给任何事情第二次机会

## 用法如下：

- 默认重试次数 3 次 加上首次执行共四次
- 默认重试间隔为 300ms
- 基本用法 当 adapter 的返回值为真值时 重试停止，进入 then 分支，若达到最大次数仍然为 false 会抛出 promise 异常进入 catch 分支
- adapter 会接收一个 `remainRetryTimes`表示剩余重试次数，可以用来做埋点或监控大多数用户重试多少次成功

```js
import { retry } from "retry-anything";

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
```

- 首次执行延迟 300 毫秒
- 基本用法 当 adapter 的返回值为真值时 重试停止，进入 then 分支，若达到最大次数仍然为 false 会抛出 promise 异常进入 catch 分支

```js
import { retry } from "retry-anything";

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
```

- 重试间隔设置为 1000 毫秒
- 基本用法 当 adapter 的返回值为真值时 重试停止，进入 then 分支，若达到最大次数仍然为 false 会抛出 promise 异常进入 catch 分支

```js
import { retry } from "retry-anything";

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
  }).catch(() => {
    // do something
  });
}
dosomething3();
```

- 重试间隔设置为 1000 毫秒
- 首次适配器执行延迟 300 毫秒
- 共五次重试次数，适配器最多执行 6 次（一次首次 + 5 次重试）
- 基本用法 当 adapter 的返回值为真值时 重试停止

```js
import { retry } from "retry-anything";

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
```

- 异步适配器 可以做轮询操作 可以设置最大轮询次数
- 重试间隔设置为 1000 毫秒
- 首次适配器执行延迟 300 毫秒
- 共五次重试次数，适配器最多执行 6 次（一次首次 + 5 次重试）
- 基本用法当 adapter 的返回值为真值时 重试停止，进入 then 分支，若达到最大次数仍然为 false 会抛出 promise 异常进入 catch 分支

```js
import { retry } from "retry-anything";

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
```
