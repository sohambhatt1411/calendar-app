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
    // this.loadimg('https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/frame_Image/1722226819335'); 
    // this.loadimg('https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/banner/1718165539464');   
    // this.loadimg('https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/trending/1727166760746.jpg');
    this.loadimg('https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/trending/1727166760746.jpg');
    
    // this.loadimg('https://images.unsplash.com/photo-1725744064239-d14c134dee94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8');

    
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

    var rand = '?'+Math.random();
    // var no_cors = new Image();
    // no_cors.onload = () =>{
    //   var with_cors = new Image();
    //   with_cors.crossOrigin = 'anonymous';
    //   with_cors.src = no_cors.src;
    //   with_cors.onload = ()=>{
    //     this.imageNode = new Konva.Image({
    //       image: with_cors,
    //       x: 50,
    //       y: 50,
    //       width: 400,
    //       height: 300,
    //       draggable:true
    //     });
  
  
  
    //     this.layer.add(this.imageNode);
  
    //     this.layer.draw();
    //   };
    //   with_cors.onerror = () =>{
        
    //   };
    // };
    // no_cors.src = img + rand;

    const imageObj = new Image();
    imageObj.crossOrigin = 'anonymous';  // Enable cross-origin for image loading
    imageObj.src = img + rand;  // Load image through the proxy
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
      const img2 = new Image();
      img2.crossOrigin = 'anonymous';  // Enable cross-origin for image loading
      img2.src = "https://socialmediauploadv1.s3.ap-south-1.amazonaws.com/frame_Image/1727201160855.png";  // Load image through the proxy
      img2.onload = () => {
        const imageNode2 = new Konva.Image({
          image: img2,
          x: 50,
          y: 50,
          width: 400,
          height: 300,
          draggable:true
        });
        this.layer.add(imageNode2);

        this.layer.draw();
      }
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
