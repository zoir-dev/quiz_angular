import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionLevelService } from 'src/app/service/questionLevel.service';
import { ResultsService } from 'src/app/service/results.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultsForm!: FormGroup;
  results: any;

  questionLevels!: any[];


  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private resultsService: ResultsService,
    private router: Router,
    private questionLevelService: QuestionLevelService,
  ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.loadQuestionLevels();

    this.resultsService.getAll('').subscribe(data => {
      this.results = data.content;
    });
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
    this.questionLevelService.getAll({
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

  seeResults() {

    Swal.fire({
      title: "Natijalarni ko'rmoqchimisiz?",
      showCancelButton: true,
      confirmButtonText: "Ko'rish",
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/admin/view-results']);
      } else if (result.isDenied) {
        Swal.fire("Sahifa o'zgarmadi", '', 'info')
      }
    })
  }

}
