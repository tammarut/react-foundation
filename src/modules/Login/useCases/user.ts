import { LoginModel } from '../entity/user.entity'
import { RequestLoginFunc } from '../service/login'
import { ILoginStore } from '../store/IStore'

/*
  🚩Use cases can be defined as user stories, or features or any other external system can do with our system
*/

export class UserUseCase {
  constructor(
    private readonly loginModel: LoginModel,
    private readonly store: ILoginStore, // a.k.a Repository or State management
    private readonly requestLogin: RequestLoginFunc // a.k.a API service (server side)
  ) {}

  fillInUsername(newUsername: string) {
    const updatedUser = this.loginModel.setUsername(newUsername)
    this.store.fillInUsername(updatedUser.username)
  }

  fillInPassword(newPassword: string) {
    const updatedUser = this.loginModel.setPassword(newPassword)
    this.store.fillInPassword(updatedUser.password)
  }

  async login() {
    const user = this.store.getCurrentUser()

    try {
      await this.requestLogin(user.username, user.password)
    } catch (err) {
      console.log('err:', err)
      throw new Error('Wrong username or password❌')
    }
  }

  async logout() {
    const user = this.loginModel.reset()
    this.store.save(user)
  }
}
