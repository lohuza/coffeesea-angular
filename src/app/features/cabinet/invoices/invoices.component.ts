import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

interface InvoiceItem {
  id: string;
  number: string;
  date: string; // ISO date
  total: number;
  currency: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  loading = false;
  invoices: InvoiceItem[] = [
    { id: '1', number: 'INV-2025-001', date: '2025-09-28', total: 129.9, currency: 'GEL', status: 'Paid' },
    { id: '2', number: 'INV-2025-002', date: '2025-10-05', total: 89.5, currency: 'GEL', status: 'Unpaid' },
    { id: '3', number: 'INV-2025-003', date: '2025-10-12', total: 256.0, currency: 'GEL', status: 'Overdue' }
  ];

  trackById = (_: number, item: InvoiceItem) => item.id;

  getStatusClass(status: InvoiceItem['status']): string {
    switch (status) {
      case 'Paid': return 'status paid';
      case 'Unpaid': return 'status unpaid';
      case 'Overdue': return 'status overdue';
    }
  }

  onDownload(inv: InvoiceItem) {
    // Placeholder for download logic
    console.log('Download invoice', inv.id);
  }

  onView(inv: InvoiceItem) {
    // Placeholder for view logic
    console.log('View invoice', inv.id);
  }
}
