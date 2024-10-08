import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { ICar } from './models/car.model';
import { IResponseSendOrder } from './models/order.model';

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
    name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/[\S]/g)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/[\S]/g)]],
    car: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/[\S]/g)]],
  });

  carsData: ICar[] = [];

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => (this.carsData = carsData));
  }

  //Функция обработчик события
  goScroll(target: HTMLElement, car?: ICar) {
    target.scrollIntoView({ behavior: 'smooth' });
    if (car) {
      this.priceForm.patchValue({ car: car.name });
    }
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

  transform: { transform: string } | undefined;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.transform = {
      transform: `translate3d(${(event.clientX * 0.4) / 7}px, ${(event.clientY * 0.4) / 7}px, 0px)`,
    };
  }

  bgPos: { backgroundPositionX: string } | undefined;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = { backgroundPositionX: '0' + 0.5 * window.scrollY + 'px' };
  }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService.sendQuery(this.priceForm.value).subscribe({
        next: (response: IResponseSendOrder) => {
          alert(response.message);
          this.priceForm.reset();
        },
        error: (response: IResponseSendOrder) => {
          alert(response.error.message);
        },
      });
    }
  }
}
