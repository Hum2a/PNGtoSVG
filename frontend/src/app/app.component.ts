import { Component } from '@angular/core';
import { FileUploadComponent } from "./features/file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FileUploadComponent]
})
export class AppComponent {
  title = 'PNG to SVG Converter';
  uploadCount = 0;

  onUploadComplete() {
    this.uploadCount++;
    console.log(`Total uploads: ${this.uploadCount}`);
  }
}

