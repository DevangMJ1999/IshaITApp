import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useVersionStore } from '@/lib/version-store'
import { useToast } from '@/hooks/use-toast'

export default function Settings() {
  const { settings, updateSettings } = useVersionStore()
  const { toast } = useToast()
  
  const form = useForm({
    defaultValues: settings
  })

  const onSubmit = (data: typeof settings) => {
    updateSettings(data)
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.'
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Settings</h2>
        <p className="text-lg text-slate-600">Configure your version control testing environment</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Repository Settings */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Repository Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="repoUrl" className="text-sm font-medium text-slate-700 mb-2">
                    Repository URL
                  </Label>
                  <Input
                    id="repoUrl"
                    type="url"
                    placeholder="https://github.com/username/repo"
                    {...form.register('repoUrl')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="defaultBranch" className="text-sm font-medium text-slate-700 mb-2">
                    Default Branch
                  </Label>
                  <Select
                    value={form.watch('defaultBranch')}
                    onValueChange={(value) => form.setValue('defaultBranch', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">main</SelectItem>
                      <SelectItem value="master">master</SelectItem>
                      <SelectItem value="develop">develop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">Auto-increment version</div>
                    <div className="text-sm text-slate-500">Automatically bump version on commit</div>
                  </div>
                  <Switch
                    checked={form.watch('autoIncrement')}
                    onCheckedChange={(checked) => form.setValue('autoIncrement', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">Show commit history</div>
                    <div className="text-sm text-slate-500">Display recent commits on homepage</div>
                  </div>
                  <Switch
                    checked={form.watch('showHistory')}
                    onCheckedChange={(checked) => form.setValue('showHistory', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </form>
      </div>
    </div>
  )
}
