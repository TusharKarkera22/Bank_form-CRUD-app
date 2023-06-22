import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  insertUser(user: User): Promise<DocumentReference<User>> {
    return this.usersCollection.add(user);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.usersCollection.doc<User>(id).valueChanges();
  }

  getUsersList(): Observable<DocumentChangeAction<User>[]> {
    return this.usersCollection.snapshotChanges();
  }

  updateUser(id: string, userData: User) {
    return this.firestore
      .collection('users')
      .doc(id)
      .update(userData);
  }
  

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
