import { formatDistanceToNow, format } from "date-fns"

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatRelativeTime(date: string) {
  const now = new Date()
  const targetDate = new Date(date)
  const diffInHours = (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    return formatDistanceToNow(targetDate, { addSuffix: true })
  } else if (diffInHours < 168) { // 7 days
    return format(targetDate, 'EEEE')
  } else {
    return format(targetDate, 'MMM d, yyyy')
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
} 