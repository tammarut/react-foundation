import { useReducer } from 'react'
import { User } from '../entity/user.entity'
import { ILoginStore } from './IStore'

type ReducerState = Pick<
  ILoginStore,
  'username' | 'password' | 'isLoading' | 'isLoggedIn' | 'errorMessage'
>

const initialState: ReducerState = {
  username: '',
  password: '',
  isLoading: false,
  isLoggedIn: false,
  errorMessage: '',
}

type ACTION_TYPE =
  | {
      type: 'field'
      payload: {
        field: 'username' | 'password'
        value: string
      }
    }
  | { type: 'logout'; payload: User }
  | { type: 'failed'; failedReason: string }
  | { type: 'loggingIn' | 'successful' }

function loginReducer(state: ReducerState, action: ACTION_TYPE): ReducerState {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }
    }

    case 'loggingIn': {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      }
    }

    case 'successful': {
      return { ...state, isLoading: false, isLoggedIn: true }
    }

    case 'failed': {
      return {
        ...state,
        errorMessage: action.failedReason,
        isLoading: false,
        isLoggedIn: false,
        password: '',
      }
    }

    case 'logout': {
      return {
        ...state,
        isLoggedIn: false,
        username: action.payload.username,
        password: action.payload.password,
      }
    }

    default:
      return state
  }
}

// We could use any libraries: Redux, Mobx, Zustand, Recoil or React hooks(built-in)
export function NewReducerStoreAdapter(): ILoginStore {
  const [state, dispatch] = useReducer(loginReducer, initialState)

  const fillInUsernameFunc = (newUsername: string) =>
    dispatch({ type: 'field', payload: { field: 'username', value: newUsername } })

  const fillInPasswordFunc = (newPassword: string) =>
    dispatch({ type: 'field', payload: { field: 'password', value: newPassword } })

  const getUserStateFunc = () => {
    return { username: state.username, password: state.password }
  }

  return {
    username: state.username,
    password: state.password,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    errorMessage: state.errorMessage,
    fillInUsername: fillInUsernameFunc,
    fillInPassword: fillInPasswordFunc,
    getCurrentUser: getUserStateFunc,
    loggingIn: () => dispatch({ type: 'loggingIn' }),
    logInSuccessful: () => dispatch({ type: 'successful' }),
    logInFailed: (failedReason) => dispatch({ type: 'failed', failedReason: failedReason }),
    save: (user) => dispatch({ type: 'logout', payload: user }),
  }
}
