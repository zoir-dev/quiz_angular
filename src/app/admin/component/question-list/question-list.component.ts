import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FaylService } from '../../../service/fayl.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  public Editor: any = ClassicEditor;
  questionForm!: FormGroup;
  questions: any[] = [];
  questionLevels!: any[];
  tahrirRejim = false;
  formOchiq = false;
  modalRef!: BsModalRef;
  imagePreview!: string | ArrayBuffer;

  surovBajarilmoqda = false;
  imageId: any;

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    public readonly faylService: FaylService,
    private modalService: BsModalService,
    private questionService: QuestionService,
    private questionLevelService: QuestionLevelService,
    private snakBar: MatSnackBar,
    private route: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.loadQuestions();
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      answer: ['', Validators.required],
      questionLevelId: ['', Validators.required],
      fileEntityId: [''],
    });

    this.questionLevelService.getAll('').subscribe((data) => {
      this.questionLevels = data.content;
    });
  }

  loadQuestions(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof key == 'object') {
        key = key.value;
      }
    }
    this.questionService
      .getAll({
        key: key,
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: 'id',
      })
      .subscribe((royxat) => {
        // console.log(royxat);
        this.questions = royxat.content;
        console.log(royxat);

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

  saqlash() {
    this.surovBajarilmoqda = true;
    let question = this.questionForm.getRawValue();
    const id = question.id;
    question.questionLevelId == question.questionLevelId;

    delete question.id;
    let surov;
    if (this.tahrirRejim) {
      surov = this.questionService.update(id, question);
      // this.questionForm.patchValue({
      //   questionLevelId: question.questionLevelId
      // });
    } else surov = this.questionService.create(question);

    surov.subscribe(
      (data) => {
        this.tozalash();
        this.loadQuestions();
        this.surovBajarilmoqda = false;

        this.modalRef.hide();
      },
      (error) => {
        this.snakBar.open("Xatolik ro'y berdi", 'Ok');
        this.surovBajarilmoqda = false;
      }
    );
  }

  ochirish(question: Question) {
    this.dialog
      .open(DeleteDialog)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.questionService.deleteById(question.id).subscribe((data) => {
            this.loadQuestions();
          });
        }
      });
  }

  tahrirlash(question: any) {
    console.log(question, 'log12');
    this.imageId = question.fileEntity.id;
    console.log(this.imageId, 'imgId');

    setTimeout(() => {
      this.tahrirRejim = true;
      this.questionForm.reset(question);
      this.formOchiq = true;
    }, 500);
  }

  tozalash() {
    this.questionForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;

    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
