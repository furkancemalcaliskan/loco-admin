import { Check, Moon, Sun } from 'lucide-react'
import { useTheme } from '../components/theme-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { cn } from '../lib/utils'

export function Settings() {
  const { theme, setTheme } = useTheme()
  const options = [
    { value: 'light' as const, label: 'Light', description: 'Use the light color scheme.', icon: Sun },
    { value: 'dark' as const, label: 'Dark', description: 'Use the dark color scheme.', icon: Moon },
  ]

  return (
    <div className="max-w-3xl space-y-6">
      <div><h2 className="text-2xl font-semibold tracking-tight">Appearance</h2><p className="mt-1 text-sm text-muted-foreground">Choose your preferred interface theme. The selection is saved in this browser.</p></div>
      <Card>
        <CardHeader><CardTitle>Theme</CardTitle><CardDescription>This preference takes effect immediately.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => <button key={option.value} type="button" onClick={() => setTheme(option.value)} className={cn('relative flex items-start gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent', theme === option.value && 'border-foreground bg-accent')}><option.icon className="mt-0.5 size-5" /><span><span className="block text-sm font-medium">{option.label}</span><span className="mt-1 block text-xs text-muted-foreground">{option.description}</span></span>{theme === option.value && <Check className="absolute right-3 top-3 size-4" />}</button>)}
        </CardContent>
      </Card>
    </div>
  )
}
