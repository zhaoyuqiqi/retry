import sleep from "./utils/sleep";

interface RetryOptions {
  /** 重试次数  默认3次 则适配器中的逻辑一共走四次其中除去首次适配器中的执行外仍重试三次*/
  times?: number;
  /** 重试间隔时间 默认300毫秒 */
  interval?: number;
  /** 延迟多久执行第一次 默认为0*/
  delay?: number;
  /**
   * 适配器 当返回结果为true时 重试停止并走到then分之
   * remainRetryTimes 剩余重试次数
   */
  adapter: (remainRetryTimes?: number) => Promise<boolean> | boolean;
}
export async function retry(options: RetryOptions): Promise<void> {
  const {
    adapter = async () => true,
    times = 3,
    interval = 300,
    delay = 0,
  } = options;
  try {
    if (delay > 0) {
      await sleep(delay);
    }
    const ret = await adapter(times);
    if (!ret) {
      if (times >= 1) {
        if (interval) {
          await sleep(interval);
        }
        return retry({ ...options, times: times - 1 });
      } else {
        throw new Error("exceeded times");
      }
    }
  } catch {
    if (times >= 1) {
      if (interval) {
        await sleep(interval);
      }
      return retry({ ...options, times: times - 1 });
    } else {
      throw new Error("exceeded times");
    }
  }
}
export default retry;
