import { useEffect, useState } from 'react'
import "./TransactionList.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import axios from 'axios';
import dayjs from "dayjs";
import { toast } from 'react-toastify';

const TransactionList = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);

  const fetchData = async (e) => {
    try {
      const response = await axios.get("rupayamatebackend.vercel.app/api/transaction", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTransactions(response.data);
      // console.log(response.data)
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token]);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`rupayamatebackend.vercel.app/api/transaction/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  }
  return (
    <div className='cart'>
      {/* <!-- TRANSACTION LIST --> */}
      <div className="card mb-4">
        <div className="card-header fw-bold">
          Transactions
        </div>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ?
                (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No transactions found
                    </td>
                  </tr>
                ) :
                (
                  transactions.map((tx) => (
                    <tr key={tx._id}>
                      <td><span className={`badge ${tx.type === "income" ? "bg-success" : "bg-danger"}`}>{tx.type}</span></td>
                      <td>{tx.category}</td>
                      <td>₹ {tx.amount}</td>
                      <td>{dayjs(tx.date).format("DD-MM-YYYY")}</td>
                      <td>{tx.description}</td>
                      <td>
                        <Link to={`/users/${tx._id}/edit`}> <button className="btn btn-sm btn-warning">Edit</button></Link>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteUser(tx._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TransactionList
