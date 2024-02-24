
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';
import { QuestionLevelService } from 'src/app/service/questionLevel.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FaylService} from "../../../service/fayl.service";

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  public Editor:any = ClassicEditor;
  questionForm!: FormGroup;
  questions: any[] = [];
  questionLevels!: any[];
  tahrirRejim = false;
  formOchiq = false;
  imagePreview!: string | ArrayBuffer;

  surovBajarilmoqda = false;
  displayedColumns: string[] = ['id', 'title', 'answer', 'questionLevel', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private questionLevelService: QuestionLevelService,
    private snakBar: MatSnackBar,
    private route: Router,
    private dialog: MatDialog,
    private faylService: FaylService,) { }
  ngAfterViewInit(): void {

    this.loadQuestions();
  }

  ngOnInit(): void {


    this.questionForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      answer: ['', Validators.required],
      questionLevelId: ['', Validators.required],
      fileEntityId: [0],
    });

    this.questionLevelService.getAll('').subscribe(data => {
      this.questionLevels = data.content;
    })
  }

  loadQuestions(key?: any) {
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
      // page: this.paginator.pageIndex,
      // size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.questions = royxat.content;

      this.length = royxat.totalElements;
    });
  }

  onImageChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.faylService.uploadFayl(file).subscribe((response) => {
        this.questionForm.patchValue({
          fileEntityId: response.id,
        });

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // saqlash() {
  //   this.surovBajarilmoqda = true;
  //   let question = this.questionForm.getRawValue();
  //   question.questionLevel = {
  //     id: question.questionLevel
  //   }
  //   let surov;
  //   if (this.tahrirRejim)
  //     surov = this.questionService.update(question);
  //   else
  //     surov = this.questionService.create(question);
  //
  //
  //   surov.subscribe(data => {
  //     this.tozalash();
  //     this.loadQuestions();
  //     this.surovBajarilmoqda = false;
  //   },
  //     error => {
  //       this.snakBar.open("Xatolik ro'y berdi", "Ok");
  //       this.surovBajarilmoqda = false;
  //     })
  //
  //     // this.route.navigate(['/user/test'], {queryParams:{data:question.title}})
  // }
  // ochirish(question: Question) {
  //   this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
  //     if (data) {
  //       this.questionService.deleteById(question.id).subscribe(data => {
  //         this.loadQuestions();
  //       })
  //     }
  //
  //   })
  //
  // }


  saqlash() {
    this.surovBajarilmoqda = true;
    let question = this.questionForm.getRawValue();

    // Remove the 'id' property from the question object
    delete question.id;

    question.questionLevel = {
      id: question.questionLevel
    };

    let surov;
    if (this.tahrirRejim)
      surov = this.questionService.update(question);
    else
      surov = this.questionService.create(question);

    surov.subscribe(
      data => {
        this.tozalash();
        this.loadQuestions();
        this.surovBajarilmoqda = false;
      },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      }
    );
  }


  tahrirlash(question: any) {
    this.tahrirRejim = true;
    this.questionForm.reset(question);
    this.formOchiq = true;
  }

  tozalash() {
    this.questionForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }

}
