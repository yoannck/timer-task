export class Task {
  id: number;
  title: string = '';
  time: number = 0;
  clock: string = '00:00:00';
  checked: boolean = false;
  total: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
