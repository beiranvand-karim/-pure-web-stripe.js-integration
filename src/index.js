const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
    uri: 'https://1jzxrj179.lp.gql.zone/graphql',
});

fetch({
    query: '{ posts { title }}',
}).then(res => {
    console.log(res.data);
});

// You can also easily pass variables for dynamic arguments
fetch({
    query: `query PostsForAuthor($id: Int!) {
    author(id: $id) {
      firstName
      posts {
        title
        votes
      }
    }
  }`,
    variables: { id: 1 },
}).then(res => {
    console.log('fetch.res.data', res.data);
});

const stripe = window.Stripe("pk_test_tokeDTAqG5NHarH491O3zjqO")

const elements = stripe.elements()

const style = {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
            color: "#aab7c4"
        }
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
    }
};

const card = elements.create('card', {hidePostalCode: true, style: style});

card.mount('#card-element')

card.on('change', (event) => {
})

const form = document.getElementById('payment-form');
form.addEventListener('submit',(event) => {
    event.preventDefault();
    console.log('event',event)

    stripe.createToken(card).then((result) => {
        console.log('result',result)
    })

})
