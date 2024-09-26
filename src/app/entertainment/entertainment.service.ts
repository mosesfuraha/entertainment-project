import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentItem } from './models/data.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntertainmentService {
  private url = '/data.json';

  constructor(private http: HttpClient) {}

  getAllData(): Observable<ContentItem[]> {
    return this.http.get<ContentItem[]>(this.url);
  }
}
