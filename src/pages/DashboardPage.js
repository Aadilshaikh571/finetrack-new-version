import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Cards from "../components/cards/Card";
import AddIncome from "../components/modals/AddIncome";
import AddExpense from "../components/modals/AddExpense";
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionTable from "../components/transactionTables/TransactionTable";
import ChartComponent from "../components/charts/Chart";
import NoTransactions from "../components/modals/NoTransactions";
import Footer from "../components/header/Footer";
import "./dashboard.css";

const DashboardPage = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const [alertShown, setAlertShown] = useState(false);

  const showExpenseModal = () => setIsExpenseModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);

  const onFinish = (values, type) => {
    const newTransaction = {
      type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );

      if (!many) {
        toast.success("Transaction Added!", { position: "top-center" });
      }

      setTransactions((prev) => [...prev, transaction]);
    } catch (e) {
      toast.error("Couldn't add transaction", { position: "top-center" });
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        incomeTotal += t.amount;
      } else {
        expensesTotal += t.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);

    // 🚨 EXPENSE ALERT
    const EXPENSE_LIMIT = 10000;

    if (expensesTotal > EXPENSE_LIMIT && !alertShown) {
      toast.warning(
        `⚠️ High Spending Alert! You have spent ₹${expensesTotal}`,
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      setAlertShown(true);
    }

    if (expensesTotal <= EXPENSE_LIMIT) {
      setAlertShown(false);
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => data.push(doc.data()));
      setTransactions(data);
    }
    setLoading(false);
  }

  const sortedTransaction = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="dashboard-wrapper">
      <Header />

      <main className="dashboard-container">
        {loading ? (
          <div className="dashboard-loading">Loading Dashboard...</div>
        ) : (
          <>
            {/* SUMMARY */}
            <section className="dashboard-section">
              <Cards
                income={income}
                expenses={expenses}
                totalBalance={totalBalance}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
              />
            </section>

            {/* CHART */}
            <section className="dashboard-section glass">
              {transactions.length > 0 ? (
                <ChartComponent sortedTransaction={sortedTransaction} />
              ) : (
                <NoTransactions />
              )}
            </section>

            {/* TABLE */}
            <section className="dashboard-section">
              <TransactionTable
                transaction={transactions}
                addTransactions={addTransaction}
                fetchTransactions={fetchTransactions}
              />
            </section>

            {/* MODALS */}
            <AddExpense
              isExpenseModalVisible={isExpenseModalVisible}
              handleExpenseCancel={handleExpenseCancel}
              onFinish={onFinish}
            />
            <AddIncome
              isIncomeModalVisible={isIncomeModalVisible}
              handleIncomeCancel={handleIncomeCancel}
              onFinish={onFinish}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
