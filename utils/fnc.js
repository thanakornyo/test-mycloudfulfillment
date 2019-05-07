const DateDiff = require('date-diff')

// Date Diff
const dateDiif = (startDate, endDate) => {
    let date1 = new Date(endDate)
    let date2 = new Date(startDate)

    let diff = new DateDiff(date1, date2).days()
    // If deposited less than 1 day
    if(Math.ceil(diff) == 0){
        //  If deposited is true! and minutes more then 1 min
        let diffMinutes = new DateDiff(date1, date2).minutes()
        if(diffMinutes > 0){
            return 1
        }
    }else{
        // If deposited more then 1 day
        return Math.ceil(diff)
    }
}

// Calculate price in case cosmetic
const calculateCosmetic = (startDate, endDate, cubicCentiMeter) => {
    let pricePerCubic = 1
    let currentPrice = 0
    let datePeriod = dateDiif(startDate, endDate)

    let totalPricePerCubic = cubicCentiMeter * pricePerCubic
    
    for(let i = 0; i < datePeriod; i++){
        if(i >= 1){
            totalPricePerCubic = totalPricePerCubic * 2
            currentPrice += totalPricePerCubic
        }else{
            currentPrice = totalPricePerCubic
        }
    }

    return currentPrice
}

// Calculate price in case cloths
const calculateCloths = (startDate, endDate, weight) => {
    let datePeriod = dateDiif(startDate, endDate)
    let totalPrice = 0

    if(weight === 0){
        let pricePerWeight = 50
        totalPrice = pricePerWeight * datePeriod    
    }else{
        let pricePerWeight = 20
        totalPrice = (pricePerWeight * weight) * datePeriod
    }

    return totalPrice
}

// Calculate price in others case
const calculateOthers = (startDate, endDate, cubicMeter) => {
    let datePeriod = dateDiif(startDate, endDate)
    let pricePerCubicMeter = 10

    return (cubicMeter * pricePerCubicMeter) * datePeriod
}

const calculatePrice = (obj) => {
    switch (obj.packType) {
        case 'cosmetic':
            return calculateCosmetic(obj.startDate, obj.endDate, obj.cubicCentiMeter)
            break;

        case 'clothes':
            return calculateCloths(obj.startDate, obj.endDate, obj.weight)
            break;

        case 'others':
            return calculateOthers(obj.startDate, obj.endDate, obj.cubicMeter)
            break;
            
        default:
            break;
    }
}

module.exports = {
    calculatePrice
}