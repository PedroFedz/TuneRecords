import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit{

  url: string = '';
  urlBack: string = '';
  artist: string  = '';
  products: any[] = [];
  art: string = '';
  resultados: any[] = [];
  keyword: string = '';
  public page!: number;
  pageSize: number = 12;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    console.log("Se ejecuta");
   }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.keyword = '';
      this.getProduct(this.keyword);
      this.artist = params.get('artist') ?? '';
      this.productService.art = this.artist;
      // Aquí puedes realizar acciones adicionales según los parámetros
      this.productService.getProductsA(this.artist).subscribe(p => this.products = p);
      this.productService.getProductsA(this.artist).subscribe(p => this.resultados = p);
      this.productService.getUrl(this.artist).subscribe(url => this.url = url);
      console.log(this.url);
      this.productService.getUrlBack(this.artist).subscribe(url => this.urlBack = url);
    });

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
