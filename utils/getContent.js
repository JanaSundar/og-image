import { readFileSync } from 'fs';
import path from 'path';


const imagePath = path.resolve(process.cwd(), 'public');
const image = readFileSync(`${imagePath}/logo.svg`).toString('base64');
const background = readFileSync(`${imagePath}/ogbackground.svg`).toString('base64')



const getCss = () => {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    color: white;
    }

    .container {
    background: url(data:image/svg+xml;base64,${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 1200px;
    height: 630px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    }

    .content {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 2.5rem;
    }

    .content > h1 {
    max-width: 80%;
    font-size: 2em;
    }

    .logo {
    display: flex;
    justify-content: space-between;
    font-size: 1.5em;
    align-items: center;
    font-weight: bold;
    width: 100%;
    }

    .tags {
    font-size: 0.4em;
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    padding: 2rem 0;
    opacity: 0.7;
    }
    `;
}



export const getContent = (tags, title, handle, logo) => {
  return `
    <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
       ${getCss()}
    </style>
    <body>
        <div class='container'>

        <div class="content">
            <h1>${title}</h1>
            <div class="tags">
            ${
              tags &&
              tags
                .split(',')
                .map((tag) => {
                  return `<span key=${tag}>#${tag}</span>`;
                })
                .join('')
            }
            </div>
        </div>
        <div class="logo">
            <img src="${logo ?? `data:image/svg+xml;base64,${image}`}" alt="logo" width="100px" height="100px" >
            <div class="handle">${handle ?? '@Jana__Sundar'}</div>
        </div>
        </div>
    </body>
    </html>`;
};
