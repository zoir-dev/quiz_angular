import { QuestionLevel } from "./questionLevel";
import { User } from "./user";

export interface Results {
  id: number,
  point: string,
  score: number,
  attemptedQuestions: number,
  date: Date,
  user: User,
  name: string,
  surname: string,
  questionLevel: QuestionLevel,
}

