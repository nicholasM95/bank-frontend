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
import {NewTagDialogComponent} from "../new-tag-dialog/new-tag-dialog.component";

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
    tagFilter: string[] = [];
    yearFilter: number[] = [];
    page: number = 0;
    size: number = 50;

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
        this.transactions = this.transactionService.queryOverview({body: {page: this.page, size: this.size, search: this.searchText, tags: this.tagFilter, year: this.yearFilter}})
            .pipe();
    }

    getTags() {
        this.tagService.getAllTags()
            .subscribe(tags => {
                this.tags = tags;
            });
    }

    onSearchChange() {
        this.getTransactions();
    }

    openAssignTagDialog(transaction: TransactionDetailTableResponse) {
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

    openNewTagDialog() {
        const dialogRef = this.dialog.open(NewTagDialogComponent, {
            width: '400px',
            data: {'isDark': this.isDarkMode}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined && result.name !== '' && result.description !== '') {
                this.tagService.createTag({body: {name: result.name, description: result.description}}).subscribe(data => {
                    this.getTags();
                });
            }
        });
    }

    isFiltered(tag: string) {
        return this.tagFilter.includes(tag);
    }

    toggleTag(tag: string) {
        if (this.isFiltered(tag)) {
            this.tagFilter = this.tagFilter.filter(t => t !== tag);
        } else {
            this.tagFilter.push(tag);
        }
        this.getTransactions();
    }

    isFilteredYear(year: number) {
        return this.yearFilter.includes(year);
    }

    toggleYear(year: number) {
        if (this.isFilteredYear(year)) {
            this.yearFilter = this.yearFilter.filter(t => t !== year);
        } else {
            this.yearFilter.push(year);
        }
        this.getTransactions();
    }

    goToFirstPage() {
        this.page = 0;
        this.getTransactions();
    }

    previousPage() {
        this.page = this.page - 1;
        this.getTransactions();
    }

    nextPage() {
        this.page = this.page + 1;
        this.getTransactions();
    }

    goToLastPage(transaction: Observable<TransactionQueryOverviewResponse> | undefined) {
        if (transaction) {
            transaction.subscribe(data => {
                this.page = data.last;
                this.getTransactions();
            });
        }
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
