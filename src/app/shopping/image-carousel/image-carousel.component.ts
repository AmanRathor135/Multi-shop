import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {

  singleProduct:any;
  id:any;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    nav:true,
    navText:[`<i class="fa fa-2x fa-angle-left text-dark carousel-control-prev"></i>`,`<i class="fa fa-2x fa-angle-right text-dark carousel-control-next"></i>`],
    responsive: {
      0: { items: 1 },
    },
  };

  constructor(private route:ActivatedRoute, private service:ProductService){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.id = res.params.id;
      this.getSingleProduct();
    })
  }

  getSingleProduct(){
    this.service.getSingleProduct(this.id).subscribe({
      next: (res:any) => {
        this.singleProduct = res;        
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => { }
    })
  }
}
