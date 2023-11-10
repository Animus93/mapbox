import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: mapboxgl.Map;
  private token = mapboxgl;
  private draw!: MapboxDraw;

  ngAfterViewInit() {
    this.token.accessToken = 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [37.6175, 55.7514],
      zoom: 12
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });
    this.map.addControl(this.draw);

    this.map.on('draw.create', (event) => this.updateArea(event));
    this.map.on('draw.delete', (event) => this.updateArea(event));
    this.map.on('draw.update', (event) => this.updateArea(event));
  }

  updateArea(e: any) {
    const data = this.draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data && data.features.length > 0) {
      const area = turf.area(data);
      const rounded_area = Math.round(area * 100) / 100;
      answer!.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
    } else {
      answer!.innerHTML = '';
      if (e.type !== 'draw.delete') {
        alert('Click the map to draw a polygon.');
      }
    }
  }
}
