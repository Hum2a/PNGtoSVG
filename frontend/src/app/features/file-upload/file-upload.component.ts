import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  svgContent: SafeHtml | null = null; // Use SafeHtml for sanitized SVG

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post<{ url: string }>('/api/convert', formData).subscribe(
        (response) => {
          console.log('SVG URL:', response.url); // Debugging log
          this.svgContent = response.url; // Update the SVG URL
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    }
}

}
