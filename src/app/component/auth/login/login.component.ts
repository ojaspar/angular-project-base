import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required])]
    });
  }
  login() {
    const email = this.loginForm.value["email"],
      password = this.loginForm.value["password"];
  }
}
