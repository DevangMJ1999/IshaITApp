import { VersionDisplay } from '@/components/version-display'
import { QuickActions } from '@/components/quick-actions'
import { RecentActivity } from '@/components/recent-activity'

export default function Home() {
  return (
    <div className="space-y-8">
      <VersionDisplay />
      <QuickActions />
      <RecentActivity />
    </div>
  )
}
