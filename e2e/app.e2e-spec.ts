import { OptikkyPage } from './app.po';

describe('optikky App', function() {
  let page: OptikkyPage;

  beforeEach(() => {
    page = new OptikkyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
