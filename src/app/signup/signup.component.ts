import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { User } from 'src/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  validateEmail(emails: any) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(emails.value)
      ? null
      : emails;
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router
  ) {}

  signUp = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', Validators.required, this.validateEmail],
      password: ['', Validators.required, Validators.minLength(8)],
    },
    { updateOn: 'onSubmit' }
  );

  onSubmit() {
    var req = {
      method: 'POST',
      url: 'http://localhost:8000/signup',
      data: JSON.stringify(this.signUp.value),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.data, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
      });
    this.route.navigate(['/login']);
  }

  ngOnInit() {}
}
