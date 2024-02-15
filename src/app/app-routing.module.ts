import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './auth.guard'; // Corrected import statement
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { TaskhistoryComponent } from './taskhistory/taskhistory.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { TaskanalyticsComponent } from './taskanalytics/taskanalytics.component';
import { AutherizationService } from './autherization.service';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AddtaskComponent } from './addtask/addtask.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'admin',component:AdminComponent},
  {path:'admin/addtask',component:AddtaskComponent},
  { path: 'user', component:UserComponent, canActivate: [authGuard] },
  { path: 'user/viewtask', component: ViewtaskComponent },
  { path: 'user/taskhistory', component: TaskhistoryComponent },
  { path: 'user/taskanalytics', component: TaskanalyticsComponent},
  { path: 'user/myprofile', component: MyprofileComponent },
  { path: 'user/myprofile/skills', component: SkillsComponent },
  { path: 'user/myprofile/contact', component: ContactComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
