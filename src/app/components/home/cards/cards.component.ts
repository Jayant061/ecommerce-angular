import { Component, Input } from '@angular/core';
import { HomeCard, HomeCardData } from '../homeCard.model';
import { CardComponent } from "./card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent,RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
@Input({required:true}) cardsData!:HomeCardData;
}
