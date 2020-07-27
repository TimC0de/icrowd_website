$(function () {
  $('#order-form').on('submit', function () {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const urlsKeys = $('#urlsKeys').val();
  
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/3.0/messages/send.json',
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        },
        data: {
            'key': '720a670273b8a6e0ca6e875995e965c6-us17',
            'message': {
                'from_email': email,
                'to': [
                    {
                    'email': 'icrowdprom@gmail.com',
                    'name': 'iCrowd',
                    'type': 'to'
                    }
                ],
                'autotext': 'true',
                'subject': "User's Data",
                'html': '<p>First Name: ' + firstName + '</p><p>Last Name: ' + lastName + '</p><p>Email: ' + email + '</p><p>URLs and Keywords: ' + urlsKeys + '</p>'
            }
        }
    }).done(function(response) {
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
    });
  });
})