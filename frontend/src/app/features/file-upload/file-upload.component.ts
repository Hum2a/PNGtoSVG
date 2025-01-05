import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  svgContent: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile(): Promise<void> {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      try {
        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const svgResponse = await response.text();
        console.log('Raw SVG Response:', svgResponse);

        // Sanitize and render the SVG
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgResponse);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
}
