import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";


export class ProductService {
url = "http://localhost:8089";
  //constructor(private http:HttpClient) { }
  private http = inject(HttpClient)

  public searchProducts(keyword : string="" ,page:number=1, size:number=4){
    return this.http.get(`${this.url}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'})
  }

  public checkProduct(product:Product) : Observable<Product>{
    return  this.http.patch<Product>(`${this.url}/products/${product.id}`,
      {checked:!product.checked});
  }

  public deleteProduct(product:Product) {
    return  this.http.delete<any>(`${this.url}/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return  this.http.post<Product>(`${this.url}/products`,
      product);
  }
  /*public searchProducts(keyword:string, page : number, size : number): Observable<Array<Product>>{
    return this.http.get<Array<Product>>
    (`http://localhost:8089/products?name_like=${keyword}&_page=${page}$_limit{size}`);
  }*/

  getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>
    (`${this.url}/products/${product.id}`,product);
  }
}

