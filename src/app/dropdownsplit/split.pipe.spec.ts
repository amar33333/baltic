import { SplitPipe } from './split.pipe';

describe('SplitPipe', () => {

  it('should test for spliting dropdown value', () => {
    
    const pipe = new SplitPipe();
    expect(pipe).toBeTruthy();
var value = 'ABCD#123456 DKK';
expect(pipe.transform('')).toBe(undefined,'empty');
expect(pipe.transform('','acctext')).toBe('','empty');
expect(pipe.transform(value,'acctext')).toBe('ABCD','empty');
expect(pipe.transform(value,'accnumb')).toBe('123456 DKK','empty');
  });
});
