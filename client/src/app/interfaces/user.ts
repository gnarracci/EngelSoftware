export interface User {
  id: string,
  username: string,
  name: string,
  surname: string,
  password: string,
  email: string,
  role: Array<string>,
  company: Array<string>
}
