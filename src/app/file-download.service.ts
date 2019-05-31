import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FileDownloadService {
  constructor(private http: HttpClient) {}
  getFile() {
    let urls = `http://localhost:3000/files`;
    return this.http.get(urls, { responseType: "blob" });
  }
}
