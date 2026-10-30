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
  section.append(node('p', 'eyebrow', kicker), node('h2', '', title));
  return section;
}

function makeList(items, className = 'detail-list') {
  const list = node('ul', className);
  items.forEach((item) => list.append(node('li', '', item)));
  return list;
}

function renderNotFound() {
  main.replaceChildren();
  const panel = node('section', 'product-not-found');
  panel.append(
    node('p', 'eyebrow', 'PRODUCT INFORMATION'),
    node('h1', '', 'This product page could not be found.'),
    node('p', '', 'Choose a model from the NORIX product collection.'),
    Object.assign(node('a', 'arrow-link', 'Back to the product range ↗'), { href: 'index.html#products' })
  );
  main.append(panel);
}

function renderProduct(item) {
  document.title = `${item.name} ${item.model} | NORIX`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = `${item.name} ${item.model}: product overview, features, and specifications from NORIX packaging.`;
  main.replaceChildren();

  const breadcrumb = node('div', 'detail-breadcrumb');
  const back = node('a', '', '← Product collection');
  back.href = 'index.html#products';
  breadcrumb.append(back, node('span', '', '/'), node('span', '', item.category), node('span', '', '/'), node('span', 'breadcrumb-model', item.model));
  main.append(breadcrumb);

  const overview = node('section', 'detail-overview');
  const gallery = node('div', 'detail-gallery');
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.imageAlt;
  image.width = item.imageWidth;
  image.height = item.imageHeight;
  image.fetchPriority = 'high';
  image.decoding = 'async';
  gallery.append(image, node('p', 'image-source-label', 'NORIX product image'));

  const intro = node('div', 'detail-intro');
  intro.append(
    node('p', 'eyebrow', item.category.toUpperCase()),
    node('p', 'detail-model', item.model),
    node('h1', '', item.name),
    node('p', 'detail-description', item.description)
  );
  const warranty = node('p', 'detail-warranty');
  warranty.append(node('span', '', 'Warranty'), node('strong', '', item.warranty || 'Not specified in the supplied documents.'));
  intro.append(warranty);
  if (item.specificationNotice) intro.append(node('p', 'source-notice', item.specificationNotice));
  const enquiry = node('a', 'detail-enquiry', 'Ask NORIX about this model ↗');
  enquiry.href = `index.html#contact`;
  intro.append(enquiry);
  overview.append(gallery, intro);
  main.append(overview);

  if (item.features?.length) {
    const features = makeSection('01 / KEY FEATURES', 'At a glance', 'feature-section');
    features.append(makeList(item.features, 'feature-list'));
    main.append(features);
  }

  const specs = makeSection('02 / TECHNICAL SPECIFICATIONS', 'Parameters', 'spec-section');
  if (item.specifications?.length) {
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
  } else {
    specs.append(node('p', 'spec-empty', 'Not specified for this model in the supplied documents.'));
  }
  if (item.specificationNotice) specs.append(node('p', 'source-notice', item.specificationNotice));
  if (item.sourceLabel) specs.append(node('p', 'source-label', item.sourceLabel));
  main.append(specs);

  const usage = makeSection('03 / APPLICATIONS', 'Use and intended application', 'usage-section');
  if (item.applications?.length) usage.append(makeList(item.applications));
  else usage.append(node('p', 'spec-empty', 'Not specified in the supplied documents.'));
  main.append(usage);

  const packageSection = makeSection('04 / PACKAGE CONTENTS', 'Included with the product', 'package-section');
  if (item.accessories?.length) packageSection.append(makeList(item.accessories));
  else packageSection.append(node('p', 'spec-empty', 'Package contents are not specified for this model in the supplied documents.'));
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
