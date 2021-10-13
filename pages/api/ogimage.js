import chalk from 'chalk';
import { getContent } from '../../utils/getContent';
import { getPage } from '../../utils/getPage';

export default async function handler(req, res) {
  console.info(chalk.cyan('info'), ` - Generating Opengraph images`);

  const { title, tags, handle, logo, w, h, debug } = req.query;

  const html = getContent(tags, title, handle, logo);

  if (debug === 'true') {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    return;
  }

  try {
    const browser = await getPage();
    const page = await browser.newPage();
    await page.setViewportSize({ width: w ?? 1200, height: h ?? 630 });
    await page.setContent(html, { waitUntil: 'networkidle', timeout: 15 * 1000 });

    const buffer = await page.screenshot({ type: 'png' });

    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.setHeader('Content-Type', 'image/png');
    res.end(buffer);
  } catch (error) {
    console.error(error);
    
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
  }
}
