import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
    let value = '2017/01/17';
    let arg1 = 'yyyy.MM.dd'
    expect(pipe.transform(value, arg1)).toBe('2017.01.17', 'TestCase-1');
    let arg2 = 'dd.MM.yyyy'
    expect(pipe.transform(value, arg2)).toBe('17.01.2017', 'TestCase-2');
    let arg3 = 'MM/dd/yyyy'
    expect(pipe.transform(value, arg3)).toBe('01/17/2017', 'TestCase-3');
    let arg4 = 'yyyy-MM-dd'
    expect(pipe.transform(value, arg4)).toBe('2017-01-17', 'TestCase-4');
    let arg5 = 'dd-MM-yyyy'
    expect(pipe.transform(value, arg5)).toBe('17-01-2017', 'TestCase-5');
    expect(pipe.transform(value)).toBe('2017.01.17', 'TestCase-6');

  });
});
