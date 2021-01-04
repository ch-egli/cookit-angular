import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemovePrefixPipe } from './remove-prefix.pipe';
import {TruncatePipe} from './truncate.pipe';

@NgModule({
  declarations: [RemovePrefixPipe, TruncatePipe],
  imports: [
    CommonModule
  ],
  exports: [RemovePrefixPipe, TruncatePipe]
})
export class SharedModule { }
