import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATH } from '../../utils/apiPaths'
import { analyzeBudgets } from '../../utils/helper'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'
import CategoryPieChart from '../../components/Charts/CategoryPieChart'
import BudgetAlertBanner from '../../components/BudgetAlertBanner'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([])
  
const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
const [budgets, setBudgets] = useState([])
const [pieData, setPieData] = useState([])
const [alerts, setAlerts] = useState([])
  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.GET_ALL_EXPENSE)
      if (response.data) setExpenseData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const fetchBudgets = async () => {
    const now = new Date()
    try {
      const res = await axiosInstance.get(API_PATH.BUDGET.GET_BUDGETS, {
        params: { month: now.getMonth() + 1, year: now.getFullYear() }
      })
      setBudgets(res.data)
    } catch (err) {
      console.error("Error fetching budgets", err)
    }
  }
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense
    if (!category.trim()) { toast.error("Category is required."); return }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0."); return }
    if (!date) { toast.error("Date is required."); return }

    try {
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, { category, amount, date, icon })
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error adding Expense", error.response?.data?.message || error.message)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success("Expense deleted successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.error("Error deleting expense", error.response?.data?.message || error.message)
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading expense details", error.message)
      toast.error("Failed to download expense details")
    }
  }

  useEffect(() => {
    if (expenseData.length > 0) {
      const { pieData, alerts } = analyzeBudgets(expenseData, budgets)
      setPieData(pieData)
      setAlerts(alerts)
    }
  }, [expenseData, budgets])

  useEffect(() => {
    fetchExpenseDetails()
    fetchBudgets()
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-6">

            <BudgetAlertBanner alerts={alerts} />

            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />

            <CategoryPieChart pieData={pieData} />

            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense