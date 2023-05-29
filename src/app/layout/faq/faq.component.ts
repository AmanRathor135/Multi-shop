import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  title:string = 'Frequently Asked Questions';
  description:string = 'Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.';
  faq:any[] = [
    {
      icon:'bx bx-help-circle',
      question:'Non consectetur a erat nam at lectus urna duis?',
      answer:'Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.',
      delay:'0'
    },
    {
      icon:'bx bx-help-circle',
      question:'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?',
      answer:'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim.',
      delay:'100'
    },
    {
      icon:'bx bx-help-circle',
      question:'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?',
      answer:'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus.',
      delay:'200'
    },
    {
      icon:'bx bx-help-circle',
      question:'Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?',
      answer:'Aperiam itaque sit optio et deleniti eos nihil quidem cumque. Voluptas dolorum accusantium sunt sit enim. Provident consequuntur quam aut reiciendis qui rerum dolorem sit odio. Repellat assumenda soluta sunt pariatur error doloribus fuga.',
      delay:'300'
    },
    {
      icon:'bx bx-help-circle',
      question:'Tempus quam pellentesque nec nam aliquam sem et tortor consequat?',
      answer:'Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in',
      delay:'400'
    },
  ]

  constructor(private service:ProductService) {
    /**
     * Set Breadcrumb in Product Service
     */
    service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'FAQ', url: 'faq' }
    ]);
   }
}
