import { chromium as Playwright } from 'playwright-core';
import chrome from 'chrome-aws-lambda';

let page;

const isDev = process.env.NODE_ENV === 'development';

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export const getPage = async () => {
  if (page) {
    return page;
  }

  const getOptions = async () => {
    let options;
    if (isDev) {
      options = {
        args: [],
        executablePath: exePath,
        headless: true,
      };
    } else {
      options = {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      };
    }

    return options;
  };

  const options = await getOptions();
  page = await Playwright.launch({
    ...options,
  });

  return page;
};
