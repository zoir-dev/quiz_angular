import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Question } from 'src/app/model/question';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';
import { QuestionService } from 'src/app/service/question.service';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionForm!: FormGroup;
  tahrirRejim = false;
  surovBajarilmoqda = false;
  formOchiq = false;
  questions: any[] = [];

  displayedColumns: string[] = ['id', 'title', 'answer', 'level', 'amal'];
  dataSource: any;
  expandedElement: any;
  filter = new FormControl('filter');

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.load());

    this.load();
  }

  ngOnInit(): void {
    this.load();

    this.questionForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      answer: ['', Validators.required],
      level: ['', Validators.required]
    });



  }
  load(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);
    }
    this.questionService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.questions = royxat.content;
      console.log(royxat.content, ' questions')

      this.length = royxat.totalElements;
    });

  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let question = this.questionForm.getRawValue();
    let surov;
    if (this.tahrirRejim)
      surov = this.questionService.update(question.id, question);
    else
      surov = this.questionService.create(question);


    surov.subscribe(data => {
      this.tozalash();
      this.load();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })

  }
  tahrir(question: Question) {
    let s = Object.create(question);
    this.questionForm.reset(s);
    this.tahrirRejim = true;
    this.formOchiq = true;
  }
  ochirish(question: Question) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.questionService.deleteById(question.id).subscribe(data => {
          this.load();
        })
      }

    })

  }
  tozalash() {
    this.questionForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }
}
