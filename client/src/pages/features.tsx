import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Minus, RotateCcw, Plus } from 'lucide-react'
import { useVersionStore } from '@/lib/version-store'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters')
})

type FormData = z.infer<typeof formSchema>

export default function Features() {
  const { counter, incrementCounter, decrementCounter, resetCounter } = useVersionStore()
  const { toast } = useToast()
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      description: ''
    }
  })

  const onSubmit = (data: FormData) => {
    toast({
      title: 'Form Submitted',
      description: `Project: ${data.projectName} - ${data.description.substring(0, 50)}...`
    })
    form.reset()
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">App Features</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore the interactive features designed for version control testing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Test Form */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Test Form</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-sm font-medium text-slate-700 mb-2">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  {...form.register('projectName')}
                  className="mt-1"
                />
                {form.formState.errors.projectName && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.projectName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-slate-700 mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project"
                  rows={3}
                  {...form.register('description')}
                  className="mt-1"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Submit Test
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Counter Widget */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Counter Widget</h3>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">{counter}</div>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={decrementCounter}
                  className="bg-red-100 text-red-600 hover:bg-red-200 border-red-200"
                >
                  <Minus size={16} className="mr-2" />
                  Decrease
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCounter}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  onClick={incrementCounter}
                  className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 border-emerald-200"
                >
                  <Plus size={16} className="mr-2" />
                  Increase
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
