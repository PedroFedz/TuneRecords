import { Component, OnInit} from '@angular/core';
import { Product } from '../../services/product';
import { ProductService } from '../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  pageSize: number = 11;
  keyword: string = '';
  productId: string = "1";
  public page!: number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(p => this.products = p);
  }



}
