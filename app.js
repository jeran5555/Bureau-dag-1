let data = {};
let selected = {
  product: null,
  symbol: null,
  colour: null
};

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    renderProducts();
  });

function renderProducts() {
  const container = document.getElementById('products');
  data.products.forEach(product => {
    const btn = document.createElement('button');

    const img = document.createElement('img');
    img.src = `assets/products/${product.name}.png`;
    img.alt = product.name;
    img.style.width = '150px';
    img.style.display = 'block';
    img.style.margin = '0 auto 10px auto';

    const span = document.createElement('span');
    span.textContent = `${product.name} (€${product.price})`;

    btn.appendChild(img);
    btn.appendChild(span);

    btn.onclick = () => {
      selected.product = product.id;
      document.getElementById('step-symbols').classList.remove('hidden');
      renderSymbols();
    };
    container.appendChild(btn);
  });
}

function renderSymbols() {
  const container = document.getElementById('symbols');
  container.innerHTML = '';
  data.symbols.forEach(symbol => {
    const btn = document.createElement('button');

    // Create image element for the symbol
    const img = document.createElement('img');
    let fileName = symbol.name;
    // Handle specific file names with an exclamation mark
    if (fileName === 'BOOM' || fileName === 'OMG') fileName += '!';
    img.src = `assets/symbool/symbol-${fileName}.png`;
    img.alt = symbol.name;
    img.style.width = '100px';
    img.style.display = 'block';
    img.style.margin = '0 auto 10px auto';

    // Create span for the label
    const span = document.createElement('span');
    span.textContent = symbol.name;

    btn.appendChild(img);
    btn.appendChild(span);

    btn.onclick = () => {
      selected.symbol = symbol.id;
      document.getElementById('step-colours').classList.remove('hidden');
      renderColours();
    };
    container.appendChild(btn);
  });
}

function renderColours() {
  const container = document.getElementById('colours');
  container.innerHTML = '';

  // Find the selected product to show its coloured version
  const selectedProduct = data.products.find(p => p.id === selected.product);

  data.colours.forEach(colour => {
    const btn = document.createElement('button');

    // Create image element showing the selected product in this colour
    const img = document.createElement('img');
    img.src = `assets/colours/${selectedProduct.name}-${colour.name}.png`;
    img.alt = colour.name;
    img.style.width = '150px';
    img.style.display = 'block';
    img.style.margin = '0 auto 10px auto';

    // Create span for the label
    const span = document.createElement('span');
    span.textContent = `${colour.name} (+€${colour.price_add})`;

    btn.appendChild(img);
    btn.appendChild(span);

    btn.onclick = () => {
      selected.colour = colour.id;
      showSummary();
    };
    container.appendChild(btn);
  });
}

function showSummary() {
  const product = data.products.find(p => p.id === selected.product);
  const colour = data.colours.find(c => c.id === selected.colour);
  const total = (product.price + colour.price_add).toFixed(2);

  document.getElementById('total-price').textContent =
    `Totaalprijs: €${total}`;

  document.getElementById('summary').classList.remove('hidden');
}

document.getElementById('order-btn').onclick = () => {
  fetch('/skills/orders/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      producttype: selected.product,
      symbol: selected.symbol,
      colour: selected.colour,
      school: 'WDV'
    })
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        document.getElementById('app').querySelectorAll('section')
          .forEach(s => s.classList.add('hidden'));
        document.getElementById('thankyou').classList.remove('hidden');
      }
    });
};

document.getElementById('reset-btn').onclick = () => {
  location.reload();
};
