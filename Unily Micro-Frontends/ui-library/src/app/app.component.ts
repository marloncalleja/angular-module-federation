import { Component } from '@angular/core';
import { ButtonService } from 'src/button/button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ui-library';

  constructor(private readonly buttonService: ButtonService) {}

  public incrementClickCount(): void {
    this.buttonService.incrementClickCount();
  }

  public getClickCount(): string {
    return this.buttonService.clickCount.toString();
  }
}
