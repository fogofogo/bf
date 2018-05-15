export class User {
  id: number;
  email: string;
  accessToken: string;
  alias: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: any;
  phoneNumber: any;
  address: Address;
  balance: string;
}

// export class User {
//   email: string;
//   accessToken: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   dateOfBirth: any;
//   phoneNumber: any;
//   address: Address;
//   balance: number = 20;
// }

export class Address {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  city: string;
  country: string;
  postcode: string;
}
