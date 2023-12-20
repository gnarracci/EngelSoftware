export interface User {
  id: number,
  username: string,
  password: string,
  email?: string,
  role?: Array<string>,
  company?: Array<string>
}
