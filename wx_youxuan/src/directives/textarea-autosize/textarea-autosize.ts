import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: 'ion-textarea[autosize]'
})
export class TextareaAutosizeDirective {
    @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
        this.adjust()
    }

    constructor(public element: ElementRef) {
    }

    ngAfterViewInit() {
        this.adjust()
    }

    adjust(): void {
        let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = (textArea.scrollHeight + 32) + "px";
    }

}
