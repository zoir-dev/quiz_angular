import { Component, OnInit } from '@angular/core';
import { FaylService } from 'src/app/service/fayl.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogService } from '../../../service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogForm!: FormGroup;
  imagePreview!: string | ArrayBuffer;
  constructor(
    private faylService: FaylService,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.blogForm = this.fb.group({
      name: [''],
      description: [''],
      fileEntityId: [0],
      link: [''],
    });
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

  sendPostToBackend() {
    const formData = this.blogForm.value;

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
