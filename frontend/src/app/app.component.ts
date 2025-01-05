import { Component } from '@angular/core';
import { FileUploadComponent } from "./features/file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent], // No need to include provideHttpClient() here
  template: `
    <app-file-upload></app-file-upload>
  `,
})
export class AppComponent {}
