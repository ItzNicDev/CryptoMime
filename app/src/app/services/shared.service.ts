// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private someValueSubject = new BehaviorSubject<any>('');
  someValue$ = this.someValueSubject.asObservable();

  setSomeValue(value: any) {
    this.someValueSubject.next(value);
  }
}
