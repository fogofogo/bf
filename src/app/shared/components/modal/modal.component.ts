import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;

  constructor() { }

  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
    this.visibleAnimate = true
  }

  public hide(): void {
    this.visible = false
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
