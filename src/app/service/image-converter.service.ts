import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {

  constructor(private http: HttpClient) { 

  }
  public getBase64ImageFromURL(url: string): Observable<string> {
    // return new Observable(observer => {
    //   this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     reader.onloadend = () => {
    //       observer.next(reader.result as string);
    //       observer.complete();
    //     };
    //     reader.onerror = error => observer.error(error);
    //   });
    // });
    return this.http.get(url, {
      observe: 'body',
      responseType: 'arraybuffer',
    })
    .pipe(
      take(1),
      map((arrayBuffer) =>
        btoa(
          Array.from(new Uint8Array(arrayBuffer))
          .map((b) => String.fromCharCode(b))
          .join('')
        )
      ),
    )
  }
}
