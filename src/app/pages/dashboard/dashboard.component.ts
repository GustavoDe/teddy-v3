import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  @ViewChild('cardSlider', { static: false }) cardSlider!: ElementRef;
  @ViewChild('metricsSlider', { static: false }) metricsSlider!: ElementRef;
  @ViewChild('metricsContainer', { static: false })
  metricsContainer!: ElementRef;
  @ViewChild('cardsSlider', { static: false }) cardsSlider!: ElementRef;
  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  isMobile: boolean = false;

  sizeBanner: string = '';

  ngAfterViewInit(): void {
    this.initSlider(this.slider, this.cardSlider);
    this.initSlider(this.metricsSlider, this.metricsContainer);
    this.initSlider(this.cardsSlider, this.cardContainer);
    this.checkIfMobile();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
    this.typeBanner(window.innerWidth);
  }

  typeBanner(width: number) {
    if (width <= 768) {
      this.sizeBanner = 'small';
      return;
    }
    if (width > 768 && width <= 1366) {
      this.sizeBanner = 'large';
      return;
    }

    this.sizeBanner = 'huge';
  }

  initSlider(slider: ElementRef, content: ElementRef) {
    const sliderElem = slider.nativeElement;
    const contentElem = content.nativeElement;

    sliderElem.addEventListener('mousedown', (e: MouseEvent) =>
      this.handleMouseDown(e, sliderElem, contentElem)
    );
    sliderElem.addEventListener('mouseleave', () =>
      this.handleMouseLeave(sliderElem)
    );
    sliderElem.addEventListener('mouseup', () =>
      this.handleMouseUp(sliderElem)
    );
    sliderElem.addEventListener('mousemove', (e: MouseEvent) =>
      this.handleMouseMove(e, sliderElem, contentElem)
    );

    sliderElem.addEventListener('touchstart', (e: TouchEvent) =>
      this.handleTouchStart(e, sliderElem, contentElem)
    );
    sliderElem.addEventListener('touchmove', (e: TouchEvent) =>
      this.handleTouchMove(e, sliderElem, contentElem)
    );
    sliderElem.addEventListener('touchend', () =>
      this.handleTouchEnd(sliderElem)
    );
  }

  handleMouseDown(
    e: MouseEvent,
    sliderElem: HTMLElement,
    contentElem: HTMLElement
  ) {
    this.isDown = true;
    this.startX = e.pageX - sliderElem.offsetLeft;
    this.scrollLeft = contentElem.style.transform
      ? parseInt(
          contentElem.style.transform
            .replace('translateX(', '')
            .replace('px)', '')
        )
      : 0;
    sliderElem.classList.add('active');
  }

  handleMouseLeave(sliderElem: HTMLElement) {
    this.isDown = false;
    sliderElem.classList.remove('active');
  }

  handleMouseUp(sliderElem: HTMLElement) {
    this.isDown = false;
    sliderElem.classList.remove('active');
  }

  handleMouseMove(
    e: MouseEvent,
    sliderElem: HTMLElement,
    contentElem: HTMLElement
  ) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderElem.offsetLeft;
    const walk = x - this.startX;
    let newTransform = this.scrollLeft + walk;

    const maxTranslate = -(contentElem.scrollWidth - sliderElem.offsetWidth);
    if (newTransform > 0) {
      newTransform = 0;
    } else if (newTransform < maxTranslate) {
      newTransform = maxTranslate;
    }

    contentElem.style.transform = `translateX(${newTransform}px)`;
  }

  handleTouchStart(
    e: TouchEvent,
    sliderElem: HTMLElement,
    contentElem: HTMLElement
  ) {
    this.isDown = true;
    const touch = e.touches[0];
    this.startX = touch.pageX - sliderElem.offsetLeft;
    this.scrollLeft = contentElem.style.transform
      ? parseInt(
          contentElem.style.transform
            .replace('translateX(', '')
            .replace('px)', '')
        )
      : 0;
    sliderElem.classList.add('active');
  }

  handleTouchMove(
    e: TouchEvent,
    sliderElem: HTMLElement,
    contentElem: HTMLElement
  ) {
    if (!this.isDown) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - sliderElem.offsetLeft;
    const walk = x - this.startX;
    let newTransform = this.scrollLeft + walk;

    const maxTranslate = -(contentElem.scrollWidth - sliderElem.offsetWidth);
    if (newTransform > 0) {
      newTransform = 0;
    } else if (newTransform < maxTranslate) {
      newTransform = maxTranslate;
    }

    contentElem.style.transform = `translateX(${newTransform}px)`;
  }

  handleTouchEnd(sliderElem: HTMLElement) {
    this.isDown = false;
    sliderElem.classList.remove('active');
  }
}
