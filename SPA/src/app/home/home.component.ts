import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MDBModalRef } from '../../../node_modules/angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // registerMode = false;
  // @ViewChild('registerModal')
  // registerModal: any;

  values: any;

constructor(private http: Http) { }

  ngOnInit() {
    // this.getValues();
    // this.registerModal.show();
  }

  registerToggle() {
    // this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    // this.registerMode = registerMode;
  }

// demonstration method
  getValues() {
    this.http.get('https://localhost:5001/api/values')
    .subscribe(response => {
      this.values = response.json();
    });
  }
}
