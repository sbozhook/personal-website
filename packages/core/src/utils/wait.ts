export async function wait(wait: number) {
  let r = () => ({})
  await new Promise((resolve, reject) => {
    r = reject as typeof r
    setTimeout(() => {
      resolve(undefined)
    }, 500)
  })
  return {
    cancel: () => r(),
  }
}
