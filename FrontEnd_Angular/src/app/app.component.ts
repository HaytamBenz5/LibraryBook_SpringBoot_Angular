import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule], // <-- Include FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fixed typo: use "styleUrls"
})
export class AppComponent {
  title = 'LibraryBooks';
}
