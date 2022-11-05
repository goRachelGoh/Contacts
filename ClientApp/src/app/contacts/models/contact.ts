import { Address } from './address';
import { Email } from './email';
import { Phone } from './phone';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  addresses: Address[];
  emailAddresses: Email[];
  phoneNumbers: Phone[];
}
