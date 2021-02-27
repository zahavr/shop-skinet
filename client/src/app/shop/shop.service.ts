import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {IPagination} from '../shared/interfaces/pagination.interface';
import {Observable} from 'rxjs';
import {IBrand} from '../shared/interfaces/brand.interface';
import {IProductType} from '../shared/interfaces/productType.interface';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getProducts(brandId?: number, typeId?: number, sort?: string): Observable<IPagination> {
    let params: HttpParams = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }
    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }
    if (sort) {
      params = params.append('sort', sort.toString());
    }

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map((res: HttpResponse<IPagination>) => res.body)
      );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getProductTypes(): Observable<IProductType[]> {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }

}
