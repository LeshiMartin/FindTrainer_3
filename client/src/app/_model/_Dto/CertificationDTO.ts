import { ICertification } from '../_Interface/ICertifications';

export class AllCertificationsDTO implements ICertification {
  description: string;
  title: string;
  created: Date;
  expired: Date;
  trainerId: string;
  organization: string;
}

export class AddCertificationDTO implements ICertification {
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
