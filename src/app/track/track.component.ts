import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const iframe = document.getElementById('mlflow-iframe') as HTMLIFrameElement;

    iframe.onload = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        const style = iframeDoc.createElement('style');
        style.textContent = `
          .navbar {
            display: none !important;
          }
        `;
        iframeDoc.head.appendChild(style);
      }
    };
  }
}