import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FirebaseAPIService {

  constructor(private db: AngularFireDatabase) { }

  getGreeting() {
    return this.db.object('/greeting/').valueChanges();
  }
}
