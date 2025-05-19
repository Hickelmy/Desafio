import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FullCalendarModule } from '@fullcalendar/angular';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type EventType = 'medication' | 'emergency' | 'appointment' | 'diagnosis' | 'MCU';

interface NurseEvent {
  title: string;
  start: string;
  end?: string;
  color: string;
  extendedProps: {
    type: EventType;
    notes: string;
    avatar?: string;
  };
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  selectedEvent: any = null;

  private nurseEvents: NurseEvent[] = [
    {
      title: 'Carlos Lima',
      start: '2025-05-16T09:00:00',
      end: '2025-05-16T09:30:00',
      color: '#26a69a',
      extendedProps: {
        type: 'medication',
        notes: 'Apply insulin dose and record sugar level.',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    },
    {
      title: 'Joana Reis',
      start: '2025-05-17T10:00:00',
      end: '2025-05-17T10:45:00',
      color: '#e53935',
      extendedProps: {
        type: 'emergency',
        notes: 'Shortness of breath. Prepare for potential oxygen support.',
        avatar: 'https://i.pravatar.cc/150?img=7'
      }
    },
    {
      title: 'Ana Paula',
      start: '2025-05-18T14:00:00',
      end: '2025-05-18T14:30:00',
      color: '#3949ab',
      extendedProps: {
        type: 'appointment',
        notes: 'Routine checkup. Take vitals and update patient chart.',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    },
    {
      title: 'Annette Black',
      start: '2025-05-19T09:00:00',
      end: '2025-05-19T10:00:00',
      color: '#dcedc8',
      extendedProps: {
        type: 'MCU',
        notes: 'Monitor vitals and supervise medication intake.',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.nurseEvents,
    editable: false,
    selectable: true,
    nowIndicator: true,
    slotDuration: '00:30:00',
    eventClick: this.handleEventClick.bind(this)
  };

  handleEventClick(arg: EventClickArg): void {
    this.selectedEvent = arg.event;
  }
}
