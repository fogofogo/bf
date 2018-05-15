
import { RoundPipe } from './round.pipe';
import { NgModule }      from '@angular/core';


 @NgModule({
     imports:        [],
     declarations:   [RoundPipe],
     exports:        [RoundPipe],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 } 
 