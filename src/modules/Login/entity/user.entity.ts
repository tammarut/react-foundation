/*
  🎯 Domain model = An object model of the domain that incorporates both data and behavior
*/

// User is like a Entity (data shape)
export interface User {
  username: string
  password: string
}
/*
 ⛑️ Behaviors on entity
contain the business rules that the counter value can not go under 0
*/

export class LoginModel {
  constructor(private user: User) {}

  setUsername(newUsername: string) {
    // if (!newUsername) {
    //   throw new Error('Username can not empty')
    // }

    // if (newUsername.length < 3) {
    //   throw new Error('Username must be longer than 2 characters')
    // }

    this.user.username = newUsername
    return this.user
  }

  setPassword(newPassword: string) {
    // if (!newPassword) {
    //   throw new Error('Password can not empty')
    // }
    // if (newPassword.length < 3) {
    //   throw new Error('Password must be longer than 2 characters')
    // }

    // const onlyNumeric = /[0-9]/
    // if (!newPassword.match(onlyNumeric)) {
    //   throw new Error('Password must be only number')
    // }
    this.user.password = newPassword
    return this.user
  }

  reset() {
    this.user.username = ''
    this.user.password = ''
    return this.user
  }
}

export function NewLoginModel(username: string, password: string) {
  return new LoginModel({ username, password })
}
