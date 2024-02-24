import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BlogService } from "../../../service/blog.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DomSanitizer } from "@angular/platform-browser";
import { FaylService } from "../../../service/fayl.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.scss']
})
export class BloglistComponent implements OnInit {

  blogs: any[] = [];
  modalRef!: BsModalRef;
  blogForm!: FormGroup;
  imagePreview!: string | ArrayBuffer;
  tahrirRejim = false;
  formOchiq = false;
  surovBajarilmoqda = false;
  imageId = 0

  constructor(
    private readonly blogService: BlogService,
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    public readonly faylService: FaylService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private modalService: BsModalService) {}

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.createForm();
    this.imageId = this.blogForm.value.fileEntityId.id

    this.blogService.getAll('').subscribe(data => {
      this.blogs = data.content;
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
    this.blogService.getAll({
      key: key,
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {
      console.log(royxat);
      this.blogs = royxat.content;
      this.length = royxat.totalElements;
    });
  }

  deleteBlog(id: any): void {
    this.blogService.deleteById(id).subscribe(() => {
      // Refresh the blog list after deleting
      this.blogService.getAll('').subscribe(data => {
        this.blogs = data.content;
      });
    })
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createForm() {
    this.blogForm = this.fb.group({
      id: [ ],
      name: [''],
      description: [''],
      fileEntityId: [0],
      link: [''],
    });
  }


  tahrirlash(blog: any) {
    this.tahrirRejim = true;
    this.blogForm.reset(blog);
  }

  onImageChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.faylService.uploadFayl(file).subscribe((response) => {
        this.blogForm.patchValue({
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

  reset() {
    this.blogForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }

  sendPostToBackend() {
    const formData = this.blogForm.value;

    let surov;
    if (formData.id){
      surov = this.blogService.update(formData)
    }
    else {
      surov = this.blogService.create(formData)
    }

    surov.subscribe(data => {
      this.reset()
      this.loadQuestions();
      this.surovBajarilmoqda = false;
    },
      error => {
        this.snakBar.open("Xatolik ro'y berdi", "Ok");
        this.surovBajarilmoqda = false;
      })

    this.blogService.create(formData).subscribe(
      (response) => {
        console.log('Post created successfully', response);
        this.blogForm.reset();
        this.imagePreview = '';
      },
      (error) => {
        console.error('Error creating post', error);
      }
    );
  }
}
