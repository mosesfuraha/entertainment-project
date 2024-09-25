import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Make sure this is 'styleUrls' not 'styleUrl'
})
export class HomeComponent {
  slider = [
    {
      id: 1,
      title: 'Earthis Untouched',
      description: '2017n  Movie 18+',
      imageUrl:
        'https://img.kwcdn.com/product/fancy/f2ac49f9-56ee-44ae-a02a-e0a5ab9a022b.jpg?imageView2/2/w/500/q/60/format/webp',
    },
    {
      id: 2,
      title: 'The Great Lands',
      description: '2019. Movie E',
      imageUrl:
        'https://i5.walmartimages.com/asr/5da8ead4-26c7-408a-9b1f-81cde7909916.57bd6410549641fd53866c7c160026ea.jpeg?odnHeight=432&odnWidth=320&odnBg=FFFFFF',
    },
    {
      id: 3,
      title: 'Autosport the series',
      description: '2016 Tv Series 18+',
      imageUrl:
        'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg',
    },
    {
      id: 4,
      title: 'Beyond Earth',
      description: '2019 Movie PG',
      imageUrl:
        'https://img.freepik.com/free-vector/home-furniture-set_74855-15461.jpg',
    },
    {
      id: 5,
      title: 'Some Answer ||',
      description: '2018 Tv Series',
      imageUrl:
        'https://static.mercdn.net/item/detail/orig/photos/m74129440846_1.jpg?1722227426',
    },
  ];
}
