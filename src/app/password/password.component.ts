import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  
  returnUrl: string;
  emailAddress: string;
  password: string;
  passwordCheck: string;
  error: string;

  constructor(private route: ActivatedRoute, private router: Router, private backendService: BackendService) {}

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(passwordForm: NgForm) {
      // stop here if form is invalid
      this.error = '';
      if (passwordForm.value.password == passwordForm.value.passwordCheck && passwordForm.valid) {
        this.backendService.changePassword(passwordForm.value.password)
        .subscribe(
            () => {
                    this.router.navigate(['/inicio']);
            },
            error => {
                if (error.status == 401 || error.status == 400) {
                    this.error = 'Contraserña incorrecta'
                }
            });
            this.router.navigate(['/inicio']);
      } else {
        this.error = 'Debes ingresar la misma contraseña';
      }

  }
}