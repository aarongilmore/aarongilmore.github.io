
$(document).ready(function () {

	$('.content').addClass('animated fadeIn');
	$('.icon').addClass('animated fadeIn');

	var send = 0;

	$('input[type=submit]').fadeTo(0, 0.4);

	$('input[type=email]').on('input', function() {
		if ($(this).val() != '' && isEmail($(this).val())) {
			$('input[type=submit]').fadeTo(100, 1.0);
			$('input[type=submit]').css('cursor', 'pointer', 0);
			send = 1;
		}
		else {
			$('input[type=submit]').fadeTo(100, 0.4);
			$('input[type=submit]').css('cursor', 'default', 0);
			send = 0;
		}
	});

	function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

	$('form').submit(function (e) {
		if (send) {

		}
		else {
			e.preventDefault();
			alert('Please fill in a correct e-mail address');
		}
	});
});