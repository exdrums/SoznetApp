import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @Output() closeLogin = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group(
      {
      username: ['', Validators.required],
      password: ['', Validators.required]
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(data => {
        this.closeLogin.emit();
        this.alertify.success('logged in succesfully');
      }, error => {
        this.alertify.error('Failed to login');
      }, () => {
        this.router.navigate(['/members']);
      });
    }
  }
}
