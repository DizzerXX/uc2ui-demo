import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ToastComponent } from '../../toast/toast.component';
import { Uc2uiPreviewerComponent } from '../../previewer/uc2ui-previewer.component';

interface FilePreview {
  name: string;
  size: string;
  type: string;
  error?: boolean; // Optional property
  preview?: string; // Optional property
}

@Component({
  selector: 'uc2ui-file',
  standalone: true,
  imports: [CommonModule, ToastComponent, Uc2uiPreviewerComponent],
  templateUrl: './uc2ui-file.component.html',
  styleUrl: './uc2ui-file.component.scss'
})
export class Uc2uiFileComponent {

  @Input() value!: any; // Holds the current value of the component
  @Input() inputFileType?: string[]; // Allowed file types for upload
  @Input() isMultiple?: boolean = false; // Determines if multiple file uploads are allowed
  @Input() maxFileSize!: number; // Maximum allowed file size in MB

  @Output() fileValue = new EventEmitter<any>(); // Emits selected file data

  @ViewChild(ToastComponent) toastComponent!: ToastComponent; // Reference to ToastComponent for displaying messages

  files: { name: string; size: string; type: string; error?: boolean; preview?: string }[] = []; // Preview data for files
  filesData: { lastModified: any; name: any; size: any; type: any; webkitRelativePath: any }[] = []; // Full data for files
  previewVisible: boolean = false //hide preview by default

  /**
   * Handles files dropped into the drop zone.
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  /**
   * Handles drag-over events to provide visual feedback.
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropZones = Array.from(document.getElementsByClassName('drop-zone')) as HTMLElement[];
    dropZones.forEach((zone) => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.backgroundColor = '#f3dea9';
      });
      zone.addEventListener('dragleave', () => {
        zone.style.backgroundColor = '#fff';
      });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.backgroundColor = '#fff';
      });
    });
  }

  /**
   * Handles file selection from input.
   */
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
  }

  /**
   * Processes a list of files for upload.
   */
  private processFiles(fileList: FileList): void {
    const files = Array.from(fileList);

    /** Check if can multiple file upload **/
    if (!this.isMultiple) {
      this.files = []; // Clear existing files for single file upload
      if (files.length > 1) {
        this.showToast('warn', 'Warning', 'Only one file can be uploaded!');
        return;
      }
    }

    files.forEach((file) => {
      const fileType = file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN';
      const fileSize = this.formatFileSize(file.size);

      const filePreview: FilePreview = { name: file.name, size: fileSize, type: fileType };
      //for file entry
      const fileEntry: any = {
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
      };

      console.log(fileEntry)

      /** Check max file size limit **/
      if (this.maxFileSize && file.size > this.maxFileSize * 1024 * 1024) {
        filePreview.error = true;
        this.showToast('warn', 'Warning', `File size exceeds the limit of ${this.maxFileSize} MB!`);
        return;
      }

      if (this.inputFileType?.includes(fileType)) {
        const reader = new FileReader();
        reader.onload = () => {
          filePreview.preview = reader.result as string;
          fileEntry.preview = reader.result as string;
          this.files.push(filePreview);
          this.filesData.push(fileEntry);
          this.fileValue.emit(this.filesData);
        };
        reader.readAsDataURL(file);
      } else {
        filePreview.error = true;
        this.showToast('error', 'Error', 'File type not supported!');
      }
    });
  }

  /**
   * Formats file size into human-readable format (KB or MB).
   */
  private formatFileSize(size: number): string {
    return size < 1024 * 1024
      ? (size / 1024).toFixed(2) + ' KB'
      : (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

  /**
   * Displays a toast message.
   */
  private showToast(type: any, title: string, message: string): void {
    this.toastComponent.showToastMessage({
      title,
      message,
      type,
      position: 'top-right',
    });
  }

  /**
   * Deletes a selected file.
   */
  deleteFile(file: any): void {
    this.files = this.files.filter((f) => f !== file);
    this.filesData = this.filesData.filter((f) => f.name !== file.name);
    this.fileValue.emit(this.filesData);
  }

  /**
   * Triggers a file download (not implemented).
   */
  downloadFile(file: any): void {
    alert(`Download ${file.name} (not implemented)`);
  }


  /**
   * Image preview function
   */
  zoomedImage: string | null = null;

  closePrev() {
    this.zoomedImage = null
  }

  onPreviewClick(file: any) {
    this.zoomedImage = file;
    this.previewVisible = true;
  }


  // get data when close dialog
  handlePreviewClose(result: any): void {
    console.log('Dialog closed with result:', result);
    this.previewVisible = false;
  }

}
