import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-document-info',

  templateUrl: './app-document-info.component.html',
  styleUrl: './app-document-info.component.css'
})
export class AppDocumentInfoComponent {
  @Input() title: string | undefined;
  @Input() value: string | undefined;
}
