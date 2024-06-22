import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateStars'
})
export class GenerateStarsPipe implements PipeTransform {

  transform(index: number): string {
    const maxStars = 5;
    const starsCount = maxStars - index;
    const fullStars = '<span class="star full">★</span>'.repeat(Math.max(starsCount, 0));
    const emptyStars = '<span class="star empty">☆</span>'.repeat(Math.max(maxStars - starsCount, 0));
    return fullStars + emptyStars;
  }

}
