import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ROLE_INFO } from '../../../models/auth/role.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.html',
  styleUrls: ['./role-selection.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class RoleSelection {
  @Input() formGroup!: FormGroup; // Bind the form group from the parent component
  roles = ROLE_INFO; // Use the roles defined in the role model
}
