import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class AppointmentsListComponent {
  appointments = [
    {
      patient: {
        name: 'Joana Silva',
        phone: '+55 11 97787-4984',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        color: '#f87171'
      },
      date: '05 dez 2019',
      time: '16:30',
      doctor: {
        name: 'Dr. Paulo Costa',
        specialization: 'Cardiologista',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    },
    {
      patient: {
        name: 'Carlos Pereira',
        phone: '+55 21 98876-5432',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        color: '#60a5fa'
      },
      date: '05 dez 2019',
      time: '13:30',
      doctor: {
        name: 'Dra. Mariana Lopes',
        specialization: 'Ortopedia',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    }
  ];
}
