import {animate, state, style, transition, trigger} from '@angular/animations';

export const FloatingMenuAnimations = [
  trigger('openCloseActions', [
    state('open',
      style({
        opacity: 1,
      //  height: '40px',
        //width: '40px'
      })
    ),
    state('closed', style({
      opacity: 0,
     // height: '0px',
   //   width: '0px'
    })),
    transition('open => closed', [
      animate('.5s',
      ),
    ]),
    transition('closed => open', [
      animate('.5s',
      ),
    ]),
  ]),


  trigger('openCloseFields', [
    state('open',
      style({
        opacity: 1,
      })
    ),
    state('closed', style({
      opacity: 0,
    //  height: '0px',
     // width: '0px'
    })),
    transition('open => closed', [
      animate('.6s'),

    ]),
    transition('closed => open', [
      animate('.6s',
      ),
    ]),
  ]),
]

export default FloatingMenuAnimations;
