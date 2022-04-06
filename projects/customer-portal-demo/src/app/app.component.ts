import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  componentName: string;
  menuState: boolean;

  onActivate(componentRef) {
    setTimeout(() => {
      this.componentName = this.convertCamelToKabab(componentRef);
    }, 0);
  }

  convertCamelToKabab(str: string) {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
              .map(x => x.toLowerCase())
              .join('-');
  }

  toggleMenu(e) {
    this.menuState = e;
  }
}
