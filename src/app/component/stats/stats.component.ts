import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionService, TransactionStatsResponse} from '../../service/transaction';
import {Observable} from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  stats: Observable<TransactionStatsResponse> | undefined;
  isDarkMode = false;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router, private oauthService: OAuthService) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isDarkMode = event.matches;
    });

    this.route.params.subscribe(params => {
      this.getData(params['month'])
    });
  }

  public goBack() {
    this.router.navigateByUrl('overview').then(r => {
      if (!r) {
        console.error('failed to navigate to overview from stats');
      }
    });
  }

  getData(month: string) {
    this.stats = this.transactionService.getStats({month: month})
        .pipe();
  }

  logout() {
    this.oauthService.logOut();
  }

}
