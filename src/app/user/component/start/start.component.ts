import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/public/auth/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { ResultsService } from 'src/app/service/results.service';
import { Results } from 'src/app/model/results';
import { QuestionLevel } from 'src/app/model/questionLevel';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
import { QuestionLevelService } from 'src/app/service/questionLevel.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  // propertys for time interval
  counter = 2;
  interval$: any;

  // propertys for statistics of the results
  marksGot = 0;
  point = 0;
  attempted = 0;

  // question's propertys
  currentQuestion: number = 0;
  questionList: any[] = [];
  questionListLength: number = 0;
  questions!: any[];
  // stopped testing
  isSubmit = false;
  results!:Results;
  questionLevel!:QuestionLevel;
  //pageable
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private locationSt: LocationStrategy,
    private questionService: QuestionService,
    private resultsService: ResultsService,
    private _auth: AuthService,
  ) { }



  load(key?: any) {
    // load selected test list
    this.questionService.getTestsByGroup().subscribe((res: any) => {
      this.questionList = res;
      this.questionListLength = res.length;
      console.log("keldi");
      console.log(this.questionList);

      this.counter = this.questionList[0].questionLevel.timer;
    });
  }

  ngOnInit(): void {
    this.load();
    this.preventBackButton();
    this.startCounter();

    console.log(this.questionList)

    this.questionService.getAll('').subscribe(data => {
      this.questions = data.content;
      console.log(this.questions , 'get')
    });
  }


  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href)
    })
  }

  nextQuestion() {
    this.plusCounter();
  }


  submitAnswer = {
    answer: '',
  };


  formSubmit() {
    this.attempted++;

    if (this.submitAnswer.answer == this.questionList[this.currentQuestion]?.answer) {
      this.point++;
      let marksSingle = 100 / this.questionListLength;
      this.marksGot += marksSingle;
      this.plusCounter();
    }
    else this.plusCounter();
  }


  submitQuiz() {
    Swal.fire({
      title: 'Testni tugatishni istaysizmi?',
      showCancelButton: true,
      confirmButtonText: 'Testni tugatish',
      denyButtonText: 'Do not submit ',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.sendResults();
      } else if (e.isDenied)
        Swal.fire('Test tugatilmadi', '', 'info');
    });
  }



  sendResults() {
    this.stopCounter();

    let result = {
      questionLevel: {
        id:this.questionList[0].questionLevel.id
      },
      attemptedQuestions: this.attempted,
      score: this.marksGot,
      point: this.point
    };

    this.isSubmit = true;

    this.resultsService.create(result).subscribe(
      (data: any) => {
        Swal.fire('Muvaffaqiyatli', 'Test muvaffaqiyatli tugatildi', 'success');
        console.log(result);

      },
      (error: any) => {
        Swal.fire('Xatolik', 'Xatolik sodir boldi', 'error');
        console.log(result);

      }
    );
  }

  startCounter() {
    setTimeout(() => {
      this.interval$ = interval(1000).subscribe(val => {
        this.counter--;
        if (this.counter == 0) {
          this.counter = 10;
          this.formSubmit();
        }
      });
    }, 1000);
  }

  plusCounter() {
    this.currentQuestion++;
    this.submitAnswer.answer = '';

    if (this.currentQuestion > this.questionListLength - 1) {
      this.sendResults();
    }
    else
      this.resetCounter();
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = this.questionList[0].questionLevel.timer;
    this.startCounter();
  }

  printPage() {
    window.print();
  }
}
