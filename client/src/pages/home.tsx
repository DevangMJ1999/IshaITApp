import { VersionDisplay } from '@/components/version-display'
import { QuickActions } from '@/components/quick-actions'
import { RecentActivity } from '@/components/recent-activity'
import { CommitHelper } from '@/components/commit-helper'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to VersionTest App v1.3.1</h1>
        <p className="text-blue-100">Perfect for testing Git workflows and checkpoint management. Make changes and track them in your Git Pane!</p>
      </div>
      
      <VersionDisplay />
      <CommitHelper />
      <QuickActions />
      <RecentActivity />
    </div>
  )
}
