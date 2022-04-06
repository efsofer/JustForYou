import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeSpaces'
})
export class EncodeSpacesPipe implements PipeTransform {

  transform(value: string): string {
    if (value) return value.replace(/\s/g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
    return value;
  }

}
