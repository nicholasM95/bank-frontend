import {Routes} from '@angular/router';
import {OverviewComponent} from './component/overview/overview.component';
import {HomeComponent} from './component/home/home.component';
import {StatsComponent} from './component/stats/stats.component';
import {userGuard} from './guard/user.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'overview', component: OverviewComponent, title: 'Overview', canActivate: [userGuard]},
    {path: 'stats/:month', component: StatsComponent, title: 'Stats', canActivate: [userGuard]},

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'}
];
