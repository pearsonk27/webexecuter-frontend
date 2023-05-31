import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Script } from '../model/script';
import { ScriptService } from '../script.service';

@Component({
    selector: 'app-script-form',
    templateUrl: './script-form.component.html',
    styleUrls: ['./script-form.component.css']
})
export class ScriptFormComponent implements OnInit {
    scriptForm!: FormGroup;

    constructor(private fb: FormBuilder, private scriptService: ScriptService) {}

    ngOnInit(): void {
        this.scriptForm = this.fb.group({
            name: ['', Validators.required],
            location: ['', Validators.required],
            startDate: ['', Validators.required],
            cronExpression: ['', Validators.required]
        });
    }

    onSubmit() {
        const script: Script = this.scriptForm.value;
        this.scriptService.save(script).subscribe((savedScript: any) => {
            this.scriptService.scheduleScript(savedScript);
            this.scriptForm.reset();
        });
    }
}

