import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { ApiResponse } from '../../commons/_dto/api-response';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private source = '/category'
  private categoriasSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);


  constructor(private http: HttpClient) {
    this.fetchCategories();
  }

  fetchCategories():void{
    this.getActiveCategories().subscribe(res => {
      this.categoriasSubject.next(res.body!);
    });
  }

  getCategoriasObservable(): Observable<Category[]> {
    return this.categoriasSubject.asObservable();
  }

  createCategory(category: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, category, { observe: 'response' });
  }

  disableCategory(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + '/' + id, { observe: 'response' });

  }

  enableCategory(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + '/' + id + "/activate", null, { observe: 'response' });
  }

  getCategory(id: number): Observable<HttpResponse<Category>> {
    return this.http.get<Category>(api_dwb_uri + this.source + "/" + id, { observe: 'response' });


  }

  getCategories(): Observable<HttpResponse<Category[]>> {

    return this.http.get<Category[]>(api_dwb_uri + this.source, { observe: 'response' });
  }

  getActiveCategories(): Observable<HttpResponse<Category[]>> {
    return this.http.get<Category[]>(api_dwb_uri + this.source + "/active", { observe: 'response' });
  }

  updateCategory(category: any, id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.put<ApiResponse>(api_dwb_uri + this.source + "/" + id, category, { observe: 'response' });
  }

}
