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
      title: 'Hip - Right',
      type: 'X-Ray',
      date: '2024-05-10',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpG0xwjiIHyvGSCIJDOCZ_VEzEntS0LHnhCQ&s'
    },
    {
      id: 2,
      title: 'Knee - Left',
      type: 'MRI',
      date: '2024-05-12',
      image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/219/219970/x-ray-skull-from-right-side.jpg'
    }
  ];
}
