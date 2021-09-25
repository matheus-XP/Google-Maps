/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  @ViewChild ('map') mapRef: ElementRef;

  map: google.maps.Map;
  minhaPosicao: google.maps.LatLng;

  constructor(private geolocation: Geolocation) {}

  ionViewWillEnter(){
    this.exibirMapa();
  }

  exibirMapa(): void{

  const posicao = new google.maps.LatLng(-24.063506281958894, -46.552671245744186);
  const opcoes = {
    center: posicao,
    zoom: 10,
    disableDefaultUI: false,
  } ;

  this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

  this.buscarPosicao();

  }

  buscarPosicao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  irParaposicao(){
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15);

    new google.maps.Marker({
      position: this.minhaPosicao,
      map:this.map,
      title: 'Minha Posição',
      animation: google.maps.Animation.BOUNCE,
    });
  }


}
