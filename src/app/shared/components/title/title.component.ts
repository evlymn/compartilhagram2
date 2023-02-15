import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title = '';
  @Input() marginTop = '';

  ngOnInit(): void {
    this.marginTop = this.marginTop.trim().length > 0 ? 'margin-top: ' + this.marginTop + 'px' : '';
  }

}
