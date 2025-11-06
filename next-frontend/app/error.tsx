"use client"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/30">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-slate-50 mb-2">Oops!</h1>

        {/* Error Message */}
        <p className="text-slate-300 text-lg mb-6">
          Something went wrong with the portfolio dashboard. Please try again later.
        </p>

        {/* Error Details */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400 font-mono">Backend is not Running</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Go Back Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-50 font-medium py-3 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>

        {/* Support Text */}
        <p className="text-xs text-slate-500 mt-6">If the problem persists, please contact support</p>
      </div>
    </div>
  )
}
