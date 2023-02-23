import { Component, OnInit } from '@angular/core';
import {
  faGears,
  faHouse,
  faList,
  faMoon,
  faSun,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  public faGears = faGears;
  public faMoon = faMoon;
  public faSun = faSun;
  public faHouse = faHouse;
  public faUserPlus = faUserPlus;
  public faList = faList;
  constructor() {}

  ngOnInit(): void {}
}
