import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'uc2ui-previewer',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './uc2ui-previewer.component.html',
  styleUrl: './uc2ui-previewer.component.scss'
})
export class Uc2uiPreviewerComponent implements OnInit{

  // @Output() fileValue = new EventEmitter<any>(); // Emits selected file data
  @Output() previewClose = new EventEmitter<any>(); // Notify parent about dialog closure.
  @Input() file: any;
  filePrev: any;
  showOverlay = false;
  fileType: any;

  constructor() {
  }

  ngOnInit(): void {
    if(this.file){
      this.filePreviewFunct(this.file);
    } else{
      this.previewClose.emit(false)
    }
  }

  ngOnChanges() {
    console.log('FILE PREV', this.file);
    this.filePreviewFunct(this.file);
  }

  filePreviewFunct(file: any) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    if (file.type === 'PDF') {
      this.filePrev = file.preview
      this.showOverlay = true;
    } else {
      this.filePrev = file.preview;
    }
  }

  zoomedImage: string | null = null;
  closeZoom(): void {
    document.body.style.overflow = '';
    document.body.style.height = '';
    this.filePrev = null;
    this.showOverlay = false;
    // this.fileValue.emit(null)
    this.previewClose.emit(false)
  }

  deleteFilePrev(file: any) {
    console.log('Delete file:', file);
  }

}
