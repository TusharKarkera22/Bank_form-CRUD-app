import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit{

  userLists : User[] = [];
  emptyList: boolean = true;
  showLoader: boolean = true;
  

  constructor( private userService:UserService , private toastr : ToastrService) { }


  ngOnInit(){
    let fetchData = this.userService.getUsersList();
    fetchData.snapshotChanges().subscribe((data) =>{
      this.userLists = [];

      if (data.length <= 0) {

        this.emptyList= true;

      } else {

        this.emptyList = false;

        data.forEach((item: any) => {

          let user = item.payload.toJSON();

          user['$key'] = item.key;

          this.userLists.push(user as User);

        });

      }
      this.showLoader = false;
    });
  }

  deleteUser(user : User){
    if(window.confirm("Are you sure you want to delete this user?")){
      if (user.$key != null){
      this.userService.deleteUser(user.$key);
      this.toastr.success('User Deleted Successfully','Success');
    }
  }
}
}

