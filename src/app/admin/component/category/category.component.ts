import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { QuestionLevelService } from 'src/app/service/questionLevel.service';
import { QuestionLevel } from 'src/app/model/questionLevel';

@Component({
  selector: 'app-level',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  questionLevelForm!: FormGroup;
  questionLevels: any[] = [];
  tahrirRejim = false;
  formOchiq = false;
  modalRef!: BsModalRef;
  surovBajarilmoqda = false;

  displayedColumns: string[] = ['id', 'level', 'info', 'timer', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private questionLevelservice: QuestionLevelService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {

    this.loadQuestionLevels();
  }

  ngOnInit(): void {


    this.questionLevelForm = this.fb.group({
      id: [],
      level: ['', Validators.required],
      info: ['', Validators.required],
      timer: ['', Validators.required]
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
    this.questionLevelservice.getAll({
      key: key,
      // page: this.paginator.pageIndex,
      // size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.questionLevels = royxat.content

      this.length = royxat.totalElements;
    });

  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let level = this.questionLevelForm.getRawValue();
    let surov;
    if (this.tahrirRejim)
      surov = this.questionLevelservice.update(level);
    else
      //create
      surov = this.questionLevelservice.create(level);
    this.snakBar.open("Muvaffaqiyattli amalga oshirildi", "Ok")

    surov.subscribe(data => {

      this.loadQuestionLevels();
      this.surovBajarilmoqda = false;
      this.tozalash();

    }, error => {
      this.snakBar.open("Xatolik bo'ldi", "Ok")
      this.surovBajarilmoqda = false;
    })
  }

  ochirish(level: QuestionLevel) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.questionLevelservice.deleteById(level.id).subscribe(data => {
          this.loadQuestionLevels();
        })
      }

    })

  }

  tahrirlash(level: any) {
    this.tahrirRejim = true;
    this.questionLevelForm.reset(level);
    this.formOchiq = true;
  }

  tozalash() {
    this.questionLevelForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
