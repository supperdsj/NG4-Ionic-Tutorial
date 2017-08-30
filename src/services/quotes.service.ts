import {Quote} from "../data/quotes.interface";

export class QuotesService {
  private favoriteQuotes: Quote[] = [];

  addQuoteToFavorite(quote: Quote) {
    this.favoriteQuotes.push(quote);
    console.log(this.favoriteQuotes);
  }

  removeQuoteFromFavorite(quote: Quote) {
    const position = this.favoriteQuotes.findIndex(q => q.id === quote.id);
    this.favoriteQuotes.splice(position, 1);
  }
  getFavoriteQuotes(){
     return this.favoriteQuotes.slice();
  }
  isQuoteFavorite(quote:Quote){
    return this.favoriteQuotes.find((q:Quote)=>{
      return q.id===quote.id
    });
  }
}
