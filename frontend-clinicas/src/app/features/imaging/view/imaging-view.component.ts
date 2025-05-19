import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Patient {
  name: string;
  age: number;
  admission: string;
  complaint: string;
}

interface Exam {
  title: string;
  patient: Patient;
  imageMain: string;
  imageSide: string;
}

@Component({
  selector: 'app-imaging-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './imaging-view.component.html',
  styleUrls: ['./imaging-view.component.scss']
})
export class ImagingViewComponent implements OnInit {
  id: string | null = null;
  exam: Exam | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.exam = this.getExamById(this.id);
  }

  private getExamById(id: string | null): Exam {
    return {
      title: 'Hip Example – Right Hip',
      patient: {
        name: 'Linda Smith',
        age: 42,
        admission: '2024-04-14',
        complaint: 'Hip pain, limps when walking'
      },
      imageMain: 'https://via.placeholder.com/600x400?text=Hip+X-Ray+Analysis',
      imageSide: 'https://via.placeholder.com/300x400?text=Hip+X-Ray+Raw'
    };
  }
}
