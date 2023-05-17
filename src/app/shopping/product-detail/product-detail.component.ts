import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  singleProduct:any;
  id:any;
  math= Math;
  totalRate:any;
  value:any = 1;
  // productDetail: any = {
  //   productName: 'Product Name Goes Here',
  //   icons: ['fas fa-star','fas fa-star','fas fa-star','fas fa-star-half-alt','far fa-star'],
  //   reviews: '99',
  //   price: '150',
  //   detail: 'Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea Nonumy'
  // };

  sizes: any ={ 
    category:'Sizes',
    data: [
    { label: 'size-1', name: 'XS'},
    { label: 'size-2', name: 'S' },
    { label: 'size-3', name: 'M' },
    { label: 'size-4', name: 'L' },
    { label: 'size-5', name: 'XL' },
  ]
}

  colors:any = {
    category:'Colors',
    data: [
    { label: 'color-1', name: 'Black' },
    { label: 'color-2', name: 'White' },
    { label: 'color-3', name: 'Red' },
    { label: 'color-4', name: 'Blue' },
    { label: 'color-5', name: 'Green' },
  ]};

  socialLinks:any[] = ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in', 'fab fa-pinterest']
  
  constructor(private route:ActivatedRoute, private service:ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.id = res.params.id;
      this.getSingleProduct();
    });

    this.rating(5)
  }

  getSingleProduct(){
    this.service.getSingleProduct(this.id).subscribe({
      next: (res:any) => {
        this.singleProduct = res;        
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  };

  rating(value:any){
    this.totalRate = Array(value)
  };

  add(){
    this.value = this.value + 1;
  };

  remove(){
    if(this.value > 1){
      this.value = this.value - 1;
    }
    else if (this.value <= 1){
      this.value = 1
    }
  };
}
