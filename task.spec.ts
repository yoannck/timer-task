import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Task } from './task';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let task = new Task({
      title: 'hello',
      checked: true
    });
    expect(task.title).toEqual('hello');
    expect(task.checked).toEqual(true);
  });

});
