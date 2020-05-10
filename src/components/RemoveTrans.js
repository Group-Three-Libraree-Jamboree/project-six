import React from 'react';
import firebase from './firebase.js'

function Transaction(props) {


  const deleteItem = () => {
    // console.log(props.bookId)
    const itemRef = firebase.database().ref('Transactions').child(props.index)
    itemRef.remove()
  }

  return (
    <li className="displayTransactions" key={props.index}>
      <button className="remove" onClick={deleteItem}>-</button>
      <span>{props.description}: {props.amount}</span>  
    </li>
  )
}


export default Transaction