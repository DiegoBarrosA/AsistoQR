import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  camaraObs = new BehaviorSubject([]);
  base64Image:any;
  constructor(private camera: Camera) { }
  tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
       this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.camaraObs.next(this.base64Image);
    }, (err) => {
      // Handle error
    });
  }
  fetchFoto(): Observable<any>{
return this.camaraObs.asObservable();
  }
}
