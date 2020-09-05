import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  descSort = [
    'stargazers_count',
    'watchers_count',
    'forks_count',
    'updated_at',
  ];
  transform(dataList: any[], column: string): any {
    //sorts owner in ascending order
    //sorts columns not in descSort array in ascending order
    //sorts columns in descSort array in descending order
    dataList.sort((a, b) => {
      if (column == 'owner.login') {
        console.log(a['owner']['login']);
        if (a['owner']['login'] > b['owner']['login']) {
          return 1;
        } else if (a['owner']['login'] < b['owner']['login']) {
          return -1;
        } else {
          return 0;
        }
      } else if (this.descSort.indexOf(column) !== -1) {
        //a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0;
        if (a[column] > b[column]) {
          return -1;
        } else if (a[column] < b[column]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[column] > b[column]) {
          return 1;
        } else if (a[column] < b[column]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return dataList;
  }
}
