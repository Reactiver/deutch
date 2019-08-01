import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

declare var require: any;
const deuchToRussian: Object = require('../assets/deuch-to-russian.json')

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  russianToDeuch: Object = {};
  answers: Set<string> = new Set();
  numberOfAnswers: number = 4;
  deuchWord: string;
  russianWord: string;
  isAnswered: boolean = false;
  rightAnswers: number = 0;
  allAnswers: number = 0;

  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      answer: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.createRussianToDeuch();
    this.randomize();
    this.getRandomWord();
  }

  createRussianToDeuch() {
    const keys = Object.keys(deuchToRussian)
    keys.forEach((item) => this.russianToDeuch[deuchToRussian[item]] = item)
  }

  randomize() {
    this.answers = new Set();
    while (this.answers.size < this.numberOfAnswers) {
      const randomNewWordIndex = Math.floor(
        Math.random() * Object.keys(this.russianToDeuch).length
      );
      const russianNewWord = Object.keys(this.russianToDeuch)[
        randomNewWordIndex
      ];
      const deuchNewAnswer = this.russianToDeuch[russianNewWord];
      this.answers.add(deuchNewAnswer);
    }
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.numberOfAnswers);
    this.deuchWord = Array.from(this.answers)[randomIndex];
    this.russianWord = deuchToRussian[this.deuchWord];
  }

  submit() {
    this.form.controls.answer.disable();
    this.isAnswered = true;
    this.allAnswers = this.allAnswers + 1;

    const inputAnswer = this.form.controls.answer.value;
    if (this.deuchWord === inputAnswer) {
      this.rightAnswers = this.rightAnswers + 1;
    } 
  }

  continue() {
    this.form.controls.answer.enable();
    this.form.controls.answer.reset();
    this.randomize();
    this.getRandomWord();
    this.isAnswered = false;
  }
}
