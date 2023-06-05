import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit{

  products: any[] = [];
  public page!: number;
  pageSize: number = 12;
  keyword: string = '';
  productId: string = "1";
  art: string = ''
  resultados: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.art = this.productService.art;
    this.productService.getProducts().subscribe(p => this.products = p);
    this.getProducts();
    this.resultados = this.products;
  }

  getProducts(): void {
    this.products = []
    this.productService.searchArtists(this.art).subscribe(p => this.products = p);
    this.productService.searchArtists(this.art).subscribe(p => this.resultados = p);

    console.log("Se esta ejecutando el programa")
    console.log(this.products.length)
  }

  getProduct(keyword: string): void {
    this.resultados= [];
    for (const elemento of this.products) {
      console.log(elemento.title);
      if (elemento.title === undefined || elemento.title === null) continue;
      if(elemento.title.toLowerCase().includes(keyword.toLowerCase())){

        this.resultados.push(elemento);
      }
    }
  }


}
