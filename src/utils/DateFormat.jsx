import { formatDistanceStrict, isPast } from "date-fns"

export const formatRemainingTime = (date) =>{
    const now = new Date()
    if(isPast(date)) return `${formatDistanceStrict(date, now)} ago`
    if(!date || isNaN(new Date(date))) return 'N/A'

    return `${formatDistanceStrict(date, now)} remaining`
}