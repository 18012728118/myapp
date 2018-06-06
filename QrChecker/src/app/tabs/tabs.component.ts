import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styles: []
})
export class TabsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  link(n) {
    if (n === 1)
      this.router.navigate([""]);
    else
      this.router.navigate(['setting'])
  }
}
