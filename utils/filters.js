import moment from 'moment'

const dateFormat = (date, format = 'YYYY-MM-DD') => {
    const formattedDate = moment(date).format(format)

    return formattedDate
}

export {
    dateFormat
}
