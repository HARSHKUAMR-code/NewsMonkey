import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '65px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    }
}

export default News













// import React, { Component } from 'react'
// import NewsItem from './NewsItem'

// export class News extends Component {
    
//     constructor() {
//         super();
//         this.state = {
//                 articles: [],
//                 laoding: false,
//                 page:1
//         }
//     }


//        async componentDidMount(){
//         let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=63dc337cc4e340669e1b87b02cef33f2&page=1&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
//      }

//      handlePrevClick = async()=>{
//        console.log("Previous");
//         let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=63dc337cc4e340669e1b87b02cef33f2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//         let data = await  fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//         page: this.state.page - 1,
//         articles: parsedData.articles})


//      }

//      handleNextClick = async()=>{
//         console.log("Next");
//         if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

//         } 
//         else{
//         let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=63dc337cc4e340669e1b87b02cef33f2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//         let data = await  fetch(url);
//         let parsedData = await data.json()
//         console.log(parsedData);
//         this.setState({
//         page: this.state.page + 1,
//         articles: parsedData.articles
//       })
// }
// }




//     render() {
//         return (
//             <div className="container my-3">
//                  <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
//                  {this.state.loading && <spinner/>}
//                 <div className="row">
//                 {this.state.articles.map((element)=>{
//                   return   <div className="col-md-4" key={element.url}>
//                     <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url}/>
//                     </div>
//                 })}                                           
//                 </div>
//                 <div className="conatiner d-flex justify-content-between">
//                 <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
//                 <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News
