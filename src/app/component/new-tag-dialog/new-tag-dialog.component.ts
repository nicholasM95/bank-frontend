import {Component, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-new-tag-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        FormsModule
    ],
    templateUrl: './new-tag-dialog.component.html',
    styleUrl: './new-tag-dialog.component.css'
})
export class NewTagDialogComponent {

    name: string = '';
    description: string = '';

    constructor(
        public dialogRef: MatDialogRef<NewTagDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isDark: boolean }
    ) {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    createTag() {
        this.dialogRef.close({'name': this.name, 'description': this.description});
    }

}
