import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Установка заголовка через переменную
  title = 'Аренда премиальных автомобилей';
  //Создаём объект формы
  priceForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/[\S]/g)]],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.pattern(/[\S]/g)]],
    car: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/[\S]/g)]],
  });

  carsData = [
    {
      image: '1.png',
      title: 'Lamborghini Huracan Spyder',
      gear: 'полный',
      engine: 5.2,
      places: 2,
    },
    {
      image: '2.png',
      title: 'Chevrolet Corvette',
      gear: 'полный',
      engine: 6.2,
      places: 2,
    },
    {
      image: '3.png',
      title: 'Ferrari California',
      gear: 'полный',
      engine: 3.9,
      places: 4,
    },
    {
      image: '4.png',
      title: 'Lamborghini Urus',
      gear: 'полный',
      engine: 4.0,
      places: 5,
    },
    {
      image: '5.png',
      title: 'Audi R8',
      gear: 'полный',
      engine: 5.2,
      places: 2,
    },
    {
      image: '6.png',
      title: 'Chevrolet Camaro',
      gear: 'полный',
      engine: 2.0,
      places: 4,
    },
  ];

  constructor(private fb: FormBuilder) {}
  //Функция обработчик события
  goScroll(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  onSubmit() {
    if (this.priceForm.valid) {
      alert('Спасибо за заявку, мы свяжемся с Вами в ближайшее время');
      this.priceForm.reset();
    }
  }
}
