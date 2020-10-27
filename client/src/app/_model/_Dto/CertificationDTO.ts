import { ICertification } from '../_Interface/ICertifications';

export class CertificationDTO implements ICertification {
  constructor(description: string, title: string) {
    this.description = description;
    this.title = title;
  }
  description: string;
  title: string;
  created: Date = new Date(Date.now());
  expired: Date;
  trainerId: string;
  organization: string;
}
