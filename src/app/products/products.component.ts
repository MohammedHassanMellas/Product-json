import {Component, Injectable, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {stat} from "fs";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [ProductService],
  imports: [
    NgClass,
    AsyncPipe,
    FormsModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService,
              private router : Router, public appState : AppStateService) {
  }
  ngOnInit(){
  this.searchProducts();
  }

  searchProducts(){
    this.appState.setProductState({
      status : "LOADING"
    })
    this.productService.searchProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
         let products=resp.body as Product[];
          //console.log("test",this.products)
         let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
         //this.appState.productsState.totalProducts=totalProducts;
          let totalPages =
           Math.floor(totalProducts / this.appState.productsState.pageSize);
         if (totalProducts % this.appState.productsState.pageSize !=0){
            ++totalPages;
          }
         this.appState.setProductState({
           products :products,
           totalProducts : totalProducts,
           totalPages : totalPages,
         //  status : "LOADED"
         })
          },
        error : err => {
          this.appState.setProductState({
            status : "ERROR",
            errorMessage :err
          })
        }
      })
   // this.products$=this.productService.getProducts();
  }
  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).
     subscribe({
      next : updatedProduct => {
        product.checked=!product.checked;
        //this.getProduct();
      }
    })
  }
  deleteProduct(product: Product) {
    if(confirm("Etes vous sur?"))
  this.productService.deleteProduct(product).subscribe({
  next : value=> {
    //this.searchProducts();
   this.appState.productsState.products=
     this.appState.productsState.products.filter((p:any)=> p.id!=product.id)
  }
})
  }
  handleGoToPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProducts();
  }
  editProduct(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}
