import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/public/home/home/home.component';
import {QuestionService} from "../../../service/question.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isTestBlocked: boolean = false;

  constructor(private readonly questionService: QuestionService) { }

  ngOnInit(): void {
    // Retrieve the checkbox state from local storage on component initialization
    const storedCheckboxState = localStorage.getItem('blockTestCheckboxState');
    this.isTestBlocked = storedCheckboxState === 'true';
  }



  onCheckboxChange() {
    localStorage.setItem('blockTestCheckboxState', this.isTestBlocked.toString());
    this.questionService.blockTest(this.isTestBlocked).subscribe(
      (response) => {
      },
      (error) => {
      }
    );
  }

}
