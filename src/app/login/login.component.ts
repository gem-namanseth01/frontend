import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private getDataService: GetDataService
  ) {
    this.username = '';
    this.password = '';
    this.data = [];
  }
  arr = JSON.parse(localStorage.getItem('arr1') || '[]');

  username: string;
  password: string;
  data: any;
  saveData: any;
  login = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  flag: boolean = false;

  onSubmit() {
    var req = {
      method: 'POST',
      url: 'http://localhost:8000/login',
      data: JSON.stringify(this.login.value),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.data, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
        this.saveData = res.user;
        this.getDataService.getLoggedData(this.saveData);
        if (res.bool) {
          console.log(res);
          swal.fire({
            title: 'Submit',
            text: 'Logged In Successfully',
            icon: 'success',
          });
        } else {
          swal.fire({
            title: 'Try Again',
            text: 'Invalid Credentials',
            icon: 'error',
          });
          console.log('Invalid');
        }
      });
  }

  ngOnInit(): void {}
}
