// Service Worker para o App de Treino
const CACHE_NAME = 'treino-app-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'icons/icon-96.png',
  'icons/icon-144.png',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Instala o Service Worker e cacheia os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos cacheados com sucesso');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Erro no cache:', err))
  );
});

// Intercepta as requisições e serve do cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache ou busca na rede
        return response || fetch(event.request);
      })
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});