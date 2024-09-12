import {Component, Inject} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AsyncPipe, NgClass} from "@angular/common";
import {TagResponse} from "../../service/tag";
import {TransactionDetailStatsResponse} from "../../service/transaction";

@Component({
    selector: 'app-assign-tag-dialog',
    standalone: true,
    imports: [
        MatFormField,
        FormsModule,
        AsyncPipe,
        NgClass
    ],
    templateUrl: './assign-tag-dialog.component.html',
    styleUrl: './assign-tag-dialog.component.css'
})
export class AssignTagDialogComponent {

    selectedTag: string = '';

    constructor(
        public dialogRef: MatDialogRef<AssignTagDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { transaction: TransactionDetailStatsResponse, tags: TagResponse[], isDark: boolean }
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveTags(): void {
        this.dialogRef.close(this.selectedTag);
    }

}
