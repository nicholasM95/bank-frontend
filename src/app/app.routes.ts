import {Routes} from '@angular/router';
import {OverviewComponent} from './component/overview/overview.component';
import {HomeComponent} from './component/home/home.component';
import {StatsComponent} from './component/stats/stats.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'overview', component: OverviewComponent, title: 'Overview'},
    {path: 'stats/:month', component: StatsComponent, title: 'Stats'},

    {path: '', component: HomeComponent, title: 'Home'},
    {path: '**', component: HomeComponent, title: 'Home'},
];
