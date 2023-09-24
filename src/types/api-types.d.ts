export interface Products {
  title: string;
  platform: keyof Platform;
  id: string;
  price: number;
  genre: string;
  developer: string;
  count: number;
  description: string;
}

export interface Platform {
  nintendoSwitch: 'Nintendo Switch';
  pc: 'PC';
  playStation4: 'PlayStation 4';
  xboxOne: 'Xbox One';
}
