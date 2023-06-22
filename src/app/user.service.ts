import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from '@angular/fire/compat/database';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listUsersRef!:AngularFireList<User>
  userRef!: AngularFireObject<User>;

  constructor(private db:AngularFireDatabase) {

    this.listUsersRef = db.list('list');
    this.userRef = db.object('list/'+0);
   }

   insertUser(user:User){
    this.listUsersRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address1: user.address1,
      address2: user.address2,
      gender: user.gender,
      martialStatus: user.martialStatus,
      branch: user.branch,
      code: user.code,
      employmentStatus: user.employmentStatus,
      accountDate:  user.accountDate,
    });

   }

   getUserById(id:string):AngularFireObject<User>{
    this.userRef = this.db.object('list/'+id);
    return this.userRef;
   }

   getUsersList():AngularFireList<User>{
    return this.listUsersRef;
   }

   updateUser(user : User){
    this.userRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address1: user.address1,
      address2: user.address2,
      gender: user.gender,
      martialStatus: user.martialStatus,
      branch: user.branch,
      code: user.code,
      employmentStatus: user.employmentStatus,
      accountDate:  user.accountDate,
    });

   }

   deleteUser(id:String){
    this.userRef = this.db.object('list/'+id);
    this.userRef.remove();


   }


  



}
