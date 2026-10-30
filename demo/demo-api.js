/*
 * Mode démo de Kanap.
 * L’API Node/Express du projet (http://localhost:3000/api/products) est simulée
 * dans le navigateur : le catalogue vient de products.json et les commandes
 * sont validées localement, sans rien envoyer.
 */
(function () {
  'use strict';

  var API_URL = /^https?:\/\/localhost:3000\/api\/products(?:\/([^\/?#]+))?\/?(?:[?#].*)?$/;
  var BANNER_KEY = 'kanap_demo_banner';
  var ROOT = new URL('../', document.currentScript.src).href;
  var nativeFetch = window.fetch.bind(window);
  var catalog = null;

  /* Le catalogue est chargé une seule fois ; les images pointent vers le site déployé. */
  function loadCatalog() {
    if (!catalog) {
      catalog = nativeFetch(ROOT + 'products.json')
        .then(function (response) { return response.json(); })
        .then(function (products) {
          return products.map(function (product) {
            var copy = JSON.parse(JSON.stringify(product));
            copy.imageUrl = ROOT + 'product-images/' + product.imageUrl;
            return copy;
          });
        });
    }
    return catalog;
  }

  function jsonResponse(status, body) {
    return new Response(JSON.stringify(body), { status: status, headers: { 'Content-Type': 'application/json' } });
  }

  function newOrderId() {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID().replace(/-/g, '');
    }
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
  }

  function readJson(init) {
    try {
      return JSON.parse((init && init.body) || '{}');
    } catch (error) {
      return {};
    }
  }

  /* Même contrat que le backend : contact complet + liste d’identifiants de produits. */
  function placeOrder(products, init) {
    var order = readJson(init);
    var contact = order.contact || {};
    if (!contact.firstName || !contact.lastName || !contact.address || !contact.city || !contact.email || !order.products) {
      return jsonResponse(400, {});
    }
    var ordered = [];
    for (var i = 0; i < order.products.length; i++) {
      var id = order.products[i];
      var found = products.filter(function (product) { return product._id === id; })[0];
      if (!found) {
        return jsonResponse(500, {});
      }
      ordered.push(found);
    }
    return jsonResponse(201, { contact: contact, products: ordered, orderId: newOrderId() });
  }

  function handle(method, id, init) {
    return loadCatalog().then(function (products) {
      if (method === 'POST' && id === 'order') {
        return placeOrder(products, init);
      }
      if (method !== 'GET') {
        return jsonResponse(404, {});
      }
      if (!id) {
        return jsonResponse(200, products);
      }
      var product = products.filter(function (item) { return item._id === id; })[0];
      return product ? jsonResponse(200, product) : jsonResponse(404, {});
    }).catch(function () {
      return jsonResponse(500, {});
    });
  }

  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || String(input);
    var match = API_URL.exec(url);
    if (!match) {
      return nativeFetch(input, init);
    }
    var method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    return handle(method, match[1], init);
  };

  /* ---------- Bandeau d’information ---------- */

  function showBanner() {
    try {
      if (window.sessionStorage.getItem(BANNER_KEY) === 'closed') {
        return;
      }
    } catch (error) { /* sessionStorage indisponible */ }
    var banner = document.createElement('div');
    banner.setAttribute('role', 'note');
    banner.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;max-width:320px;padding:10px 12px;' +
      'border-radius:10px;background:#1f2933;color:#fff;font:13px/1.45 Arial,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.35)';
    banner.innerHTML = '<strong>Mode démo</strong> : le catalogue est local et les commandes sont simulées ' +
      '(aucune donnée n’est envoyée).<br><a href="#" style="color:#ffb27a">Fermer</a>';
    banner.querySelector('a').addEventListener('click', function (event) {
      event.preventDefault();
      try { window.sessionStorage.setItem(BANNER_KEY, 'closed'); } catch (error) { /* ignoré */ }
      banner.remove();
    });
    document.body.appendChild(banner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
