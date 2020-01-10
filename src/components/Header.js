import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = props => {
  return(
    <div className="header">
      <Link to={props.back}>
        <FontAwesomeIcon icon="arrow-left" size="2x"/>
      </Link>
      <h1>{props.title}</h1>
    </div>
  )
}

export default Header