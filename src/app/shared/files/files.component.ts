import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { File, FileRequest } from '../model';
import { FilesService } from './files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {
  @Input() parent: number
  files: File[] = []
  loading: boolean
  fileData: FileRequest
  constructor(private fs: FilesService, public auth: AuthService) { }

  ngOnInit(): void {
    this.fs.list({ parent: this.parent }).subscribe(files => this.files = files)
  }

  fileChanged(file: any, event: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      file;
      file.name = event.target.value.split(/(\\|\/)/g).pop();
      file.value = reader.result;
      file.type = event.target.files[0].type;
      this.saveFile(file);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  saveFile(file: FileRequest) {
    this.loading = true;
    const newFile = {
      ...file,
      Parent: this.parent
    }
    this.fs.addFile(newFile).subscribe({
      next: (file: File) => {
        this.files.push(file)
        console.log(file)
      },
      error: (err) => console.error(err),
      complete: () => {
        this.loading = false
        this.fileData = null
      }
    })
  }

  deleteFile(file: File, i: number) {
    this.loading = true;
    this.fs.deleteFile(file.ID).subscribe({
      next: () => {
        this.files.splice(i, 1)
      },
      error: (err) => console.error(err),
      complete: () => this.loading = false
    })
  }

  newFile() {
    this.fileData = {}
  }

  download(file: File) {
    this.fs.getUrl(file.ID).subscribe(url => {
      // console.log(url)
      window.open(url, '_blank')
    })
  }

}
