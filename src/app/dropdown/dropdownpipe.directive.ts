import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer
} from '@angular/core';

@Directive({
  selector: '[appDropdownpipe],[appDropdownpipe1]'
})
export class DropdownpipeDirective implements OnChanges {
  @Input() appDropdownpipe: any;
  @Input() appDropdownpipe1: any;

  ngOnChanges() {
    if (this.appDropdownpipe) {
      let x = document.getElementById('sender');
      if (x) {
        let label = x.querySelector('.ui-dropdown-label');
        if (label) {
          label.innerHTML = '<div class= dDaccText>' + this.appDropdownpipe.split('#')[0] +
            '<div class = dDAccNumber>' + this.appDropdownpipe.split('#')[1] + '</div></div>'
        }
      }
    }
    if (this.appDropdownpipe1) {
      let y = document.getElementById('benAccount');
      if (y) {
        let label1 = y.querySelector('.ui-dropdown-label');
        if (label1) {
          label1.innerHTML = '<div class= dDaccText>' + this.appDropdownpipe1.split('#')[0] +
            '<div class = dDAccNumber>' + this.appDropdownpipe1.split('#')[1] + '</div></div>'
        }
      }
    }
  }
  ngDoCheck() {
    this.ngOnChanges();
  }
}

