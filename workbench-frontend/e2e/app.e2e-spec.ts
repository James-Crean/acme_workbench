import { WorkbenchFrontendPage } from './app.po';

describe('workbench-frontend App', () => {
  let page: WorkbenchFrontendPage;

  beforeEach(() => {
    page = new WorkbenchFrontendPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
