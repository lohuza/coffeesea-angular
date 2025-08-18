import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [
    TranslateModule
  ]
})
export class ContactsComponent {
}
