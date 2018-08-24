function createDocument(props) {
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<title>${props.title}</title>
				<link rel="shortcut icon" href="/favicon.ico">

				<!-- Required meta tags -->
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

				<!-- Webpack CSS Bundle -->
				<link rel="stylesheet" href="/${props.styles}">
 			</head>
			<body>
				<div id="root">${props.body}</div>
				<!-- Global Variables -->
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(props.state).replace(/</g, '\\u003c')}
				</script>
				<!-- Webpack JS Bundle -->
				<script src="/${props.scripts}"></script>
			</body>
		</html>
	`
}

export default createDocument;