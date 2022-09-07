import { useCallback, useMemo } from 'react'
import { NewLoginModel } from '../entity/user.entity'
import { requestLogin } from '../service/login'
import { ILoginStore } from '../store/IStore'
import { UserUseCase } from '../useCases/user'

/*
  useLogin is like a Controllers/Presenters/Gateways
it encapsulate "UseCase" layer, UI layer can call this layer
*/

export function useLogin(store: ILoginStore) {
  const myLoginModel = NewLoginModel('', '')
  const userUseCase = useMemo(() => {
    return new UserUseCase(myLoginModel, store, requestLogin)
  }, [myLoginModel, store])

  const fillInUsernameFunc = useCallback(
    (newUsername: string) => {
      return userUseCase.fillInUsername(newUsername)
    },
    [userUseCase]
  )

  const fillInPasswordFunc = useCallback(
    (newPassword: string) => {
      return userUseCase.fillInPassword(newPassword)
    },
    [userUseCase]
  )

  const loginFunc = useCallback(() => {
    store.loggingIn()
    // await userUseCase.login()
    return userUseCase
      .login()
      .then(() => store.logInSuccessful())
      .catch((failedReason: Error) => {
        console.log('failedReason:', failedReason.message)
        store.logInFailed(failedReason.message)
      })
  }, [userUseCase, store])

  const logoutFunc = () => {
    userUseCase.logout()
  }

  return {
    // State
    username: store.username,
    password: store.password,
    isLoading: store.isLoading,
    isLoggedIn: store.isLoggedIn,
    errorMessage: store.errorMessage,

    // Action
    fillInUsername: fillInUsernameFunc,
    fillInPassword: fillInPasswordFunc,
    login: loginFunc,
    logout: logoutFunc,
  }
}
