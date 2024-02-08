
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter,
  Routes,
  Route,
  } from "react-router-dom";


export default class App extends Component {
  pagesize = 8;
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>

        <Routes>
        <Route exact path="/sports" element={ <News key='sports'  pageSize={this.pagesize} country='in' category='sports'/>} />
        <Route exact path="/entertainment" element={ <News key='entertainment' pageSize={this.pagesize} country='in' category='entertainment'/>} />
        <Route exact path="/science" element={ <News key='science' pageSize={this.pagesize} country='in' category='science'/>} />
        <Route exact path="/health" element={ <News key='health' pageSize={this.pagesize} country='in' category='health'/>} />
        <Route exact path="/buisness" element={ <News key='buisness' pageSize={this.pagesize} country='in' category='buisness'/>} />
        <Route exact path="/technology" element={ <News key='technology' pageSize={this.pagesize} country='in' category='technology'/>} />
        <Route exact path="/" element={ <News key='general' pageSize={this.pagesize} country='in' category='general'/>} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

