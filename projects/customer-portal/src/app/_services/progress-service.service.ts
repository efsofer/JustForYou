import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private index = new BehaviorSubject(0);
  sharedIndex = this.index.asObservable();

  constructor() { }


  getCurrentIndex(): Observable<number> {
    return this.index.asObservable();
  }

  skip(index: number) {
    this.index.next( index );
  }

  back(index: number) {
    this.index.next( index );
  }

  next(index: number) {
    this.index.next( index );
  }

  goToStep(index: number) {
    this.index.next( index );
  }


}
