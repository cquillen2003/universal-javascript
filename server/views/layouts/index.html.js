function createDocument(props) {
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<title>Universal JavaScript</title>
				<!-- Required meta tags -->
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
 			</head>
			<body>
				<div id="root"></div>

				<!-- Webpack Bundle -->
				<script src="/${props.bundle}"></script>
			</body>
		</html>
	`
}

export default createDocument;