import { Component } from '@angular/core';
import {TransactionService} from '../../service/transaction';
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {OAuthService} from 'angular-oauth2-oidc';
import {AccountResponse, AccountService} from '../../service/account';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  chart: any;
  isDarkMode = false;
  accounts: AccountResponse[] = [];
  showSyncButton = false;

  constructor(private accountService: AccountService, private transactionService: TransactionService, private router: Router, private oauthService: OAuthService) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isDarkMode = event.matches;
    });

    Chart.register(
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        Title,
        CategoryScale,
        Tooltip,
        Legend,
        Filler
    );
    this.getAccounts();
    this.getData();
  }

  getData() {
    this.transactionService.getOverview().subscribe(data => {
      this.chart = new Chart("chart", {
        type: 'line',
        data: data,
        options: {
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index + 1;
              const newNumber = index - 14;
              const date = new Date();
              date.setMonth(date.getMonth() + newNumber);
              this.router.navigate(['stats', date.toISOString().split('T')[0]]).then(r => {
                if (!r) {
                  console.error('failed to navigate to stats from overview');
                }
              });
            }
          },
          elements: {
            line: {
              tension: 0.5
            }
          },
          scales: {
            y: {
              position: 'left',
            }
          },
          plugins: {
            legend: { display: true },
          }
        }
      });
    })
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts = accounts;
      let canSync = true;
      this.accounts.forEach(account => {
        if (account.status !== 'ACCOUNT_ACTIVE') {
          canSync = false;
        }
      });
      this.showSyncButton = canSync;
    });
  }

  getName(value: string) {
    return value.split('_')[0].toUpperCase();
  }

  sync() {
    this.accountService.sync().subscribe();
  }

  openTable() {
    this.router.navigateByUrl('table').then(r => {
      if (!r) {
        console.error('failed to navigate to table from overview');
      }
    });
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigateByUrl('home').then(r => {
      if (!r) {
        console.error('failed to navigate to home after logout');
      }
    });
  }
}
