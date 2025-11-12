

import React, { useEffect, useState } from "react";


function DogImage({ src, alt }) {
if (!src) return null;
return <img src={src} alt={alt} />;
}

export default function App() {
//Manage component state
const [imageUrl, setImageUrl] = useState(null);
const [loading, setLoading] = useState(false);

//Fetch function used by both useEffect and button onClick
const fetchDog = async () => {
setLoading(true);
try {
const res = await fetch("https://dog.ceo/api/breeds/image/random"); // GET request
const data = await res.json();


setImageUrl(data.message);
} finally {
setLoading(false);
}
};

//Fetch when the component mounts
useEffect(() => {
fetchDog();
}, []);

//Render
return (
<div>
<h1>Random Dog Viewer</h1>

<button onClick={fetchDog} disabled={loading}>Get New Dog</button>

{loading && <p>Loading...</p>}

{!loading && imageUrl && (
<DogImage src={imageUrl} alt="A randomly fetched dog" />
)}
</div>
);
}