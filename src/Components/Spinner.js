import React, { Component } from 'react'
import loading from "./loading.webp";

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading}alt="Loading..." />
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default Spinner
