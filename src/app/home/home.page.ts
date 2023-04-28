import { Component, ViewChild } from '@angular/core';
import { Md5 } from 'ts-md5';
import { Clipboard } from '@capacitor/clipboard';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  {
  @ViewChild('md5Result') md5Result!: { value: string; };
  public uppercase: boolean = false;
  constructor(private alertCtrl: AlertController) {}
  
  generateMD5(event: any){
    const text = event.target.value;
    if(text && text.trim() != '') {
      this.md5Result.value = this.textTransform(Md5.hashStr(text));
    }
  }

  async copyToClipboard(event: any){
    const text = event.target.value;
    if(text && text.trim() != '') {
      await Clipboard.write({string: text});
      await this.showAlert();
    }
  }

  async showAlert() {  
    const alert = await this.alertCtrl.create({  
      header: 'Copiado',  
      message: 'Hash copiado al portapapeles',  
      buttons: ['OK']  
    });  
    await alert.present();  
  }  

  textTransform(text: string){
    return this.uppercase == true ? text.toUpperCase() : text.toLowerCase();
  }

  toggleUppercase(event: any){
    this.uppercase = event.detail.checked;
    this.md5Result.value = this.textTransform(this.md5Result.value);
  }

}
