import { onRequest as scrapeHandler } from './functions/api/scrape';
import { onRequest as parseHtmlHandler } from './functions/api/parse-html';
import { onRequest as aiAnalyzeHandler } from './functions/api/ai-analyze';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // API Routes
    if (url.pathname === '/api/scrape' || url.pathname === '/api/scrape/') {
      return scrapeHandler({ request, env });
    }
    
    if (url.pathname === '/api/parse-html' || url.pathname === '/api/parse-html/') {
      return parseHtmlHandler({ request, env });
    }

    if (url.pathname === '/api/ai-analyze' || url.pathname === '/api/ai-analyze/') {
      return aiAnalyzeHandler({ request, env });
    }

    // Serve static assets via Cloudflare Workers Assets
    if (env.ASSETS) {
      let response = await env.ASSETS.fetch(request);
      // Fallback for Single Page Application (SPA) routing (e.g. refresh on subpages)
      if (response.status === 404 && !url.pathname.startsWith('/api/')) {
        const indexReq = new Request(new URL('/index.html', request.url), request);
        response = await env.ASSETS.fetch(indexReq);
      }
      return response;
    }

    return new Response('Not Found', { status: 404 });
  }
};
