export interface User {
  id: number
  uname: string
  email: string
  score: number
  custom: string //JSON.stringify(CustomData)
}
export interface CustomData {
  level: number
  bag: [
    //TODO...
  ]
}