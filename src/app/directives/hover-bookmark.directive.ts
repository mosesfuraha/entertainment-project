import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverBookmark]',
  standalone:true
})
export class HoverBookmarkDirective {
  @Input() isBookmarked: boolean = false;
  @Input() emptyIconSrc: string = '';
  @Input() fullIconSrc: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isBookmarked) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'src',
        this.fullIconSrc
      );
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.isBookmarked) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        'src',
        this.emptyIconSrc
      );
    }
  }
}
