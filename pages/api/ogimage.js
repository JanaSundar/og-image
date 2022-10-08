import playwright from 'playwright-core';
import chromium from 'chrome-aws-lambda';

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

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
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    };
  }

  return options;
};

export default async function handler(req, res) {
  try {
    const { title, color, background } = req.query;
    const isDev = process.env.NODE_ENV === 'development';
    const baseUrl = isDev ? 'http://localhost:3000' : `https://${process.env.VERCEL_URL}`;

    const qs = new URLSearchParams({
      title,
      color,
      background,
    });
    const url = `${baseUrl}?${qs.toString()}`;
    const options = await getOptions();

    const browser = await playwright.chromium.launch({
      ...options,
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(url, {
      timeout: 15 * 1000,
    });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();

    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.setHeader('Content-Type', 'image/png');
    res.end(buffer);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
  }
}
