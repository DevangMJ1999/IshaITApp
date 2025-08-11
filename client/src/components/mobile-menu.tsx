import { Link } from 'wouter'
import { LucideIcon } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavigationItem[]
  currentLocation: string
}

export function MobileMenu({ isOpen, onClose, navigation, currentLocation }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="md:hidden border-t border-slate-200 bg-white">
      <div className="px-4 py-3 space-y-3">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentLocation === item.href
          
          return (
            <Link key={item.name} href={item.href}>
              <button
                onClick={onClose}
                className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} className="mr-2 inline" />
                {item.name}
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
