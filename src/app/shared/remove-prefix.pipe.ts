import { Pipe, PipeTransform } from '@angular/core';
/*
 * Removes any prefix separated by a dash ('-') from the value.
*/
@Pipe({name: 'removePrefix'})
export class RemovePrefixPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(value.indexOf("-") + 1);
  }
}
