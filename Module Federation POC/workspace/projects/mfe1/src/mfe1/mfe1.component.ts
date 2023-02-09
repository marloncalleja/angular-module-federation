import { Component } from '@angular/core';

@Component({
  selector: 'mfe1',
  template: '<div>Lazily loaded remote module: {{title}}</div>'
})
export class Mfe1Component {
  title = 'mfe1';
}
