import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-imaging',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './imaging.component.html',
  styleUrls: ['./imaging.component.scss']
})
export class ImagingComponent {
  exams = [
    {
      id: 1,
      title: 'Quadril - Direito',
      type: 'X-Ray',
      date: '2024-05-10',
      image: 'https://lirp.cdn-website.com/cfcd7b64/dms3rep/multi/opt/radiografia-quadril-dr-ricardo-kirihara-ortopedista-quadril-sao-paulo-1920w.jpg'
    },
    {
      id: 2,
      title: 'Joelho - Esquerdo',
      type: 'MRI',
      date: '2024-05-12',
      image: 'https://static.wixstatic.com/media/7f2241_10715ea1e3ab4379a3c195f35aba97e7~mv2.jpg/v1/fill/w_730,h_742,al_c,q_85,enc_avif,quality_auto/7f2241_10715ea1e3ab4379a3c195f35aba97e7~mv2.jpg'
    }
  ];
}
