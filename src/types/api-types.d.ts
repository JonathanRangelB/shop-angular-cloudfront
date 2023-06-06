export interface Products {
  /**
   * game title
   */
  title: string;
  /**
   * game platform
   */
  platform: Platform;
  id: string;
  price: number;
  genre: string;
  developer: string;
  count: number;
  description: string;
}

export enum Platform {
  nintendoSwitch = 'Nintendo Switch',
  pc = 'PC',
  playStation4 = 'PlayStation 4',
  xboxOne = 'Xbox One',
}
