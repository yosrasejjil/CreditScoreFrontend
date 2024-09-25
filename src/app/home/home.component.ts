/* import { Component, AfterViewInit, Renderer2 } from '@angular/core';
// Import the external libraries
import 'bootstrap';
//import AOS from 'aos';
import GLightbox from 'glightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupScrolledClass();
    this.setupMobileNavToggle();
    this.setupHideMobileNav();
    this.setupNavDropdowns();
    this.setupPreloader();
    this.setupScrollTopButton();
    this.setupAOS();
    this.setupGLightbox();
    this.setupFAQToggle();
  }

  private setupScrolledClass(): void {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    const toggleScrolled = () => {
      if (!selectHeader.classList.contains('scroll-up-sticky') &&
          !selectHeader.classList.contains('sticky-top') &&
          !selectHeader.classList.contains('fixed-top')) {
        return;
      }
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    };

    this.renderer.listen('window', 'scroll', toggleScrolled);
    this.renderer.listen('window', 'load', toggleScrolled);
  }

  private setupMobileNavToggle(): void {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    const mobileNavToggle = () => {
      this.renderer.selectRootElement('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    };

    this.renderer.listen(mobileNavToggleBtn, 'click', mobileNavToggle);
  }

  private setupHideMobileNav(): void {
    const navmenuLinks = document.querySelectorAll('#navmenu a');

    navmenuLinks.forEach(navmenu => {
      this.renderer.listen(navmenu, 'click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          this.setupMobileNavToggle();
        }
      });
    });
  }

  private setupNavDropdowns(): void {
    const dropdowns = document.querySelectorAll('.navmenu .toggle-dropdown');

    dropdowns.forEach(dropdown => {
      this.renderer.listen(dropdown, 'click', (e) => {
        e.preventDefault();
        const parent = dropdown.parentNode as HTMLElement;
        const nextSibling = parent.nextElementSibling as HTMLElement;
        parent.classList.toggle('active');
        nextSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  private setupPreloader(): void {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      this.renderer.listen('window', 'load', () => {
        preloader.remove();
      });
    }
  }

  private setupScrollTopButton(): void {
    const scrollTop = document.querySelector('.scroll-top');

    const toggleScrollTop = () => {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    };

    this.renderer.listen(scrollTop, 'click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    this.renderer.listen('window', 'scroll', toggleScrollTop);
    this.renderer.listen('window', 'load', toggleScrollTop);
  }

  private setupAOS(): void {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  private setupGLightbox(): void {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  private setupFAQToggle(): void {
    const faqItems = document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle');

    faqItems.forEach(faqItem => {
      this.renderer.listen(faqItem, 'click', () => {
        const parent = faqItem.parentNode as HTMLElement;
        parent.classList.toggle('faq-active');
      });
    });
  }
}
 */