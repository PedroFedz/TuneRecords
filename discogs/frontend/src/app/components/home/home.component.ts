import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/services/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: any[] = [];
  public page!: number;

  pageSize: number = 11;
  from: number = 0;
  to: number = this.pageSize;
  keyword: string = '';
  productId: string = "1";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts(this.keyword);
  }

  search(query:string): void {
    this.keyword = query;
    this.getProducts(this.keyword);
  }

  getProducts(keyword:string): void {
    this.products = []
    this.productService.searchArtists(keyword).subscribe(p =>{

      this.products = p
      this.productService.products = p;
    });


  }

}
