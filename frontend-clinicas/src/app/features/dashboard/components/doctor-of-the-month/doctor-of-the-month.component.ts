// src/app/features/doctor-of-the-month/doctor-of-the-month.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';
import { Observable }        from 'rxjs';
import { DoctorOfMonth, DoctorService } from './service/doctor.service';

@Component({
  standalone: true,
  selector: 'app-doctor-of-the-month',
  templateUrl: './doctor-of-the-month.component.html',
  styleUrls: ['./doctor-of-the-month.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class DoctorOfTheMonthComponent implements OnInit {
  doctor$!: Observable<DoctorOfMonth>;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctor$ = this.doctorService.getRandomDoctor();
  }

  
}
