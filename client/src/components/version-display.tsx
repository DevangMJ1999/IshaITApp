import { useVersionStore } from '@/lib/version-store'

export function VersionDisplay() {
  const { version, commits, branch } = useVersionStore()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Current Version</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-600 font-medium">Active</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{version}</div>
          <div className="text-sm text-slate-500 mt-1">Version Number</div>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-3xl font-bold text-slate-700">{commits}</div>
          <div className="text-sm text-slate-500 mt-1">Total Commits</div>
        </div>
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-3xl font-bold text-emerald-600">{branch}</div>
          <div className="text-sm text-slate-500 mt-1">Current Branch</div>
        </div>
      </div>
    </div>
  )
}
