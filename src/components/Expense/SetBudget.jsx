import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { API_PATH } from "../../utils/apiPaths";
export default function SetBudget({ onSuccess }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedCategory = category.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedCategory) {
      setStatus("error");
      setMessage("Please enter a category name.");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setStatus("error");
      setMessage("Please enter a valid amount greater than 0.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      await axiosInstance.post(API_PATH.BUDGET.SET_BUDGET, {
  category: trimmedCategory,
  amount: parsedAmount,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
});
      setStatus("success");
      setMessage(`Budget set: ₹${parsedAmount.toLocaleString("en-IN")} for "${trimmedCategory}"`);
      setCategory("");
      setAmount("");
      if (onSuccess) onSuccess(); 
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setStatus("error");
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="15" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </div>
          <div>
            <h2 style={styles.title}>Set Budget</h2>
            <p style={styles.subtitle}>Define a spending limit for any category</p>
          </div>
        </div>

        {/* Form */}
        <div style={styles.form}>
          {/* Category */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="budget-category">
              Category
            </label>
            <input
              id="budget-category"
              type="text"
              placeholder="e.g. Groceries, Rent, Travel"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
              disabled={loading}
              autoComplete="off"
            />
          </div>

          {/* Amount */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="budget-amount">
              Amount (₹)
            </label>
            <div style={styles.amountWrap}>
              <span style={styles.currencySymbol}>₹</span>
              <input
                id="budget-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ ...styles.input, ...styles.amountInput }}
                disabled={loading}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Feedback */}
          {status && (
            <div style={{ ...styles.feedback, ...(status === "success" ? styles.feedbackSuccess : styles.feedbackError) }}>
              <span style={styles.feedbackIcon}>
                {status === "success" ? "✓" : "✕"}
              </span>
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              "Set Budget"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e8ecf0",
    borderRadius: "16px",
    padding: "28px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },
  iconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#f0faf4",
    color: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.3px",
  },
  subtitle: {
    margin: "3px 0 0",
    fontSize: "13px",
    color: "#6b7280",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    letterSpacing: "0.01em",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    color: "#111827",
    background: "#fafafa",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  amountWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  currencySymbol: {
    position: "absolute",
    left: "14px",
    fontSize: "14px",
    color: "#6b7280",
    pointerEvents: "none",
    fontWeight: "600",
  },
  amountInput: {
    paddingLeft: "30px",
  },
  feedback: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "13.5px",
    fontWeight: "500",
  },
  feedbackSuccess: {
    background: "#f0fdf4",
    color: "#15803d",
    border: "1px solid #bbf7d0",
  },
  feedbackError: {
    background: "#fff1f2",
    color: "#be123c",
    border: "1px solid #fecdd3",
  },
  feedbackIcon: {
    fontWeight: "700",
    fontSize: "13px",
  },
  btn: {
    width: "100%",
    padding: "11px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.02em",
    transition: "background 0.15s",
    marginTop: "2px",
  },
  btnDisabled: {
    background: "#9ca3af",
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2.5px solid rgba(255,255,255,0.3)",
    borderTop: "2.5px solid #ffffff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
};

// Inject spinner keyframe
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(styleEl);
}
