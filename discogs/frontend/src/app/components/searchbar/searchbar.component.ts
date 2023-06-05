import { Component } from '@angular/core';
import { Product } from '../../services/product';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  keyword: string = '';

  constructor(private productService: ProductService) { }

  search(query:string): void {
    this.productService.query = query;
    this.keyword = query;
  }



}
