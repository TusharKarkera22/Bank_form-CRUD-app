import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'',redirectTo:'form' ,pathMatch:'full'},
  {path:'form', component:CreateUserComponent},
  {path:'list', component:ListUserComponent},
  {path:'edit/:id', component:EditUserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
