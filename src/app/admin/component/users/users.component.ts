import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { DeleteDialog } from 'src/app/shared/delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];
  tahrirRejim = false;
  formOchiq = false;
  surovBajarilmoqda = false;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'username', 'password', 'amal'];
  dataSource: any;
  filter = new FormControl('filter')

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snakBar: MatSnackBar,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {

    this.loadusers();
  }

  ngOnInit(): void {


    this.userForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadusers(key?: any) {
    if (!key) {
      key = '';
    } else {
      if (typeof (key) == 'object') {
        key = key.value;
      }
      console.log(key);
    }
    this.userService.getAll({
      key: key,
      // page: this.paginator.pageIndex,
      // size: this.paginator.pageSize,
      sort: 'id'
    }).subscribe(royxat => {

      console.log(royxat);
      this.users = royxat.content

      this.length = royxat.totalElements;
    });

  }

  saqlash() {
    this.surovBajarilmoqda = true;
    let level = this.userForm.getRawValue();
    let surov;
    if (this.tahrirRejim)
      surov = this.userService.update(level);
    else
      //create
      surov = this.userService.create(level);
    this.snakBar.open("Muvaffaqiyattli amalga oshirildi", "Ok")

    surov.subscribe(data => {

      this.loadusers();
      this.surovBajarilmoqda = false;
      this.tozalash();

    }, error => {
      this.snakBar.open("Xatolik bo'ldi", "Ok")
      this.surovBajarilmoqda = false;
    })
  }

  ochirish(user: User) {
    this.dialog.open(DeleteDialog).afterClosed().subscribe(data => {
      if (data) {
        this.userService.deleteById(user.id).subscribe(data => {
          this.loadusers();
        })
      }

    })

  }

  tahrir(user: any) {
    this.tahrirRejim = true;
    this.userForm.reset(user);
    this.formOchiq = true;
  }

  tozalash() {
    this.userForm.reset({});
    this.tahrirRejim = false;
    this.formOchiq = false;
  }

  // userForm!: FormGroup;
  // tahrirRejim = false;
  // surovBajarilmoqda = false;
  // formOchiq = false;

  // displayedColumns: string[] = [
  //   'id',
  //   'name',
  //   'surname',
  //   'username',
  //   'password',
  // ];

  // dataSource: any;

  // filter = new FormControl('filter');

  // constructor(
  //   private fb: FormBuilder,
  //   private userService: userService,
  //   private snakBar: MatSnackBar,
  //   private dialog: MatDialog
  // ) { }

  // ngOnInit(): void {
  //   this.userForm = this.fb.group({
  //     id: [],
  //     name: ['', Validators.required],
  //     surname: ['', Validators.required],
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //     role: [Validators.required],
  //   });
  //   this.load();
  // }
  // load(key?: any) {
  //   if (!key) {
  //     key = '';
  //   } else {
  //     if (typeof key == 'object') {
  //       key = key.value;
  //     }
  //     console.log(key);
  //   }
  //   this.userService.getAll(key).subscribe((data) => {
  //     this.dataSource = data;
  //   });
  // }

  // saqlash() {
  //   this.surovBajarilmoqda = true;
  //   let user = this.userForm.getRawValue();
  //   let surov;
  //   if (this.tahrirRejim) surov = this.userService.update(user);
  //   else surov = this.userService.create(user);

  //   surov.subscribe(
  //     (data) => {
  //       this.tozalash();
  //       this.load();
  //       this.surovBajarilmoqda = false;
  //     },
  //     (error) => {
  //       this.snakBar.open("Xatolik ro'y berdi", 'Ok');
  //       this.surovBajarilmoqda = false;
  //     }
  //   );
  // }
  // tahrir(user: User) {
  //   this.userForm.reset(user);
  //   this.tahrirRejim = true;
  //   this.formOchiq = true;
  // }
  // ochirish(user: User) {
  //   this.dialog
  //     .open(DeleteDialog)
  //     .afterClosed()
  //     .subscribe((data) => {
  //       if (data) {
  //         this.userService.deleteById(user.id).subscribe((data) => {
  //           this.load();
  //         });
  //       }
  //     });
  // }
  // tozalash() {
  //   this.userForm.reset({});
  //   this.tahrirRejim = false;
  //   this.formOchiq = false;
  // }
}
