import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { BookLibraryComponent } from './book-library/book-library.component';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RoomComponent } from './room/room.component';
export const routes: Routes = [
  { path: '', component:HomeComponent },  // Base path for index.html (AppComponent)
  { path: 'login', component: LoginComponent },  // Route for login
  {path:'Home',component:BookLibraryComponent},
  {path:'addbook',component:AddBookComponent},
  {path:'room',component:RoomComponent}
];
