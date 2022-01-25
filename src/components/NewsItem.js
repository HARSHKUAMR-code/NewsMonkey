import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source}
                        </span>
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem


















// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// export class NewsItem extends Component {
    

//     render() {
//      let    {title,description, imageurl,newsurl} = this.props;
//         return (
//             <div className="my-3">
//                 <div className="card" style={{width: "18rem"}}>
//                 <img src={!imageurl?"https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/alt7h4gcqzpdn8ho_1631729628.jpeg":imageurl} className="card-img-top" alt="..."/>
//                 <div className="card-body">
//                     <h5 className="card-title">{title}</h5>
//                     <p className="card-text">{description}</p>
//                     <a  rel ="noreferr" href={newsurl}  target="blank" className="btn  btn-sm btn-dark">READ MORE</a>
//                 </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default NewsItem
