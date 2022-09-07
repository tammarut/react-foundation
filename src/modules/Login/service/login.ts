function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// func requestLogin is a Gateway service (REST/GraphQL/gRPC)
export async function requestLogin(username: string, password: string) {
  await sleep(500)
  return new Promise((resolve, reject) => {
    const correct = username === 'harry' && password === '0000'
    if (!correct) {
      reject('Yoyo Backend service said Wrong username or password ')
    }
    resolve('ok')
  })
}

export type RequestLoginFunc = typeof requestLogin
