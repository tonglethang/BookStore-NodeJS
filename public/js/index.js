//add envent scroll top web
let top= document.querySelector('#top');
top.addEventListener('click', topFunction);
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// tranfer describle and comment in Details page
const btn_des = document.querySelector('.btn-describle');
const btn_com = document.querySelector('.btn-comment');
btn_des.addEventListener("click", tranferDes);
btn_com.addEventListener("click", tranferDes);
 function tranferDes(){
	if($('.describle').css( "display" ) == "block"){
		$('.comment').css('display', 'block');
		$('.btn-comment').css('color', "#00ab9f");
		$('.describle').css('display', 'none');
		$('.btn-describle').css('color', "#444444");
	}
	else{
		$('.comment').css('display', 'none');
		$('.btn-comment').css('color', "#444444");
		$('.describle').css('display', 'block');
		$('.btn-describle').css('color', "#00ab9f");
	}
}

//Add envent in quantity of Detail page
var input = document.querySelector('#qty');
var btnminus = document.querySelector('.qtyminus');
var btnplus = document.querySelector('.qtyplus');

if (input !== undefined && btnminus !== undefined && btnplus !== undefined && input !== null && btnminus !== null && btnplus !== null) {
	
	var min = Number(input.getAttribute('min'));
	var max = Number(input.getAttribute('max'));
	var step = Number(input.getAttribute('step'));

	function qtyminus(e) {
		var current = Number(input.value);
		var newval = (current - step);
		if(newval < min) {
			newval = min;
		} else if(newval > max) {
			newval = max;
		} 
		input.value = Number(newval);
		e.preventDefault();
	}

	function qtyplus(e) {
		var current = Number(input.value);
		var newval = (current + step);
		if(newval > max) newval = max;
		input.value = Number(newval);
		e.preventDefault();
	}
		
	btnminus.addEventListener('click', qtyminus);
	btnplus.addEventListener('click', qtyplus);
  
}
