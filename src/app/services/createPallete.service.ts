import { Color, CssColor, Theme } from '@adobe/leonardo-contrast-colors';
import { Injectable } from '@angular/core';
import { ColorScaleType } from '../types/color-scale.type';

@Injectable({
  providedIn: 'root',
})
export class CreatePalleteService {
  createColor(hex: string, ratios: number[]) {
    return new Color({
      name: 'color',
      colorKeys: [hex as CssColor],
      ratios,
      colorspace: 'RGB',
      smooth: false,
    });
  }

  createPallete(hex: string, theme: 'dark' | 'light') {
    const color = this.createColor(
      hex,
      [15.15, 14.38, 11.86, 9.38, 7.16, 5.4, 4.5]
    );
    const color2 = this.createColor(
      hex,
      [4.88, 6.26, 7.99, 10.06, 12.5, 15.24]
    );

    const theme1 = this.createTheme(color, theme === 'dark' ? '#ebebeb' : '#141414');
    const theme2 = this.createTheme(
      color2,
      theme !== 'dark' ? '#ebebeb' : '#141414'
    );

    const colors:any = {
      100: '',
      200: '',
      300: '',
      400: '',
      500: '',
      600: '',
      700: '',
      800: '',
      900: '',
      1000: '',
      1100: '',
      1200: '',
      1300: '',
    };

    theme1.contrastColors?.[1].values.forEach((item) => {
      const name = item.name.replace('color', '') as unknown as ColorScaleType;
      colors[name] = item.value;
    });

    theme2.contrastColors?.[1].values.forEach((item) => {
      const name = item.name.replace('color', '') as unknown as ColorScaleType;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      colors[parseInt(name, 10) + 700] = item.value;
    });

    return colors;
  }

  createTheme(color: Color, backgroundColor: string) {
    return new Theme({
      colors: [color],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      backgroundColor,
      lightness: 100,
      contrast: 1,
      saturation: 100,
      output: 'HEX',
      formula: 'wcag2',
    });
  }
}
