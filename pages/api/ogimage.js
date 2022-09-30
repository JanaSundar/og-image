import chalk from 'chalk';
import { getPage } from '../../utils/getPage';

export default async function handler(req, res) {
  console.info(chalk.cyan('info'), ` - Generating Opengraph images`);

  const { debug, color, background, title } = req.query;

  if (debug === 'true') {
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    return;
  }

  const searchParam = new URLSearchParams({
    color,
    background,
    title,
  });

  const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://og-image.janasundar.dev';
  const url = `${origin}/?${searchParam.toString()}`;

  try {
    const page = await getPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.evaluateHandle('document.fonts.ready');
    const buffer = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });

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
