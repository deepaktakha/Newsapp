import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'




export default class News extends Component {
    static defaultProps= {
        country : 'in',
        pagesize: 4,
        category : 'general'
    }
    static propTypes ={
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    articles=[ ];
     capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
        this.state = {
            articles : this.articles,
            loading: false,
            page : 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
     async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc2489e32f4949529e3d64a2202cafbc&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseddata =  await data.json()
      this.setState({articles: parseddata.articles,
         totalResults: parseddata.totalResults,
         loading:false
        });
    }
      handleonpre = async ()=>{
        console.log("previos");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc2489e32f4949529e3d64a2202cafbc&page=${ this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseddata = await data.json()
        this.setState({
            page: this.state.page -1,
            articles: parseddata.articles,
            loading:false
        });
    }
      handleonnext = async ()=>{
        console.log("next");
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc2489e32f4949529e3d64a2202cafbc&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseddata = await data.json()
        this.setState({
            page: this.state.page + 1,
            articles: parseddata.articles,
            loading:false
        });
    }
    }
   
  render() {
    return (
          <div>
        <div className="container my-3">
            <h2  className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row my-3">
            {!this.state.loading && this.state.articles.map((element)=>{
              return  <div className="col-md-3  my-3" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl= {element.urlToImage} NewsUrl ={element.url} source = {element.source.name}/>
              </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
                <button className = "btn btn-dark"  disabled={this.state.page <=1}   onClick={this.handleonpre}> &larr; Previous</button>
                <button className = "btn btn-dark"  disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.handleonnext}>  Next &rarr;</button>
            </div>
            </div>
      </div>
    )
  }
}
