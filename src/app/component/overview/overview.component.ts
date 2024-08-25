import { Component } from '@angular/core';
import {TransactionService} from '../../service';
import {
  CategoryScale,
  Chart,
  ChartConfiguration,
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

  constructor(private transactionService: TransactionService, private router: Router) {
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
}
