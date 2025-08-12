import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GitBranch, Upload, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function CommitHelper() {
  const { toast } = useToast()

  const handleSimulateCommit = () => {
    toast({
      title: 'Commit Simulation',
      description: 'Use the actual Git Pane to commit your changes to GitHub!'
    })
  }

  const handleSimulatePush = () => {
    toast({
      title: 'Push Simulation', 
      description: 'Your changes are ready to be pushed to your repository.'
    })
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-600 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-green-800">Ready to Commit</h3>
        </div>
        <p className="text-green-700 mb-4">
          Changes have been made to the application. Check your Git Pane to see the modifications!
        </p>
        <div className="flex space-x-3">
          <Button 
            onClick={handleSimulateCommit}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <GitBranch size={16} className="mr-2" />
            Simulate Commit
          </Button>
          <Button 
            onClick={handleSimulatePush}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-100"
          >
            <Upload size={16} className="mr-2" />
            Simulate Push
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}