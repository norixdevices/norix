const catalogue = window.NORIX_PRODUCTS?.products ?? [];
const main = document.querySelector('#productDetail');
const productId = new URLSearchParams(window.location.search).get('id');
const product = catalogue.find((item) => item.id === productId);

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeSection(kicker, title, className = '') {
  const section = node('section', `detail-section ${className}`.trim());
  section.dataset.reveal = 'detail-section';
  section.append(node('p', 'eyebrow', kicker), node('h2', '', title));
  return section;
}

function makeList(items, className = 'detail-list') {
  const list = node('ul', className);
  items.forEach((item) => list.append(node('li', '', item)));
  return list;
}

const quickReadoutDefinitions = {
  'bnx-1101': [
    ['Pressure range', 'Pressure measurement range'],
    ['Pressure accuracy', 'Pressure accuracy'],
    ['Pulse range', 'Pulse measurement range']
  ],
  'bnx-1151': [
    ['Pressure range', 'Pressure measurement range'],
    ['Pressure accuracy', 'Pressure accuracy'],
    ['Pulse range', 'Pulse measurement range']
  ],
  'pnx-1301': [
    ['SpO₂ range', 'SpO₂ measuring range'],
    ['Pulse rate', 'Pulse rate'],
    ['Measurement time', 'Measurement time']
  ],
  'tnx-1201': [
    ['Measuring period', 'Measuring period'],
    ['Measurement range', 'Measurement range'],
    ['Maximum error', 'Maximum error']
  ]
};

function quickReadoutRows(item) {
  const definitions = quickReadoutDefinitions[item.id] ?? [];
  const featureValues = item.features ?? [];
  return definitions.flatMap(([displayLabel, specificationLabel]) => {
    const specification = item.specifications?.find(([label]) => label === specificationLabel)?.[1];
    const feature = featureValues.find((entry) => entry.startsWith(`${specificationLabel}:`));
    const value = specification ?? (feature ? feature.slice(feature.indexOf(':') + 1).trim() : null);
    return value ? [[displayLabel, value]] : [];
  });
}

function renderQuickReadout(item) {
  const rows = quickReadoutRows(item);
  if (!rows.length) return null;

  const section = node('section', 'quick-readout');
  section.dataset.reveal = 'quick-readout';
  section.append(node('p', 'eyebrow', 'KEY FIGURES'), node('h2', '', 'At a glance'));
  const list = node('dl', 'quick-metrics');
  rows.forEach(([label, value]) => {
    const metric = node('div', 'quick-metric');
    metric.append(node('dt', '', label), node('dd', '', value));
    list.append(metric);
  });
  section.append(list);
  return section;
}

function revealProductSections() {
  const targets = [...main.querySelectorAll('[data-reveal]')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  targets.forEach((item, index) => {
    item.style.setProperty('--motion-delay', `${Math.min(index, 3) * 65}ms`);
    observer.observe(item);
  });
}

function renderNotFound() {
  main.replaceChildren();
  const panel = node('section', 'product-not-found');
  panel.append(
    node('p', 'eyebrow', 'PRODUCT INFORMATION'),
    node('h1', '', 'Product information isn’t available for this model.'),
    node('p', '', 'Return to the NORIX product range to choose an available model.'),
    Object.assign(node('a', 'arrow-link', 'Return to the product range ↗'), { href: 'index.html#products' })
  );
  main.append(panel);
}

function renderProduct(item) {
  document.title = `${item.name} ${item.model} | NORIX`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = `${item.name} ${item.model}: features, intended use, technical specifications, and included accessories.`;
  main.replaceChildren();

  const breadcrumb = node('div', 'detail-breadcrumb');
  const back = node('a', '', '← Product collection');
  back.href = 'index.html#products';
  breadcrumb.append(back, node('span', '', '/'), node('span', '', item.category), node('span', '', '/'), node('span', 'breadcrumb-model', item.model));
  main.append(breadcrumb);

  const overview = node('section', 'detail-overview');
  overview.dataset.reveal = 'product-overview';
  const gallery = node('div', 'detail-gallery');
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.imageAlt;
  image.width = item.imageWidth;
  image.height = item.imageHeight;
  image.fetchPriority = 'high';
  image.decoding = 'async';
  gallery.append(image);

  const intro = node('div', 'detail-intro');
  intro.append(
    node('p', 'eyebrow', item.category.toUpperCase()),
    node('p', 'detail-model', item.model),
    node('h1', '', item.name),
    node('p', 'detail-description', item.description)
  );
  const warranty = node('p', 'detail-warranty');
  warranty.append(node('span', '', 'Warranty'), node('strong', '', item.warranty || 'Contact NORIX for details'));
  intro.append(warranty);
  const enquiry = node('a', 'detail-enquiry', 'Ask about this model ↗');
  enquiry.href = `index.html#contact`;
  intro.append(enquiry);
  overview.append(gallery, intro);
  main.append(overview);

  const quickReadout = renderQuickReadout(item);
  if (quickReadout) main.append(quickReadout);

  if (item.features?.length) {
    const features = makeSection('01 / KEY FEATURES', 'At a glance', 'feature-section');
    features.append(makeList(item.features, 'feature-list'));
    main.append(features);
  }

  const specs = makeSection('02 / TECHNICAL SPECIFICATIONS', 'Full specifications', 'spec-section');
  if (item.specifications?.length) {
    if (item.id === 'tnx-1201') {
      const grid = node('dl', 'spec-grid');
      item.specifications.forEach(([label, value]) => {
        const pair = node('div', 'spec-grid-item');
        pair.append(node('dt', '', label), node('dd', '', value));
        grid.append(pair);
      });
      specs.append(grid);
    } else {
      const tableWrap = node('div', 'spec-table-wrap');
      const table = document.createElement('table');
      const caption = node('caption', 'visually-hidden', `${item.model} technical specifications`);
      table.append(caption);
      const tbody = document.createElement('tbody');
      item.specifications.forEach(([label, value]) => {
        const row = document.createElement('tr');
        row.append(node('th', '', label), node('td', '', value));
        tbody.append(row);
      });
      table.append(tbody);
      tableWrap.append(table);
      specs.append(tableWrap);
    }
  } else {
    specs.append(node('p', 'spec-empty', 'Contact NORIX for product specifications.'));
  }
  main.append(specs);

  const usage = makeSection('03 / APPLICATIONS', 'Intended use', 'usage-section');
  if (item.applications?.length) usage.append(makeList(item.applications));
  else usage.append(node('p', 'spec-empty', 'Contact NORIX for intended-use information.'));
  main.append(usage);

  const packageSection = makeSection('04 / INCLUDED ACCESSORIES', 'Included with the product', 'package-section');
  if (item.accessories?.length) packageSection.append(makeList(item.accessories));
  else packageSection.append(node('p', 'spec-empty', 'Contact NORIX for included-accessory information.'));
  main.append(packageSection);

  const relatedIds = new Set(item.related ?? []);
  const relatedItems = catalogue.filter((other) => relatedIds.has(other.id));
  if (relatedItems.length) {
    const related = makeSection('05 / EXPLORE THE RANGE', 'Related products', 'related-section');
    const links = node('div', 'related-links');
    relatedItems.forEach((other) => {
      const link = node('a', 'related-link');
      link.href = `product.html?id=${encodeURIComponent(other.id)}`;
      link.append(node('span', 'related-model', other.model), node('span', 'related-name', other.name), node('span', 'related-arrow', '↗'));
      links.append(link);
    });
    related.append(links);
    main.append(related);
  }
}

if (product) renderProduct(product);
else renderNotFound();
if (product) revealProductSections();
