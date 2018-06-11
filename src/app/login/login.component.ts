import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  returnUrl: string;
  emailAddress: string;
  password: string;
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private backendService: BackendService) {}

  ngOnInit() {
      // reset login status
      this.backendService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(loginForm: NgForm) {
      // stop here if form is invalid
      this.error = '';
      if (loginForm.valid) {
        this.backendService.login(loginForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                if (error.status == 401 || error.status == 400) {
                    this.error = 'Email o Contraserña incorrectos'
                }
            });
      }

  }
}