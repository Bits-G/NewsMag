// import image from '../assets/news.jpg'

// const NewsItem = ({title, description, src, url}) => {
//   return (
//     <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{maxWidth:"345px"}}>
//   <img src={src?src:image} style={{height:"200px",width:"328px"}} className="card-img-top" alt="..."/>
//   <div className="card-body">
//     <h5 className="card-title">{title.slice(0,50)}</h5>
//     <p className="card-text">{description?description.slice(0,90):"News gives you day today life info about world, like whats going in world...!"}.</p>
//     <a href={url} className="btn btn-primary">Read More</a>
//   </div>
// </div>
//   )
// }

// export default NewsItem





import image from '../assets/news.jpg'

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{ maxWidth: "345px" }}
    >
      <img
        src={src ? src : image}
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if fallback also fails
          e.target.src = image; // Use local fallback image
        }}
        style={{ height: "200px", width: "328px" }}
        className="card-img-top"
        alt={title || "news image"}
      />
      <div className="card-body">
        <h5 className="card-title">{title ? title.slice(0, 50) : "Untitled"}</h5>
        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : "News gives you day-to-day life info about world, like what's going on in the world...!"}
        </p>
        <a
          href={url}
          // target="_blank"
          // rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  )
}

export default NewsItem
