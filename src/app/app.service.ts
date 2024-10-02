import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder, IResponseSendOrder } from './models/order.model';
import { ICar } from './models/car.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  sendQuery(data: IOrder) {
    return this.http.post<IResponseSendOrder>(
      'https://api.rootdiv.ru/itlogia/intensive-price',
      data,
    );
  }

  getData(category: string) {
    return this.http.get<ICar[]>('https://api.rootdiv.ru/itlogia/intensive-data', {
      params: { category: category },
    });
  }
}
