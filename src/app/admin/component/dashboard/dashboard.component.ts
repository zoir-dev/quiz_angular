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

  RadioButton?:HomeComponent;

  constructor(private readonly questionService: QuestionService) { }

  ngOnInit(): void {
  }

  onButtonClick(value: boolean) {
    // Disable the button after it's clicked
    this.isTestBlocked = true;

    // Call the blockTest method from the service
    this.questionService.blockTest(value).subscribe(
      (response) => {
        // Handle the response if needed
      },
      (error) => {
        // Handle errors if needed
      }
    );
  }

}
