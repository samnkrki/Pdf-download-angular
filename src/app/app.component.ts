import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FileDownloadService } from "./file-download.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "fileDownloadAngular";
  @ViewChild("downloadPdfLink") private downloadZipLink: ElementRef;
  u: any;
  constructor(
    private fileDownloadService: FileDownloadService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.fileDownloadService
      .getFile()
      .subscribe(data => this.downloadFile(data)), //console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }
  downloadFile(data) {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    console.log(url);
    this.u = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const link = this.downloadZipLink.nativeElement;
    link.href = url;
    link.download = "filename.pdf";
    link.click();
  }
}
