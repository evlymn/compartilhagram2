import {animate, state, style, transition, trigger} from '@angular/animations';

export const HomeAnimations = [
  trigger('openCloseActions', [
    state('open',
      style({
       opacity: 1,
         //transform: 'scale(1)'
        height: '50px',
        //width: '40px'
      })
    ),
    state('closed', style({
      opacity: 0,
     //transform: 'scale(0)'
      height: '0px',
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


  trigger('openCloseMargin', [
    state('open',
      style({
        opacity: 1,
        marginTop:45
      })
    ),
    state('closed', style({
      opacity: 0,
      marginTop:0
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

  trigger('openCloseMenuMobile', [
    state('open',
      style({
        opacity: 1,
        // height: 'auto',
        // display: 'block',
       // marginTop:45
      })
    ),
    state('closed', style({
      opacity: 0,
    //  display: 'none',
    //  marginTop:0
      height: '0px',
      // transform: 'scale(0)'
      // display: 'none'

      // width: '0px'
    })),
    transition('open => closed', [
      animate('.5s'),

    ]),
    transition('closed => open', [
      animate('.5s',
      ),
    ]),
  ]),
]

export default HomeAnimations;
