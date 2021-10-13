import chalk from 'chalk';
import { getContent, getCss } from '../../utils/getContent';
import { getPage } from '../../utils/getPage';

export default async function handler(req, res) {
  console.info(chalk.cyan('info'), ` - Generating Opengraph images`);

  const { title, tags, handle, logo, debug, fontFamily, fontSize, background, fontFamilyUrl } = req.query;

  const css = getCss(fontFamily, fontFamilyUrl, fontSize, background);
  const html = getContent(tags, title, handle, logo, css);

  if (debug === 'true') {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    return;
  }

  try {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(html, { waitUntil: 'networkidle2', timeout: 15000 });

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
