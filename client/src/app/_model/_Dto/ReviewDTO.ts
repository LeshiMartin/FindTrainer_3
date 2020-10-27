import { IReview } from '../_Interface/IReview';

export class ReviewDTO implements IReview {
  receiverId: string;
  senderId: string;
  stars: number;
  created: Date = new Date(Date.now());
  content: string;
}
