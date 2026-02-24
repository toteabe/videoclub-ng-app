import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer.component/footer.component';
import { HeaderComponent } from '../header.component/header.component';

@Component({
  selector: 'app-mainlayout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './mainlayout.component.html',
  styleUrl: './mainlayout.component.scss',
})
export class MainlayoutComponent {

}
