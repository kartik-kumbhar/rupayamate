import "./Dashboard.css"
import dayjs from "dayjs";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";


const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [states, setStates] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    savingsRate: 0
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("https://rupayamatebackend.vercel.app/api/transaction",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setTransactions(response.data);
      calculateStats(response.data);
      // console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error("Error fetching user data!!!");
      }
    }

  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token]);

  const calculateStats = (data) => {
    let income = 0;
    let expense = 0;

    data.forEach((t) => {
      if (t.type === "income") income += t.amount;
      if (t.type === "expense") expense += t.amount;
    });

    let balance = income - expense;
    const savingsRate = income ? Math.round(((income - expense) / income) * 100) : 0;

    setStates({ income, expense, balance, savingsRate });
  }

  const cuurentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = transactions
    .filter((t) =>
      (t.type === "income" && new Date(t.date).getMonth() === cuurentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => (t.type === "expense" && new Date(t.date).getMonth() === cuurentMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const lastTransaction = transactions[transactions.length - 1] || null;

  const MONTHLY_LIMIT = 20000;
  const limitUsedPer = Math.min(Math.round((monthlyExpense / MONTHLY_LIMIT) * 100), 100);

  const SAVINGS_GOAL = 20000;
  const savings = states.balance;
  const savingPer = Math.min(Math.round((savings / SAVINGS_GOAL) * 100), 100);

  let topCategory = null;
  let lowestCategory = null;

  const top_lowest_category = () => {
    const expenseCategories = {};

    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        expenseCategories[t.category] =
          (expenseCategories[t.category] || 0) + t.amount;
      });

    const categoryArray = Object.entries(expenseCategories);

    if (categoryArray.length > 0) {
      topCategory = categoryArray.reduce((a, b) => (a[1] > b[1] ? a : b));
      lowestCategory = categoryArray.reduce((a, b) => (a[1] < b[1] ? a : b));
    }
  }

  const getIcon = (category) => {
    const categoryIcons = {
      food: "🍔",
      drink: "🥤",
      groceries: "🛒",
      shopping: "🛍️",
      clothing: "👕",
      transport: "🚗",
      fuel: "⛽",
      travel: "✈️",
      entertainment: "🎬",
      cinema: "🎬",
      movie: "🎬",
      subscriptions: "📺",
      health: "🏥",
      medical: "💊",
      education: "🎓",
      rent: "🏠",
      bills: "💡",
      electricity: "⚡",
      water: "🚰",
      internet: "🌐",
      mobile: "📱",
      insurance: "🛡️",
      emi: "💳",
      donation: "❤️",
      gift: "🎁",
      family: "👨‍👩‍👧‍👦",
      maintenance: "🧰",
      salary: "💼",
      business: "🏢",
      freelance: "👨‍💻",
      investment: "📈",
      stocks: "💹",
      interest: "🏦",
      bonus: "🎉",
      cashback: "🎁",
      refund: "🔁",
      others: "🔖"
    }

    if (!category) return "";
    const key = category.toLowerCase();
    return categoryIcons[key] || "🔖";
  };

  top_lowest_category();

  return (
    <>    <div className="dashboard-wrapper">
      {/* HEADER */}
      <div className="row mb-4 align-items-center" style={{ marginLeft: "300px" }}>

        {/* IMAGE */}
        <div className="col-lg-2 col-md-3 col-4 text-center">
          <img
            src="/images/symbol.png"
            alt="RupayaMate Logo"
            className="dashboard-logo"
          />
        </div>

        {/* TEXT */}
        <div className="col-lg-6">
          <h5>Welcome {user?.name}</h5>
          <h3 className="text-white fw-bold">Financial Overview</h3>
          <p className="text-muted">
            Track your income, expenses, and balance at a glance.
          </p>
        </div>

      </div>
      <div className="container">

        {/* ROW 1: CORE KPIs */}
        <div className="row g-4 mb-4">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Total Income</p>
              <h3 className="text-success">₹ {states.income}</h3>
              <p className="card-sub">All time</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Total Expense</p>
              <h3 className="text-danger">₹ {states.expense}</h3>
              <p className="card-sub">All time</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Current Balance</p>
              <h3 className="text-primary">₹{states.balance}</h3>
              <p className="card-sub">Available funds</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Savings Rate</p>
              <h3>{states.savingsRate}%</h3>
              <p className="card-sub">Income vs Expense</p>
            </div>
          </div>
        </div>

        {/* ROW 2: MONTHLY STATS */}
        <div className="row g-4 mb-4">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">This Month Income</p>
              <h4 className="text-success">₹ {monthlyIncome}</h4>
              <p className="card-sub">{dayjs(cuurentMonth).format("MMM")} {currentYear}</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">This Month Expense</p>
              <h4 className="text-danger">₹ {monthlyExpense}</h4>
              <p className="card-sub">{dayjs(cuurentMonth).format("MMM")} {currentYear}</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Expense Limit Used</p>
              <h5>{limitUsedPer}%</h5>
              <div className="progress mt-2">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: `${limitUsedPer}%` }}
                />
              </div>
              <p className="card-sub mt-1">Limit ₹{MONTHLY_LIMIT}</p>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Savings Goal</p>
              <h5>₹{savings} / ₹{SAVINGS_GOAL}</h5>
              <div className="progress mt-2">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${savingPer}%` }}
                />
              </div>
              <p className="card-sub mt-1">Goal progress</p>
            </div>
          </div>
        </div>

        {/* ROW 3: INSIGHTS */}
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="dashboard-card" >
              <p className="card-title">Top Spending Category</p>
              {
                topCategory ?
                  <>
                    <h4>{topCategory[0]} {getIcon(topCategory[0])}</h4>
                    <p className="card-sub">₹{topCategory[1]} spent</p>
                  </>
                  : <p className="card-sub">No expenses yet</p>

              }
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="dashboard-card">
              <p className="card-title">Lowest Spending Category</p>
              {lowestCategory ?
                <>
                  <h4>{lowestCategory[0]} {getIcon(lowestCategory[0])}</h4>
                  <p className="card-sub">₹{lowestCategory[1]} spent</p>
                </>
                :
                <p className="card-sub">No expenses yet</p>

              }

            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="dashboard-card">
              <p className="card-title">Last Transaction</p>
              <h5>{lastTransaction ? `${lastTransaction.type} – ${lastTransaction.category} ${getIcon(lastTransaction.category)} – ₹${lastTransaction.amount}` : "No Transaction"}</h5>
              <span className="badge bg-secondary">{lastTransaction ? dayjs(lastTransaction.date).format("DD MMM YYYY") : ""}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    </>

  );
};

export default Dashboard;

