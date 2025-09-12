export async function wait(wait: number, cb?: () => void) {
  const r = () => ({})
  let ping = 0
  let lastTs = 0
  const castWait = async (resolve: (value: unknown) => void, ts: number) => {
    requestAnimationFrame((ts) => {
      if (ts <= wait) {
        ping = ts - lastTs
        lastTs = ts
        return castWait(resolve, ts)
      }
      resolve(undefined)
    })
    await new Promise((resolve) => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (ping < 50) {
            resolve(undefined)
            if (cb) {
              cb()
            }
          }
          else {
            setTimeout(resolve, wait - ping)
          }
        })
      }, wait)
    })
    castWait(resolve, wait)
  }
  await new Promise((resolve) => {
    requestAnimationFrame(ts => castWait(resolve, ts))
  })
  return {
    cancel: () => r(),
  }
}
