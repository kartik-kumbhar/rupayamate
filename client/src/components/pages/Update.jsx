import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../../store/auth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useAuth();
    const [transaction, setTransaction] = useState({
        type: "",
        category: "",
        amount: "",
        date: "",
        description: ""
    });
    const fetchdata = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/transaction/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransaction(response.data);
            // console.log(response.data);

        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        fetchdata();
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/transaction/update/${id}`, transaction, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            navigate("/list");
        } catch (error) {
            toast.error(error.response?.data?.message);

        }
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTransaction({
            ...transaction,
            [name]: value
        });
    }

    return (
        <div className='cart'>
            {/* <!-- Update TRANSACTION FORM --> */}
            <div className="card mb-4">
                <div className="card-header fw-bold">
                    Update Transaction
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
                                <input type="date" name='date' value={dayjs(transaction.date).format("YYYY-MM-DD")} onChange={handleInput} className="form-control" required />
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="description">Description :</label><br />
                                <input type="text" name='description' value={transaction.description} onChange={handleInput} className="form-control" placeholder='Description' required />
                            </div>

                            <div className="col-md-3 d-grid">
                                <button type="submit" className="btn btn-dark btn-add">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Update
