// Feed self-contained Anidoodle pages into a blank browser document.
// Managed Chromium disallows file:// navigation. Node reads the local generated HTML;
// Playwright setContent preserves the engine's scripts and offline-request checks.
import {chromium} from '../engine/anidoodle/engine/node_modules/playwright-core/index.mjs';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep} from 'node:path';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const launch=chromium.launch.bind(chromium);
chromium.launch=async(...args)=>{
  const browser=await launch(...args);
  const newContext=browser.newContext.bind(browser);
  browser.newContext=async(...opts)=>{
    const context=await newContext(...opts);
    const newPage=context.newPage.bind(context);
    context.newPage=async(...params)=>{
      const page=await newPage(...params);
      const goto=page.goto.bind(page);
      page.goto=async(url,...options)=>{
        if(!url.startsWith('file:'))return goto(url,...options);
        const path=fileURLToPath(new URL(url));
        if(!path.startsWith(root+sep))throw new Error('Local page outside studio');
        await page.setContent(await readFile(path,'utf8'),{waitUntil:'load'});
        return null;
      };
      return page;
    };
    return context;
  };
  return browser;
};
