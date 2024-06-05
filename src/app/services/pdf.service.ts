import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Offer } from '../models/offer.model';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { Service } from '../models/service.model';
import { RobotoFont } from '../../assets/fonts/roboto-font';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(customer: Customer, services: Service[], offer?: Offer, invoice?: Invoice) {
    const doc = new jsPDF();

    doc.addFileToVFS('Roboto-Regular.ttf', RobotoFont.normal);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    doc.setFontSize(10);

    doc.text('"KOS" OBRT ZA PRIJEVOZ I USLUGE', 10, 10);
    doc.text('vl. MARKO KOS, SNAŠIĆI 2G, 52220 LABIN', 10, 15);
    doc.text('OIB: 79380920480', 10, 20);
    doc.text('IBAN: HR9723400091160647327 kod PBZ d.d.', 10, 25);

    let data: any;

    if (offer) {
      data = this.generateOfferData(offer, services);
    }

    if (invoice) {
      data = this.generateInvoiceData(invoice, services);
    }

    doc.text(`${customer.firstname} ${customer.lastname}`, 10, 35);
    doc.text(customer.address || '', 10, 40);
    doc.text(`${customer.zip || ''} ${customer.city || ''}`, 10, 45);

    doc.text(`${data.title} ${data.number}`, 150, 35);

    autoTable(doc, {
      startY: 50,
      head: [data.main_table_headers],
      body: [[
        new Date().toLocaleDateString(),
        '42',
        '1/26357793571',
        new Date().toLocaleDateString(),
        new Date().toLocaleDateString()
      ]],
      styles: {font: "Roboto"}
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    autoTable(doc, {
      startY: finalY + 10,
      head: [['Šifra robe', 'Naziv robe/usluge', 'J.mj.', 'Količina', 'Cijena', 'Iznos']],
      body: data.services,
      styles: {font: "Roboto"}
    });

    const finalY2 = (doc as any).lastAutoTable.finalY;

    doc.text('Oslobođenje od PDV-a', 10, finalY2 + 20);
    doc.text('Zakonska osnova', 10, finalY2 + 25);
    doc.text('PDV nije obračunat temeljem čl. 90 st.2 Zakona', 10, finalY2 + 30);

    doc.text('Fiskalizacija računa', 10, finalY2 + 35);
    autoTable(doc, {
      startY: finalY2 + 40,
      head: [['Načina plaćanja', 'Oznaka operatera', 'Datum', 'Vrijeme']],
      body: [['Transakcijski račun', '1', new Date().toLocaleDateString(), '10:00:54']],
      styles: {font: "Roboto"}
    });

    const finalY3 = (doc as any).lastAutoTable.finalY;
    doc.text('"KOS" - OBRT ZA PRIJEVOZ I USLUGE', 10, finalY3 + 20);
    doc.text(data.footer_text, 150, finalY3 + 20);
    doc.text('Stranica: 1', 150, finalY3 + 25);

    doc.save(`${data.title} ${data.number}.pdf`);
  }

  generateOfferData(offer: Offer, services: Service[]) {
    const addedServices = offer.services.map(serv => {
      const service = services.find(s => s.id === serv.serviceId);
      return service ? [
        service.code,
        service.name,
        'kom',
        serv.quantity,
        service.price,
        serv.quantity * service.price
      ] : [];
    });

    return {
      title: 'Ponuda',
      services: addedServices,
      number: offer.number,
      main_table_headers: ['Datum ponude', 'Šifra kupca', 'PDV ID. BR./OIB', 'Datum isporuke', 'Dospijeće ponude'],
      footer_text: 'Ponuda 1'
    };
  }

  generateInvoiceData(invoice: Invoice, services: Service[]) {
    const addedServices = invoice.services.map(serv => {
      const service = services.find(s => s.id === serv.serviceId);
      return service ? [
        service.code,
        service.name,
        'kom',
        serv.quantity,
        service.price,
        serv.quantity * service.price
      ] : [];
    });

    return {
      title: 'Račun',
      services: addedServices,
      number: invoice.number,
      main_table_headers: ['Datum računa', 'Šifra kupca', 'PDV ID. BR./OIB', 'Datum isporuke', 'Dospijeće računa'],
      footer_text: 'Račun 1'
    };
  }
}