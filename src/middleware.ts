import { defineMiddleware } from 'astro:middleware';

// Affiche la cause d'une erreur de l'admin au lieu d'une page 500 vide.
export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.url.pathname.startsWith('/api/keystatic')) return next();
  try {
    return await next();
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('[keystatic]', e);
    return new Response(`Erreur admin : ${message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
});
