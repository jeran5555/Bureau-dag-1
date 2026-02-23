<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>KickflipKings</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <img src="skills/orders/assets/logo.png" alt="KickflipKings logo" class="logo">
</header>


<main id="app">
  <section id="step-products">
    <h2>Kies een product</h2>
    <div id="products"></div>
  </section>

  <section id="step-symbols" class="hidden">
    <h2>Kies een symbool</h2>
    <div id="symbols"></div>
  </section>

  <section id="step-colours" class="hidden">
    <h2>Kies een kleur</h2>
    <div id="colours"></div>
  </section>

  <section id="summary" class="hidden">
    <h2>Overzicht</h2>
    <p id="total-price"></p>
    <button id="order-btn">Bestellen</button>
  </section>

  <section id="thankyou" class="hidden">
    <h2>Bedankt voor je bestelling!</h2>
    <button id="reset-btn">Maak nog een bestelling</button>
  </section>
</main>

<script src="app.js"></script>
</body>
</html>
