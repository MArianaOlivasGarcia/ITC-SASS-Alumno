import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styles: [
  ]
})
export class PdfViewerComponent implements OnInit {

  @Input() pdfSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
