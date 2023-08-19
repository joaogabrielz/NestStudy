export class SessionDto {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  
  accessToken: string;
}