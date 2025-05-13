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
        name: 'User A ',
        phone: '+55 97787478984',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        color: '#f87171'
      },
      date: '5 Dec 2019',
      time: '4:30 PM',
      doctor: {
        name: 'User B',
        specialization: 'Cardiologist',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    },
    {
      patient: {
        name: 'User C',
        phone: '+55 97787478984',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        color: '#60a5fa'
      },
      date: '5 Dec 2019',
      time: '1:30 PM',
      doctor: {
        name: 'User D',
        specialization: 'Orthopedics',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      }
    }
  ];
}
