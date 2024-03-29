import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Output('click') click = new EventEmitter();
  @Input('src') src!: string
  @Input('alt') alt?: string;
  @Input('title') title?: string;
  @Input('avatarStyle') avatarStyle?: string;
  @Input('avatarClass') avatarClass?: string;

  ngOnInit(): void {

  }



}
