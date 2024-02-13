// This is your test publishable API key.
const stripe = Stripe("pk_test_51M6IM2SFS09Es6txZKfg4Hy2rcPlFQ1pSNSrienwKGS6nSUNRlMJedAFpp4exgPqmaYcguQoPnlQTZ81a7jpZ6nu00Zodl8XHq");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
    const response = await fetch("/create-checkout-session", {
        method: "POST",
    });

    const { clientSecret } = await response.json();

    const checkout = await stripe.initEmbeddedCheckout({
        clientSecret,
    });

    // Mount Checkout
    checkout.mount('#checkout');
}