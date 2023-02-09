import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'old-ui-library';

  public onClick() {
    console.log('click old button');
  }
}
