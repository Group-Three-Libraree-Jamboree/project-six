import React from 'react';
import firebase from './firebase.js'

function Transaction(props) {


  const deleteItem = () => {
    // console.log(props.bookId)
    const itemRef = firebase.database().ref('Transactions').child(props.index)
    itemRef.remove()
  }

  return (
    <li key={props.index}>
      <span>Transaction description: {props.description}|</span><span>Transaction amount: {props.amount}</span>
      <button onClick={deleteItem}>Remove transaction</button>
    </li>
  )
}


export default Transaction