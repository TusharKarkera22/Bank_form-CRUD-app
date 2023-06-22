import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  userLists: User[] = [];
  emptyList: boolean = true;
  showLoader: boolean = true;

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    this.userService.getUsersList().subscribe((data: DocumentChangeAction<User>[]) => {
      this.userLists = [];

      if (data.length <= 0) {
        this.emptyList = true;
      } else {
        this.emptyList = false;

        data.forEach((item: DocumentChangeAction<User>) => {
          const user = item.payload.doc.data() as User;
          user.$key = item.payload.doc.id;
          this.userLists.push(user);
        });
      }

      this.showLoader = false;
    });
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      if (user.$key != null) {
        this.userService.deleteUser(user.$key).then(() => {
          this.toastr.success('User Deleted Successfully', 'Success');
        }).catch((error) => {
          this.toastr.error('Error: ' + error.message, 'Failed to delete user');
        });
      }
    }
  }
}
