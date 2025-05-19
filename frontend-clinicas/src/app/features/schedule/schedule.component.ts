import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['time', 'patient', 'reason', 'doctor', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  private readonly dataSubject = new BehaviorSubject<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 ngOnInit(): void {
  const initial = [
    { time: '08:00', patient: 'João Silva', reason: 'Consulta', doctor: 'Dra. Ana', status: 'Confirmado' },
    { time: '09:30', patient: 'Maria Souza', reason: 'Retorno', doctor: 'Dr. Carlos', status: 'Pendente' }
  ];

  console.log('[ngOnInit] Dados iniciais:', initial);

  this.dataSubject.next(initial);
  this.dataSource.data = initial;

  console.log('[ngOnInit] dataSource.data:', this.dataSource.data);
}

ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;

  console.log('[ngAfterViewInit] Paginator atribuído:', this.paginator);
  console.log('[ngAfterViewInit] dataSource com paginator:', this.dataSource);
}


  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'confirmado': return 'primary';
      case 'pendente': return 'accent';
      case 'cancelado': return 'warn';
      default: return '';
    }
  }

  async openCreateDialog(): Promise<void> {
    const { CreateScheduleDialogComponent } = await import('./modal/create-schedule.dialog');
    const dialogRef = this.dialog.open(CreateScheduleDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((newSchedule: any) => {
      if (newSchedule) {
        const updated = [...this.dataSubject.value, newSchedule];
        this.dataSubject.next(updated);
        this.dataSource.data = updated;
        this.dataSource.paginator = this.paginator; 
      }
    });
  }
}
