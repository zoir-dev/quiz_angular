import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private questionService: QuestionService) {
    // load all questions
    questionService.loadAllTests();

    // examples
    questionService.setTestsByGroup('A Guruh');

    // questionService.getTestsByGroup().subscribe(res => console.log(res));
  }

  ngOnInit(): void {
    console.log('userComponent')
  }

}
