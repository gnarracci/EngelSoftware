export interface User {
  _id: string,
  username: string,
  name: string,
  surname: string,
  password: string,
  email: string,
  role: Array<object>,
  company: Array<object>
}
