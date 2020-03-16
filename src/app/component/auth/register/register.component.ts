import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern("([a-z]|[A-Z]|[0-9]|@|\\$|%|\\?|#|!|-){8,}")
        ])
      ],
      confirmPassword: ["", Validators.required]
    });
  }
}
