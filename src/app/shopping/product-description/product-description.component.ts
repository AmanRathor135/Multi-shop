import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDescriptionComponent implements OnInit, OnDestroy {

  submitted:boolean = false;
  isShow:boolean = true;
  productId:any='';
  starRating:any = 0;
  limit:number = 3;
  category: any;
  reviewsData:any[] = [];
  subscription:Subscription[] = [];
  Tabs: any[] = ['Description', 'Information', 'Reviews'];

  feedbackFrom: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    review: new FormControl('', [Validators.required])
  });

  tabList: any[] = [
    {
      tab: 'Description',
      title: 'Product Description',
      desc:
       [ 'Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.',
        'Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.'],
    },
    {
      tab: 'Information',
      title: 'Additional Information',
      desc: ['Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.'],
      lists: [
        'Sit erat duo lorem duo ea consetetur, et eirmod takimata.',
        'Amet kasd gubergren sit sanctus et lorem eos sadipscing at.',
        'Duo amet accusam eirmod nonumy stet et et stet eirmod.',
        'Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.',
      ],
    },
    {
      tab: 'Reviews',
      title: '1 review for "Product Name"',
      imgSrc: 'assets/img/user.jpg',
      name: 'John Doe',
      date: '01 Jan 2045',
      icons: [
        'fas fa-star',
        'fas fa-star',
        'fas fa-star',
        'fas fa-star-half-alt',
        'far fa-star',
      ],
      desc: ['Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.'],
    },
  ];
    
  constructor(
    private activeRoute:ActivatedRoute,
    private reviewService:ReviewService, 
    private toastr:ToastrService, 
    private cdr:ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.getSpecificProductId();
  }
  
  // Using form in HTML as a feedbackFrom.controls
  get form(): { [key: string]: AbstractControl } {
    return this.feedbackFrom.controls;
  };

  // getting Specific Product Id from ActivatedRoute using Params
  getSpecificProductId(){
    let sub1 = this.activeRoute.paramMap.subscribe((res:any) => {
      this.productId = res.params.id;      
      this.showReviewsOnPage()
      this.cdr.markForCheck();
    });
    this.subscription.push(sub1);
  }

  // Sending the Review of Specific Product using Product Services POST method
  sendReview() {
    this.submitted = true;
    if(this.feedbackFrom.valid){
      this.feedbackFrom.value['productId'] = this.productId;
      let sub2 = this.reviewService.addReviewOnSpecificProduct(this.feedbackFrom.value).subscribe({
        next: (res:any) => { 
          res.type == 'success'? this.toastr.success(res.message): this.toastr.warning(res.message); 
          this.submitted = false;
        }, 
        error: (err:any) => { console.log("Error in Adding Review", err); },
        complete: () => { 
          this.feedbackFrom.reset();
          this.showReviewsOnPage();
          this.cdr.markForCheck(); 
        }
      });
      this.subscription.push(sub2);
    }
  };

  // Getting the Review of Specific Product using Product Service's GET method
  showReviewsOnPage(){
    let sub3 = this.reviewService.getReviewOfSpecificProduct(this.productId).subscribe({
      next: (res:any) => { this.reviewsData = res.data;},
      error: (err:any) => { console.log("showing review Error",err); },
      complete: () => {this.cdr.markForCheck(); }
    });
    this.subscription.push(sub3);
  };

  // loading Review when the reviews length is greater than limit
  loadMoreReviews(){
    this.limit = this.limit + 3;
    if(this.reviewsData.length <= this.limit){
      this.isShow = false;
    }
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
