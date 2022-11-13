// Testing frontend and backend communication with a simple API calls
function Communication() {
	const url = "/api";

	// POST and GET request functions

	async function getData(event: { preventDefault: () => void }) {
		event.preventDefault();
		const response = await fetch(url, {
			method: "GET",
		});
		const data = await response.json();
		console.log(data);
		alert(data.message);
	}

	async function postData(event: { preventDefault: () => void }) {
		event.preventDefault();
		let value = "";
		if ((document.getElementById("message") as HTMLInputElement) != null) {
			value = (document.getElementById("message") as HTMLInputElement).value;
		}
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				message: value,
			}),
		});
		const data = await response.json();
		console.log(data);
		alert(data.message);
	}

	return (
		<div>
			<form method="post" action={url}>
				<input
					type="text"
					placeholder="Input Some Text"
					id="message"
					required
				/>
				<button id="submitItem" value="Submit" onClick={postData}>
					POST
				</button>
			</form>

			<button id="get" onClick={getData}>
				GET
			</button>
		</div>
	);
}

export default Communication;
