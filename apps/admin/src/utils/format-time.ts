import { formatDistanceToNow } from 'date-fns'

export const formatTimeFromNow = (date: Date) => formatDistanceToNow(date, { addSuffix: true })
