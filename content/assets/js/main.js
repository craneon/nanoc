/* Header Height Adjustment Function */

$("#logo").mouseover
	(function() {
		$(this).parent().parent().stop().animate({ marginTop: '0px'}, 500);
    })

$(".hiding").mouseleave (function() {
        $(this).stop().animate({ marginTop: '-150px' },400);
	})


/* Page Content Expansion Function */

$(".plus").click(function(){
	$(this).css({display: 'none'});
	$(this).next().css({display: 'block'});
	$(this).parents().eq(2).removeClass('span5').addClass('span10');

})

$(".minus").click(function(){
	$(this).parent().css({display: 'none'});
	$(this).parent().prev().css({display: 'block'});
	$(this).parents().eq(3).removeClass('span10').addClass('span5');

})

/* Image Portfolio Functions */

/* on click left */
$("#left").click(function(){
	if (horz_current != 0) {
		horz_current--
		horz_current = horz_current % $($(".contentbox")[vert_current]).data("no")
	}
	else {
		horz_current = $($(".contentbox")[vert_current]).data("no") - 1
	}
	$.backstretch("/images/" + kind + "/" + $($(".contentbox")[vert_current]).data("pic") + "_" + horz_current + ".jpg"), {speed: 150};
})

	

/* on click right */
$("#right").click(function(){
	horz_current++
	horz_current = horz_current % $($(".contentbox")[vert_current]).data("no")
	$.backstretch("/images/" + kind + "/" + $($(".contentbox")[vert_current]).data("pic") + "_" + horz_current + ".jpg"), {speed: 200};
})



/* Scroll to change backstretch image */
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

function update_background() {
	$(".contentbox").each(function(i){
		if (isScrolledIntoView(this)) {
			if (i != vert_current) {
				$.backstretch("/images/" + kind + "/" + $(this).data("pic") + "_" + 0 + ".jpg", {speed: 350}	);
				
				vert_current = i;
				horz_current = 0;

				if ($(this).data("no") == 1) {
					$("#right").hide("fast");
					$("#left").hide("fast");
				}
				else {
					$("#right").show("fast");
					$("#left").show("fast");
				}
			}
			return false;
		}
	});
}


/* Document Ready Function */

$(document).ready(function() {

	$(document.body).on("backstretch.show", function () {
		if ($(".backstretch").length != 1) {
		$($(".backstretch")[0]).remove();
	}
	});

	/* Variables */
	vert_current = 0;
	horz_current = 0;
	win_height = $(window).height();
	kind = $($(".contentbox")[0]).data("kind");

	/*Set first image*/
	$.backstretch("/images/" + kind + "/" + $($(".contentbox")[0]).data("pic") + "_" + 0 + ".jpg");


	/*Set arrow height*/
	$("#right").css({marginTop: (win_height/2) + "px"});
	$("#left").css({marginTop: (win_height/2) + "px"});

	$(window).scroll(function () {
		if($(window).scrollTop() % 2 == 0) {
	  		update_background();
		}
	});

	$(".hiding").stop().animate({ marginTop: '-150px' },400);

	$('.subheader').localScroll(
		{offset: -200});

});