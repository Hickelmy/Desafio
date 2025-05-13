import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-doctor-of-the-month',
  templateUrl: './doctor-of-the-month.component.html',
  styleUrls: ['./doctor-of-the-month.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class DoctorOfTheMonthComponent {
  doctor = {
    name: 'User',
    specialization: 'Cardiologist',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    appointments: 124
  };
}
