import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CreatePalleteService } from './services/createPallete.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sideNav', { static: false }) sideNav!: ElementRef;
  private themeElement: HTMLLinkElement | null = null;

  isMobile: boolean = false;
  isMediumDesktop: boolean = false;

  title = 'poc-newds-angular';
  messages: string[] = [];
  collapse: boolean = false;
  sideNavWidth!: number;
  themeActive: 'dark' | 'light' = 'dark';
  customization = {
    systemPrimaryColor: null,
    systemSecondaryColor: null,
  };
  isCompanyTeddy: boolean = true;

  constructor(
    private CreatePalleteService: CreatePalleteService,
    private themeService: ThemeService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeElement = document.createElement('link');
    this.themeElement.rel = 'stylesheet';
    document.head.appendChild(this.themeElement);
    this.alterTheme({ detail: 'dark' });
    this.checkIfMobile(true);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile(false);
  }

  checkIfMobile(initialEvent: boolean) {
    this.isMobile = window.innerWidth < 1366;
    this.isMediumDesktop =
      window.innerWidth >= 1366 && window.innerWidth < 1767;
    if (initialEvent && (this.isMobile || this.isMediumDesktop)) {
      this.collapse = true;
    }
  }

  alterTheme(theme: any) {
    this.themeActive = theme.detail === 'system' ? 'dark' : theme.detail;

    const cssPrimary = document.createElement('style');
    let palette;
    if (this.customization?.systemPrimaryColor) {
      palette = this.CreatePalleteService.createPallete(
        this.customization?.systemPrimaryColor,
        theme
      );
      this.isCompanyTeddy = false;
    } else {
      this.isCompanyTeddy = true;
    }

    cssPrimary.innerHTML = `
    ${this.themeService.themeVariables(
      this.themeActive,
      palette,
      this.isCompanyTeddy
    )}
      `;

    document.body.appendChild(cssPrimary);
  }

  alterCollapse() {
    if (this.isMobile) {
      console.log('é mobile');
      this.collapse = true;
      return;
    }
    this.collapse = !this.collapse;
  }

  openSideNavigationMobile() {
    this.collapse = false;
  }
}
