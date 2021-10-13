import Playwright from 'playwright-aws-lambda';

let page;

const isDev = process.env.NODE_ENV === 'development';

export const getPage = async () => {
  if (page) {
    return page;
  }

  page = await Playwright.launchChromium();

  return page;
};
