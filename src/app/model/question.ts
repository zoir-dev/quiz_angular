import { QuestionLevel } from "./questionLevel";

export interface Question{
  id:number,
  title: string,
  answer: string,
  level:QuestionLevel
}
