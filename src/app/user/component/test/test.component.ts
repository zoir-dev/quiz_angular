import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/public/auth/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionLevelService } from 'src/app/service/questionLevel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  authStatus: boolean = false;

  questionLevels: any[] = [];
  questions!: any[];
  tahrirRejim = false;

  displayedColumns: string[] = ['id', 'level', 'info', 'amal'];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationSt: LocationStrategy,
    private questionLevelservice: QuestionLevelService,
    private questionService: QuestionService,) { }

  ngOnInit(): void {
    this.loadQuestionLevels();
    this.route.params.subscribe((params) => {
      console.log(params);
    })

    this.questionService.getAll('').subscribe(data => {
      this.questions = data.content;
    });

    this.preventBackButton();
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href)
      // this.router.navigate(['/home']);
    })
  }

  loadQuestionLevels(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);


    }
    this.questionLevelservice.getAll({
      key: key,
      // page: this.paginator.pageIndex,
      // size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.questionLevels = royxat.content;

      // this.length = royxat.totalElements;
    });
  }

  startQuiz(groupName: any) {
    // set tests by selected Level
    this.questionService.setTestsByGroup(groupName);

    Swal.fire({
      title: 'Testni boshlashni istaysizmi?',
      showCancelButton: true,
      confirmButtonText: 'Boshlash',
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/user/start']);
      } else if (result.isDenied) {
        Swal.fire('Test boshlanmadi', '', 'info')
      }
    })
  }


}
