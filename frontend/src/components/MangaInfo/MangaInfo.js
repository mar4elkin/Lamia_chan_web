import React from 'react';
import './MangaInfo.css'
import MangaHeader from './MangaInfoHeader'
import MangaDescription from './MangaInfoDescription'

import {takeApi} from '../ApiRequest'


//Redux-react connecter import
import { connect } from 'react-redux'


class MangaInfo extends React.Component{
  
  constructor(){
    super()
    this.state = {
      actualMangaId: 1,
      manga: [],
      tags: [],
      chapters: []
    }
    this.getPageUrl = this.getPageUrl.bind(this)
  }
  //API calls with takeApi function
  async componentDidMount(){
    await this.getPageUrl()
    const mangaLink = this.props.mangaLink + this.state.actualMangaId + "/"
    await takeApi(mangaLink).then(response => {this.setState({manga : response})})
    await takeApi(this.props.tagLink).then(response => {this.setState({tags : response})})
    await takeApi(this.props.chapterLink).then(response => {this.setState({chapters : response})})
  }

  //Filter chapters
  filterChapters(){
    var newChapters = [];
    for (let i = 0; i < this.state.chapters.length; i++) {
      if(this.state.chapters[i].manga === this.state.actualMangaId){
        newChapters.push(this.state.chapters[i])
      }
    }
    return newChapters
  }

  //GET MANGA ID FROM PAGE URL
  async getPageUrl(){
    var currentUrl = window.location.pathname;
    var params = currentUrl.split('/');
    await this.setState({
      actualMangaId: parseInt(params[params.length-1])
    })
    return params[params.length-1];
  }

  render(){
    this.filterChapters()
    return(
    <React.Fragment>
      <div className="container-fluid">
        <MangaHeader manga={this.state.manga} chapters={this.filterChapters()} />
        <MangaDescription manga={this.state.manga} tags={this.state.tags} mainColor={this.props.mainColor} />
      </div>
    </React.Fragment>
    )
  }
}
//Parce Redux data to React props
const mapStateToProps = (state)=>{
  return {
    mainColor: state.mainColor,
    mangaLink: state.apiLinks.manga,
    tagLink: state.apiLinks.tags,
    chapterLink: state.apiLinks.chapters
  }
}

export default connect(mapStateToProps) (MangaInfo);