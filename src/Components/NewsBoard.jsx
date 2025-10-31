// import { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";


// const NewsBoard = ({category}) => {

//   const [articles, setArticles] = useState([]);


// //////Original working Code👇
//   // useEffect(()=>{
//   //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
//   //   fetch(url).then(response=>response.json()).then(data=> setArticles(data.articles));
//   // },[category]);





// //   useEffect(() => {
// //   fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
// //     .then(response => response.json())
// //     .then(data => setArticles(data.articles));
// // }, [category]);



// /////Improved Code to handle both category and search keyword👇
// useEffect(() => {
//   let url = "";

//   if (["technology", "business", "health", "science", "sports", "entertainment"].includes(category)) {
//     // url = `https://newsapi.org/v2/everything?q=keyword&${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
//     url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
//   } else {
//     // treat category as a search keyword
//     url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
//   }


  
//   //Original fetch code👇
// //   fetch(url)
// //     .then(response => response.json())
// //     .then(data => setArticles(data.articles));
// // }, [category]);



// // Improved fetch code with error handling👇
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       if (data.articles) {
//         setArticles(data.articles);
//       } else {
//         console.error("API Error:", data);
//         setArticles([]); // Set to empty array to prevent map() crash
//       }
//     })
//     .catch(error => {
//   // Handle network errors if fetch itself fails
//   console.error("Fetch failed:", error);
//   setArticles([]); 
// });
// }, [category]);


//   return (
//     <div>
//       <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      
//       {articles && articles.length > 0 ? (
//         articles.map((news, index) => {  
//         return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
//       })
//       ) : (
//         <p className="text-center mt-5">Loading...</p>
//       )}
//     </div>
//   )
// }

// export default NewsBoard



import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

// 🔑 CRITICAL FIX: Define the API key constant outside of the component 
// to prevent it from being redefined on every render.
// We also add a fallback value (a safe practice, though the Netlify ENV is the real fix).
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "cc2fc5a000cb4864970c9898067de639"; // **Ensure this key is your actual key if the ENV fails**
const NewsBoard = ({category}) => {
const [articles, setArticles] = useState([]);
useEffect(() => {
  let url = "";

if (["technology", "business", "health", "science", "sports", "entertainment"].includes(category)) {
// Use the constant defined above
url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`;
} else {
// Use the constant defined above
url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${NEWS_API_KEY}`;
}
// Improved fetch code with error handling
fetch(url)
.then(response => response.json())
.then(data => {
if (data.articles) {
setArticles(data.articles);
} else {
// Still logging the error, but setting articles to empty array
console.error("API Error:", data);
setArticles([]); 
}
})
.catch(error => {
console.error("Fetch failed:", error);
setArticles([]); 
});
}, [category]);
return (
<div>
<h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
 
{/* The conditional rendering fix is CORRECT and should be kept! */}
{articles && articles.length > 0 ? (
articles.map((news, index) => {  
return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
})
) : (
<p className="text-center mt-5">Loading...</p>
)}
</div>
)}
export default NewsBoard