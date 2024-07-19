import { Component, Input } from '@angular/core';
import { HomeCard } from '../../homeCard.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input({required:true}) cardData !: HomeCard;

get imagepath(){
  return "../../../../../assets/"+ this.cardData.img;
}

}
