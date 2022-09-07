import { useLogin } from './hook/useLogin'
import { NewReducerStoreAdapter } from './store/useReducer.adapter'
import './style.css'

function Login() {
  const reducerStoreAdapter = NewReducerStoreAdapter()
  const {
    username,
    password,
    isLoading,
    isLoggedIn,
    errorMessage,
    fillInUsername,
    fillInPassword,
    login,
    logout,
  } = useLogin(reducerStoreAdapter)

  return (
    <section>
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome Harry</h1>
            <button role="button" onClick={() => logout()}>
              {' '}
              Log out
            </button>
          </>
        ) : (
          <form
            className="form"
            onSubmit={async (event) => {
              event.preventDefault()
              await login()
            }}
          >
            <p role="banner">Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => {
                const username = event.currentTarget.value
                fillInUsername(username)
              }}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                const password = event.currentTarget.value
                fillInPassword(password)
              }}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button role="button" className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Login
