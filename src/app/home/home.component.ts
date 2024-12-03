import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isMobileNavActive = false;
  currentSection = 'hero';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  toggleMobileNav(): void {
    this.isMobileNavActive = !this.isMobileNavActive;
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isMobileNavActive = false;
      this.currentSection = sectionId;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const sections = ['hero', 'about', 'services', 'partners', 'contact'];
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          this.currentSection = sectionId;
          break;
        }
      }
    }
  }
}
