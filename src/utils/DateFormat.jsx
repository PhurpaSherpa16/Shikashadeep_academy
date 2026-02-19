import { formatDistanceStrict, isPast } from "date-fns"

export const formatRemainingTime = (date) =>{
    const now = new Date()
    if(isPast(date)) return `${formatDistanceStrict(date, now)} ago`

    return `${formatDistanceStrict(date, now)} remaining`
}