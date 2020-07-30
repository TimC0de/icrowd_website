$(function () {
  $('#order-form').on('submit', function () {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const urlsKeys = $('#urlsKeys').val();

    emailjs.sendForm('gmail', 'template_5FzmPt82', '#order-form')
      .then(function(response) {
        $('#paypal-button-container').html('');

        paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'blue',
            layout: 'vertical',
            label: 'paypal',

          },
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: $('#pack').val()
                }
              }]
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            });
          }
        }).render('#paypal-button-container');
      }, function(error) {
        alert(error);
      });
  });
})