import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map!: mapboxgl.Map;
  private token = mapboxgl;
  private draw!: MapboxDraw;

  ngAfterViewInit() {
    this.token.accessToken =
      'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [37.6175, 55.7514],
      zoom: 12,
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: true,
      defaultMode: 'draw_polygon',
    });
    this.map.addControl(this.draw, 'top-left');
  }
}
