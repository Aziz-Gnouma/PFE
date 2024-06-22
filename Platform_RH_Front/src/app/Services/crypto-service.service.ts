import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoServiceService {

  private readonly key: string = 'your_secret_key'; // Replace with your own secret key

  constructor() { }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }

  decrypt(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
