import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Communication from "./components/Communication";

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{Communication()}
				<img src={logo} className="App-logo" alt="logo" />
				<p>{!data ? "Loading..." : data}</p>
			</header>
		</div>
	);
}

export default App;