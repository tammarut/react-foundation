import { User } from '../entity/user.entity'

/*
  ILoginStore is like a DataStore (a.k.a repository)
it's a abstraction for state management for our data access layer (not the implementation ❌)
*/
export interface ILoginStore {
  // ———— State ————
  username: string
  password: string
  isLoading: boolean
  isLoggedIn: boolean
  errorMessage: string

  // ———— Actions ————
  fillInUsername(username: string): void
  fillInPassword(newPassword: string): void
  getCurrentUser(): User
  loggingIn(): void
  logInSuccessful(): void
  logInFailed(failedReason: string): void
  save(user: User): void
}
