import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
@Component({
  selector: 'app-konvaimg',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './konvaimg.component.html',
  styleUrl: './konvaimg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KonvaimgComponent implements AfterViewInit { 
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  imageNode!: Konva.Image;

  ngAfterViewInit() {
    this.initKonva();
    this.loadImage('https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg');  // Replace with actual image URL
  }

  // Initialize Konva stage and layer
  initKonva() {
    this.stage = new Konva.Stage({
      container: this.containerRef.nativeElement,  // Use the HTML container
      width: 800,
      height: 600
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  // Load image from URL
  loadImage(imageUrl: string) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const imageObj = new Image();
    imageObj.crossOrigin = 'anonymous';  // Enable cross-origin for image loading
    imageObj.src = proxyUrl + imageUrl;  // Load image through the proxy
    imageObj.onload = () => {
      this.imageNode = new Konva.Image({
        image: imageObj,
        x: 50,
        y: 50,
        width: 400,
        height: 300
      });
  
      this.layer.add(this.imageNode);
      this.layer.draw();
    };
  }
  

  // Download the canvas as an image
  download() {
    const dataURL = this.stage.toDataURL({ pixelRatio: 2 });  // Increase pixel ratio for higher resolution
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
