export interface User {
  id: string,
  username: string,
  fullname: string,
  password: string,
  email: string,
  role: Array<string>,
  company: Array<string>
}
