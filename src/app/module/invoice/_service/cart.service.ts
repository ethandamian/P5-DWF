import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../../commons/_dto/api-response';
import { api_dwb_uri } from '../../../shared/uri/api-dwb-uri';
import { DtoCartDetails } from '../_dto/dto-cart-details';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private source = "/cart";
  private contadorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  getCount():void{
    this.getCart().subscribe(res => {
      let n = 0;
      res.body?.forEach((item) => {
        n += item.quantity!;
      });
      this.contadorSubject.next(n);
    });
  }

  getCountObservable(): Observable<number> {
    return this.contadorSubject.asObservable();
  }

  addToCart(cart: any): Observable<HttpResponse<ApiResponse>> {
    return this.http.post<ApiResponse>(api_dwb_uri + this.source, cart, { observe: 'response' });
  }

  getCart(): Observable<HttpResponse<DtoCartDetails[]>> {
    return this.http.get<DtoCartDetails[]>(api_dwb_uri + this.source , { observe: 'response' });
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función clearCart() */
  clearCart(): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source, { observe: 'response' });
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart(id: number): Observable<HttpResponse<ApiResponse>> {
    return this.http.delete<ApiResponse>(api_dwb_uri + this.source + '/' + id , { observe: 'response' });
  }
}
