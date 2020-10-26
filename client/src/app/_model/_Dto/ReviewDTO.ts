import { IReview } from '../_Interface/IReview';

export class AddReviewDTO implements IReview {
  receiverId: string;
  senderId: string;
  stars: number;
  created: Date = new Date(Date.now());
  content: string;
}
export class AllReviewDTO implements IReview {
  receiverId: string;
  senderId: string;
  stars: number;
  created: Date = new Date(Date.now());
  content: string;
}
