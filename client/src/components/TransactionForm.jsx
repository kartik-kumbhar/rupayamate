import React, { useState, useEffect } from 'react'
import "./TransactionForm.css"
import axios from "axios";
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const TransactionForm = () => {
  const [transaction, setTransaction] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    description: ""
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTransaction({
      ...transaction,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://rupayamatebackend.vercel.app/transaction`, transaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTransaction({
        type: "",
        category: "",
        amount: "",
        date: "",
        description: ""
      });
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token])

  return (
    <div className='cart'>
      {/* <!-- ADD TRANSACTION FORM --> */}
      <div className="card mb-4">
        <div className="card-header fw-bold">
          Add Transaction
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="type">Type :</label><br />
                <select className="form-select" name='type' value={transaction.type} onChange={handleInput} required>
                  <option value="">Select</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="category">Category :</label><br />
                <input type="text" name='category' value={transaction.category} onChange={handleInput} className="form-control" placeholder="Enter Category" required />
              </div>

              <div className="col-md-2">
                <label htmlFor="amount">Amount :</label><br />
                <input type="number" name='amount' value={transaction.amount} onChange={handleInput} className="form-control" placeholder="Amount" required />
              </div>

              <div className="col-md-2">
                <label htmlFor="date">Date :</label><br />
                <input type="date" name='date' value={transaction.date} onChange={handleInput} className="form-control" required />
              </div>

              <div className="col-md-2">
                <label htmlFor="description">Description :</label><br />
                <input type="text" name='description' value={transaction.description} onChange={handleInput} className="form-control" placeholder='Description' required />
              </div>

              <div className="col-md-3 d-grid">
                <button type="submit" className="btn btn-dark btn-add">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default TransactionForm
