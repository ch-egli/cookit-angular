import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemovePrefixPipe } from './remove-prefix.pipe';

@NgModule({
  declarations: [RemovePrefixPipe],
  imports: [
    CommonModule
  ],
  exports: [RemovePrefixPipe]
})
export class SharedModule { }
