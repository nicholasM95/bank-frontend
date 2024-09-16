import {Component} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {
    TransactionDetailTableResponse,
    TransactionQueryOverviewResponse,
    TransactionService
} from "../../service/transaction";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AssignTagDialogComponent} from "../assign-tag-dialog/assign-tag-dialog.component";
import {TagResponse, TagService} from "../../service/tag";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        NgClass,
        AsyncPipe,
        FormsModule
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent {
    isDarkMode = false;
    transactions: Observable<TransactionQueryOverviewResponse> | undefined;
    tags: TagResponse[] | undefined;
    searchText: string = '';

    constructor(private dialog: MatDialog, private tagService: TagService, private transactionService: TransactionService, private router: Router, private oauthService: OAuthService) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.isDarkMode = true;
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            this.isDarkMode = event.matches;
        });

        this.getTransactions();
        this.getTags();
        //this.oauthService.setupAutomaticSilentRefresh();

        this.oauthService.events
            .pipe(filter(e => e.type === 'token_expires'))
            .subscribe(e => {
                console.log('Access token almost expired');
                this.oauthService.silentRefresh()
                    .then(() => {
                        console.log('Access token refreshed!');
                    })
                    .catch(err => {
                        console.error('Token refresh failed:', err);
                        //this.logout()
                    });
            });
    }


    getTransactions() {
        this.transactions = this.transactionService.queryOverview({body: {page: 0, size: 900, search: this.searchText, year: [2022]}})
            .pipe();
    }

    getTags() {
        this.tagService.getAllTags()
            .subscribe(tags => {
                this.tags = tags;
            });
    }

    newTag() {

    }

    onSearchChange() {
        this.getTransactions();
    }

    openTagDialog(transaction: TransactionDetailTableResponse) {
        const dialogRef = this.dialog.open(AssignTagDialogComponent, {
            width: '400px',
            data: {'transaction': transaction, 'tags': this.tags, 'isDark': this.isDarkMode}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined && result !== '') {
                this.transactionService.assignTag({body: {transactionId: transaction.id, tagId: result}}).subscribe(data => {
                    this.getTransactions();
                });
            }
        });
    }

    public goBack() {
        this.router.navigateByUrl('overview').then(r => {
            if (!r) {
                console.error('failed to navigate to overview from table');
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
