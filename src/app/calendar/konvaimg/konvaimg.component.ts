import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';
import { ImageConverterService } from '../../service/image-converter.service';

// const imageToBase64 = require('image-to-base64');
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
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  base64?:string = "";

  constructor(private imageConverterService: ImageConverterService) { }

  ngAfterViewInit() {
    this.initKonva();
    this.loadimg('https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/banner/1718165539464');  // Replace with actual image URL
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



  loadimg(img:any){
    const imageObj = new Image();
    imageObj.crossOrigin = 'anonymous';  // Enable cross-origin for image loading
    imageObj.src = img;  // Load image through the proxy
    imageObj.onload = () => {
      this.imageNode = new Konva.Image({
        image: imageObj,
        x: 50,
        y: 50,
        width: 400,
        height: 300,
        draggable:true
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
