import { GitBranch, Plus, Edit, Save } from 'lucide-react'
import { useVersionStore, Commit } from '@/lib/version-store'

export function RecentActivity() {
  const { recentCommits } = useVersionStore()

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'branch':
        return GitBranch
      case 'plus':
        return Plus
      case 'edit':
        return Edit
      default:
        return Save
    }
  }

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'branch':
        return 'bg-blue-100 text-blue-600'
      case 'plus':
        return 'bg-emerald-100 text-emerald-600'
      case 'edit':
        return 'bg-orange-100 text-orange-600'
      default:
        return 'bg-purple-100 text-purple-600'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {recentCommits.map((commit: Commit) => {
          const Icon = getIcon(commit.icon)
          const iconColor = getIconColor(commit.icon)
          
          return (
            <div
              key={commit.id}
              className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-800">{commit.message}</div>
                <div className="text-sm text-slate-500">{commit.timestamp}</div>
              </div>
              <div className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
                {commit.hash}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
