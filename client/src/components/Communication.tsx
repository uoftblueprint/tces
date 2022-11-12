import React, { useCallback, useEffect, useState } from "react";

// Testing frontend and backend communication with a simple API calls
function Communication() {
	const url = "api/";

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
		if ((document.getElementById("input-text") as HTMLInputElement) != null) {
			value = (document.getElementById("input-text") as HTMLInputElement).value;
		}
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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
			<form method="post" className="addItem">
				<input type="text" placeholder="Input" name="input-text" required />
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
