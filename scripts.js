$(document).ready(function () {
	$.ajax({
		url: "https://smileschool-api.hbtn.info/quotes",
		method: "GET",
		success: function(response) {
			const allQuotes = $('<div class="carousel-inner"></div>');
			let i = 0;

			for (item of response) {
				const name = item.name;
				const title = item.title;
				const text = item.text;
				const pictureList = item.pic_url.split('/');
				const picture = pictureList[3];
				let classStatus = "carousel-item";
				if (i === 0) {
					classStatus = "carousel-item active";
					i = 1
				}

				const quote = $(`
					<div class="${classStatus}">
						<div class="row mx-auto align-items-center">
							<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
								<img src="images/${picture}" class="d-block align-self-center" alt="Carousel Pic 1" />
							</div>
							<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
								<div class="quote-text">
								<p class="text-white">
									${text}
								</p>
								<h4 class="text-white font-weight-bold">${name}</h4>
								<span class="text-white">${title}</span>
								</div>
							</div>
						</div>
					</div>
				`);
				allQuotes.append(quote);
			}
			const arrows = $(`
				<a class="carousel-control-prev arrow-left" href="#carouselExampleControls" role="button" data-slide="prev">
					<img src="images/arrow_white_left.png" alt="Quote Previous" aria-hidden="true" />
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next arrow-right" href="#carouselExampleControls" role="button" data-slide="next">
					<img src="images/arrow_white_right.png" alt="Quote Next" aria-hidden="true" />
					<span class="sr-only">Next</span>
				</a>
			`);
			const container = $('<div class="container"></div>');
			const carouselEx = $('<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"></div>');
			const carouselInner = $('<div class="carousel-inner"></div>');
			carouselInner.append(allQuotes, arrows);
			carouselEx.append(carouselInner);
			container.append(carouselEx);
			$('section.quotes.section.d-flex.align-items-center').empty();
			$('section.quotes.section.d-flex.align-items-center').append(container);
			$(".arrow-right").css("z-index", 1000);
		},
		error: function() {
			console.log('il y a une erreur');
		}
	});
	$.ajax({
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		method: "GET",
		success: function(response) {
			console.log(response);
		},
		error: function() {
			console.log("error");
		}
	});
});
