import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
})
export class DurationPipe implements PipeTransform {

    transform(value: number): string {
        console.log({value});
        if (value === 0) {
            console.log(`end value: ${value}`);
            return '0:00';
        }
        const minutes: number = Math.floor(value / 60);
        return minutes.toString().padStart(1, '0') + ':' +
            (value - minutes * 60).toString().padStart(2, '0');
    }
}
