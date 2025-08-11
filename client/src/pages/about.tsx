import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { useVersionStore } from '@/lib/version-store'

export default function About() {
  const { version } = useVersionStore()

  const features = [
    'Version tracking',
    'Commit history',
    'Interactive components',
    'Mobile responsive',
    'Easy modification'
  ]

  const techStack = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Shadcn UI',
    'Zustand',
    'Lucide Icons'
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">About VersionTest App</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A simple application designed to test version control workflows and GitHub integration
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Purpose</h3>
            <p className="text-slate-600 leading-relaxed">
              This application serves as a testing ground for version control practices, allowing developers to experiment with commit strategies, branching, and deployment workflows in a controlled environment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Features</h3>
            <ul className="space-y-2 text-slate-600">
              {features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check size={16} className="text-emerald-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-blue-100 text-blue-700">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Version Info</h3>
            <div className="space-y-2 text-slate-600">
              <div>
                <strong>Current Version:</strong> <span className="font-mono">{version}</span>
              </div>
              <div>
                <strong>Last Updated:</strong> <span>January 2025</span>
              </div>
              <div>
                <strong>License:</strong> MIT
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
