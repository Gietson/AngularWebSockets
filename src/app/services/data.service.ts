import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';

@Injectable()
export class DataService {
  private url = 'http://localhost:8080';
  private socket;
  observer: Observer<number>;

  getMessages(): Observable<number> {
    this.socket = io.connect(this.url);

    this.socket.on('data',
      (res) => {
        this.observer.next(res.data);
      });
    return this.createObservable();
  }

  createObservable(): Observable<number> {
    return Observable.create((observer: Observer<number>) => {
      this.observer = observer;
    });
  }
}
