import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScriptService } from './script.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private scriptService: ScriptService,
      private snackBar: MatSnackBar
    ) {}

  title = 'frontend';

  uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      throw new Error('Upload file not found');
    }
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.scriptService.uploadScript(file)
        .subscribe((script : any) => {
            this.snackBar.open('Script uploaded successfully', 'Dismiss', {
                duration: 3000,
            });
        });
}

}
