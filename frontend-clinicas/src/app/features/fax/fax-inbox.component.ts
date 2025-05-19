import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fax-inbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './fax-inbox.component.html',
  styleUrls: ['./fax-inbox.component.scss']
})
export class FaxInboxComponent {
  form: FormGroup;

  attachments = ['Cover Sheet', 'FileName.file', 'FileName2.file'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from: ['FaxName (XXX) XXX-XXXX'],
      to: ['(999) 999-9999'],
      addCoverSheet: [false],
      faxFrom: [''],
      faxTo: [''],
      pages: ['10'],
      contents: [''],
      notes: [''],
      sendEmail: [false]
    });
  }

  sendFax() {
    console.log(this.form.value);
  }
}
