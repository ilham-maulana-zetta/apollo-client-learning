import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  schools: any;

  displayedColumns: string[] = ['no', 'long_name', 'short_name', 'status'];
  dataSource: any

  constructor(
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.getSchoolsList();
  }

  getSchoolsList() {
    this.subs.sink = this.schoolService.getSchools().subscribe(resp => {
      this.formatTitlesData(resp);
    })
  }

  formatTitlesData(data: any) {
    this.schools = data.data.GetAllSchools;
    this.dataSource = this.schools
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  parseNo(i: any){
    return i + 1
  }

}
