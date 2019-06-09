import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  appinessUserData;

  constructor() { }

  getUserDataFromLocalSt(){
    this.appinessUserData = JSON.parse(localStorage.getItem('appinessUserData')) || [];
  }

  ngOnInit() {
    this.getUserDataFromLocalSt()
  }

}
