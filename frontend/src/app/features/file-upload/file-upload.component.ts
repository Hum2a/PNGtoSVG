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
  svgCode: string | null = null;
  showSvgCode = false;
  modalVisible = false;
  modalMessage = '';

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.showModal('File selected! Ready to convert.');
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
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgResponse);
        this.svgCode = svgResponse;

        this.showModal('SVG conversion successful!');
      } catch (error) {
        console.error('Error uploading file:', error);
        this.showModal('An error occurred during conversion.');
      }
    }
  }

  toggleCodeView(): void {
    this.showSvgCode = !this.showSvgCode;
  }

  copySvgCode(): void {
    if (this.svgCode) {
      navigator.clipboard.writeText(this.svgCode).then(
        () => {
          this.showModal('SVG code copied to clipboard!');
        },
        (err) => {
          console.error('Failed to copy SVG code:', err);
          this.showModal('Failed to copy SVG code.');
        }
      );
    }
  }

  showModal(message: string): void {
    this.modalMessage = message;
    this.modalVisible = true;

    // Auto-close the modal after 3 seconds
    setTimeout(() => {
      this.modalVisible = false;
    }, 3000);
  }

  closeModal(): void {
    this.modalVisible = false;
  }
}
