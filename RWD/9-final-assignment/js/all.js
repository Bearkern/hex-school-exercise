$(document).ready(function() {
	$('.showmenu').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('menu-show');
	});

	$('#wishlist1').on('click', function(e){
		e.preventDefault();
		$('#wishlist1').toggleClass('fa-heart-o');
		$('#wishlist1').addClass('fa-heart');
	});

	$('#wishlist2').on('click', function(e){
		e.preventDefault();
		$('#wishlist2').toggleClass('fa-heart-o');
		$('#wishlist2').addClass('fa-heart');
	});

	$('#wishlist3').on('click', function(e){
		e.preventDefault();
		$('#wishlist3').toggleClass('fa-heart-o');
		$('#wishlist3').addClass('fa-heart');
	});

	$('#wishlist4').on('click', function(e){
		e.preventDefault();
		$('#wishlist4').toggleClass('fa-heart-o');
		$('#wishlist4').addClass('fa-heart');
	});
});