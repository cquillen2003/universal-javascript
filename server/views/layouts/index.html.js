function createDocument(props) {
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<title>${props.title}</title>
				<!-- Required meta tags -->
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

				<!-- Webpack CSS Bundle -->
				<link rel="stylesheet" href="/${props.styles}">
 			</head>
			<body>
				<div id="root">${props.body}</div>

				<!-- Webpack JS Bundle -->
				<script src="/${props.scripts}"></script>
			</body>
		</html>
	`
}

export default createDocument;