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

			const carouselInner = $('<div class="carousel-inner"></div>');
			carouselInner.append(allQuotes, arrows);
			$('#carouselExampleControls').empty();
			$('#carouselExampleControls').append(carouselInner);
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
			const allTutos = $('<div class="carousel-inner"></div>');
			let i = 0;
			let x = 0;

			for (item of response) {
				const author = item.author;
				const duration = item.duration;
				const star = item.star;
				const id = item.id;
				const subTitle = item["sub-title"];
				const title = item.title;
				const pictureList = item.thumb_url.split('/');
				const authorPictureList = item.author_pic_url.split('/');
				const authorPicture = authorPictureList[3];
				const picture = pictureList[3];
				let classStatus = "carousel-item";
				if (id === 1) {
					classStatus = "carousel-item active";
					i = 1
				}
				const rating = $('<div class="rating"></div>');
				while (x < 5) {
					if (x <= star - 1) {
						const starOn = $('<img src="images/star_on.png" alt="star on" width="15px"/>');
						rating.append(starOn);
					} else {
						const starOff = $('<img src="images/star_off.png" alt="star on" width="15px"/>');
						rating.append(starOff);
					}
				}

				const tuto = $(`
					<div class="${classStatus}">
						<div class="row align-items-center mx-auto">
							<div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
								<div class="card">
									<img src="images/${picture}" class="card-img-top" alt="Video thumbnail"/>
									<div class="card-img-overlay text-center">
										<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
									</div>
									<div class="card-body">
										<h5 class="card-title font-weight-bold">${title}</h5>
										<p class="card-text text-muted">${subTitle}</p>
										<div class="creator d-flex align-items-center">
											<img src="images/${authorPicture}" alt="Creator of Video" width="30px" class="rounded-circle"/>
											<h6 class="pl-3 m-0 main-color">${author}</h6>
										</div>
										<div class="info pt-3 d-flex justify-content-between">
											${rating}
											<span class="main-color">${duration}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				`);
				allTutos.append(tuto);
			}
			$('#carouselExampleControls2').empty();
			$('#carouselExampleControls2').append(allTutos);
		},
		error: function() {
			console.log("error");
		}
	});
});
