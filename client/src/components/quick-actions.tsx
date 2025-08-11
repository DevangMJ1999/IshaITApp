import { Plus, Save, Github, History } from 'lucide-react'
import { useVersionStore } from '@/lib/version-store'
import { useToast } from '@/hooks/use-toast'

export function QuickActions() {
  const { incrementVersion, addCommit } = useVersionStore()
  const { toast } = useToast()

  const actions = [
    {
      title: 'Increment Version',
      description: 'Bump version number',
      icon: Plus,
      color: 'blue',
      onClick: () => {
        incrementVersion()
        toast({
          title: 'Version Incremented',
          description: 'Version number has been bumped successfully.'
        })
      }
    },
    {
      title: 'Create Commit',
      description: 'Save current state',
      icon: Save,
      color: 'emerald',
      onClick: () => {
        addCommit('Manual commit created', 'save')
        toast({
          title: 'Commit Created',
          description: 'New commit has been saved to history.'
        })
      }
    },
    {
      title: 'Push to GitHub',
      description: 'Deploy changes',
      icon: Github,
      color: 'purple',
      onClick: () => {
        toast({
          title: 'Push Simulated',
          description: 'In a real app, this would push to GitHub.'
        })
      }
    },
    {
      title: 'View History',
      description: 'Check past versions',
      icon: History,
      color: 'orange',
      onClick: () => {
        toast({
          title: 'History View',
          description: 'Check the recent activity section below.'
        })
      }
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 hover:border-blue-300',
      emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 hover:border-emerald-300',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200 hover:border-purple-300',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-200 hover:border-orange-300'
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => {
        const Icon = action.icon
        const colorClasses = getColorClasses(action.color)
        
        return (
          <button
            key={action.title}
            onClick={action.onClick}
            className={`action-card p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all text-center group ${colorClasses.split(' ').filter(c => c.includes('hover:border')).join(' ')}`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors ${colorClasses.split(' ').filter(c => !c.includes('hover:border')).join(' ')}`}>
              <Icon size={20} />
            </div>
            <h3 className="font-medium text-slate-800 mb-1">{action.title}</h3>
            <p className="text-sm text-slate-500">{action.description}</p>
          </button>
        )
      })}
    </div>
  )
}
