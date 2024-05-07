import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  providers: [ProductService],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId! :any;
  productFormGroup! : FormGroup;
  constructor(private activatedRoute : ActivatedRoute,
              private fb : FormBuilder) {
  }
  private productService = inject(ProductService)
  ngOnInit() {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next : (product)=> {
        this.productFormGroup = this.fb.group({
          id : this.fb.control(product.id),
          name : this.fb.control(product.name, Validators.required),
          price : this.fb.control(product.price,[Validators.min(100)]),
          checked : this.fb.control(product.checked)
        })
      },
      error : err => {
        console.log(err);
      }
    });
  }

  updateProduct() {
   let product : Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next : data => {
        alert(JSON.stringify(data));
      }
    })
  }

}
