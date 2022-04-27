import React, { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
  };

  useEffect(() => {
    if(response.succes){
      setName('')
      setAmount('')
    }
  }, [response.succes])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={submitHandler}>
        <label>
          <span>Transaction name:</span>
          <input type="text" required onChange={nameHandler} value={name} />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={amountHandler}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
