import React from 'react'
import { LuTriangleAlert } from 'react-icons/lu'

const BudgetAlertBanner = ({ alerts }) => {
    if (!alerts || alerts.length === 0) return null

    return (
        <div className="flex flex-col gap-2 mb-4">
            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3"
                >
                    <LuTriangleAlert className="text-lg mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{alert}</p>
                </div>
            ))}
        </div>
    )
}

export default BudgetAlertBanner