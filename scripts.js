$(document).ready(function () {
	const loader = $('<div class="loader"></div>');
	const resultContainer = $('#result-container');

	function capitalizeFirstLetter(string) {
		const newString = string.replace(/_/g, ' ');
		return newString.charAt(0).toUpperCase() + newString.slice(1);
	}
	function getResults(keyword, topic, sortBy) {
		$.ajax({
			url: "https://smileschool-api.hbtn.info/courses",
			method: "GET",
			data: {
				q: keyword,
				sort: sortBy.toLowerCase().replace(" ", "_"),
				topic: topic
			},
			success: function (response) {
				displayResults(response.courses);
			},
			error: function () {
				console.log("There is an error");
				const errorResult = $('<p>An error occured!</p>');
				resultContainer.emty().append(errorResult);
			}
		});
	}
	function displayResults(courses) {
		console.log("dans la fonction displayResults");
		const numberOfResults = courses.length;
		const divRow = $('<div class="row"></div>');
		const nbOfResult = $(`
			<div class="section-title">
				<span class="text-muted video-count">${numberOfResults} videos</span>
			</div>
		`);
		for (const course of courses) {
			const author = course.author;
			const duration = course.duration;
			const subTitle = course["sub-title"];
			const title = course.title;
			const pictureList = course.thumb_url.split('/');
			const authorPictureList = course.author_pic_url.split('/');
			const authorPicture = authorPictureList[3];
			const picture = pictureList[3];
			const star = course.star;
			const rating = $('<div class="rating"></div>');

			for (let x = 0; x < 5; x++) {
				const starImg = x < star
					? '<img src="images/star_on.png" alt="star on" width="15px" height="15px"/>'
					: '<img src="images/star_off.png" alt="star off" width="15px" height="15px"/>';
				rating.append(starImg);
			}
			const elem = $(`
				<div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
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
								${rating.prop('outerHTML')}
								<span class="main-color">${duration}</span>
							</div>
						</div>
					</div>
				</div>
			`);
			divRow.append(elem);
		}
		resultContainer.empty().append(nbOfResult, divRow);
	}
	$.ajax({
		url: "https://smileschool-api.hbtn.info/courses",
		method: "GET",
		success: function (response) {
			console.log(response);
			const listOfSortBy = $('#sortby');
			listOfSortBy.empty();
			for (item of response.sorts) {
				var capitalizedItem = capitalizeFirstLetter(item)
				const newItem = `<a class="dropdown-item" href="#">${capitalizedItem}</a>`;
				listOfSortBy.append(newItem);
			}
			const listOfTopic = $('#topic');
			listOfTopic.empty();
			for (item of response.topics) {
				var capitalizedItem = capitalizeFirstLetter(item)
				const newItem = `<a class="dropdown-item" href="#">${capitalizedItem}</a>`;
				listOfTopic.append(newItem);
			}
			displayResults(response.courses);
			$('#sortby .dropdown-item').click(function (event) {
				event.preventDefault();
				resultContainer.empty().append(loader);
				const selectedText = $(this).text();
				$('#sortby-text').text(selectedText);
				const sortbyValue = $('#sortby-text').text();
				const topicValue = $('#topic-text').text();
				const researchValue = $('#keyword').val();
				getResults(researchValue, topicValue, sortbyValue);
			});
			$('#topic .dropdown-item').click(function (event) {
				event.preventDefault();
				resultContainer.empty().append(loader);
				const selectedText = $(this).text();
				$('#topic-text').text(selectedText);
				const sortbyValue = $('#sortby-text').text();
				const topicValue = $('#topic-text').text();
				const researchValue = $('#keyword').val();
				getResults(researchValue, topicValue, sortbyValue);
			});
			$('#keyword').on('input', function () {
				resultContainer.empty().append(loader);
				const sortbyValue = $('#sortby-text').text();
				const topicValue = $('#topic-text').text();
				const researchValue = $('#keyword').val();
				getResults(researchValue, topicValue, sortbyValue);
			});
		},
		error: function () {
			console.log("there is an error");
		}
	});

});
