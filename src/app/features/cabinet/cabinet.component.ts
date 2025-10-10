import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CabinetSidebarComponent } from './components/cabinet-sidebar/cabinet-sidebar.component';
import { CabinetUserProfileService } from '../../core/services/cabinet/cabinet-user-profile.service';
import { Observable } from 'rxjs';
import { GetCompanyData } from '../../core/models/api.models';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, CabinetSidebarComponent],
  templateUrl: './cabinet.component.html'
})
export class CabinetComponent implements OnInit {
  private cabinetUserProfileService = inject(CabinetUserProfileService);
  profile$: Observable<GetCompanyData | null> | undefined;

  ngOnInit(): void {
    this.profile$ = this.cabinetUserProfileService.load$();
  }
}
