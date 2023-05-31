import { Component, OnInit } from '@angular/core';
import { Script } from '../model/script';
import { ScriptService } from '../script.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-script-list',
    templateUrl: './script-list.component.html',
    styleUrls: ['./script-list.component.css']
})
export class ScriptListComponent implements OnInit {
    scripts!: Script[];

    constructor(private scriptService: ScriptService,
      private confirmationDialogService: ConfirmationDialogService,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.scriptService.findAll().subscribe(scripts => {
            this.scripts = scripts;
        });
    }

    onDelete(script: Script) {
        this.confirmationDialogService.confirm('Confirm deletion', `Are you sure you want to delete the script "${script.name}"?`)
            .pipe(
                filter(result => result === true),
                switchMap(() => this.scriptService.deleteById(script.id))
            )
            .subscribe(() => {
                this.scripts = this.scripts.filter(s => s !== script);
            });
    }

    onSchedule(script: Script) {
        this.scriptService.scheduleScript(script)
            .subscribe(() => {
                this.snackBar.open(`Script "${script.name}" scheduled successfully`, 'OK', { duration: 5000 });
            });
    }

    executeScript(script: Script) {
        this.scriptService.executeScript(script.id)
            .subscribe(() => {
                this.snackBar.open('Script execution scheduled', 'Dismiss', {
                    duration: 3000,
                });
            });
    }

}

