import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  title: string = '';
  artist: string  = '';
  lyrics: string  = '';
  products: any[] = [];
  pageSize: number = 6;
  from: number = 3;
  to: number = this.pageSize;
  img: String = '';
  urlBack: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title') ?? '';
      this.artist = params.get('artist') ?? '';
      // Aquí puedes realizar acciones adicionales según los parámetros
      this.productService.getProducts().subscribe(p => this.products = p);
      this.productService.getUrlBack(this.artist).subscribe(url => this.urlBack = url);
      this.productService.getLyrics(this.artist, this.title).subscribe(lyrics => {
        this.lyrics = lyrics;
      });
      this.productService.getUrlSong(this.artist, this.title).subscribe(img => {
        this.img = img;
      });
    });




  }


}
