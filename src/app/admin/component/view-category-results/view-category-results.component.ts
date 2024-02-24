import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from 'src/app/service/results.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category-results',
  templateUrl: './view-category-results.component.html',
  styleUrls: ['./view-category-results.component.css']
})
export class ViewCategoryResultsComponent implements OnInit {
  results!: any;
  users!:any;

  resultsList: any[] = [];
  resultsListLength: number = 0;
  id:any;

  length = 100;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.resultsService.getById(this.id).subscribe(data => {
      this.results = data;
      console.log(data);
    });

    this.userService.getAll('').subscribe(data => {
      this.users = data.content;
    });
  }




}
