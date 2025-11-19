"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useBudgetStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"
import { toast } from "sonner"
import { useEffect } from "react"

export function SettingsView() {
  const { locale, currency, highContrast, setLocale, setCurrency, setHighContrast } = useBudgetStore()

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [highContrast])

  const handleSave = () => {
    toast.success(getTranslation(locale, 'settingsSaved'))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation(locale, 'settings')}</CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{getTranslation(locale, 'language')}</Label>
            <Select value={locale} onValueChange={(val: any) => setLocale(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="sw-KE">Swahili (Kenya)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{getTranslation(locale, 'currency')}</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="KES">KES (KSh)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>{getTranslation(locale, 'highContrast')}</Label>
              <p className="text-sm text-muted-foreground">
                {getTranslation(locale, 'enableHighContrast')}
              </p>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <Button onClick={handleSave} className="w-full sm:w-auto">
            {getTranslation(locale, 'saveSettings')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
