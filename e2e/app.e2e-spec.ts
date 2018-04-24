import { BalticPaymentsPage } from './app.po';

describe('baltic-payments App', () => {
  let page: BalticPaymentsPage;

  beforeEach(() => {
    page = new BalticPaymentsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
