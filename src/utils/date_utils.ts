export const add_time_strings = (a: string, b: string) => {
    const arr = a.split(' ')
    const brr = b.split(' ')
    let days = parseInt(arr[0]) + parseInt(brr[0])
    let hours = parseInt(arr[2]) + parseInt(brr[2])
    let minutes = parseInt(arr[4]) + parseInt(brr[4])
    let seconds = parseInt(arr[6]) + parseInt(brr[6])
    let millis = parseInt(arr[8]) + parseInt(brr[8])

    if (millis >= 1000) {
        seconds += 1
        millis -= 1000
    }
    if (seconds >= 60) {
        minutes += 1
        seconds -= 60
    }
    if (minutes >= 60) {
        hours += 1
        minutes -= 60
    }
    if (hours >= 24) {
        days += 1
        hours -= 24
    }
    return `${days} D ${hours} H ${minutes} M ${seconds} S ${millis} Ms`
}

export const divide_time_strings = (a: string, b: number) => {
    const arr = a.split(' ')
    let days = parseInt(arr[0])
    let hours = parseInt(arr[2])
    let minutes = parseInt(arr[4])
    let seconds = parseInt(arr[6])
    let millis = parseInt(arr[8])

    days = days / b
    if (days - Math.floor(days) > 0) {
        hours += (days - Math.floor(days)) * 24
        days = Math.floor(days)
    }

    hours = hours / b
    if (hours > 24) {
        days += 1
        hours -= 24
    }
    if (hours - Math.floor(hours) > 0) {
        minutes += (hours - Math.floor(hours)) * 60
        hours = Math.floor(hours)
    }

    minutes = minutes / b
    if (minutes >= 60) {
        hours += 1
        minutes -= 60
    }
    if (minutes - Math.floor(minutes) > 0) {
        seconds += (minutes - Math.floor(minutes)) * 60
        minutes = Math.floor(minutes)
    }

    seconds = seconds / b
    if (seconds >= 60) {
        minutes += 1
        seconds -= 60
    }
    if (seconds - Math.floor(seconds) > 0) {
        millis += (seconds - Math.floor(seconds)) * 1000
        seconds = Math.floor(seconds)
    }

    millis = millis / b
    if (millis >= 1000) {
        seconds += 1
        millis -= 1000
    }
    millis = Math.floor(millis)

    return `${days} D ${hours} H ${minutes} M ${seconds} S ${millis} Ms`
}

export const compare_time_strings = (a: string, b: string) => {
    const arr = a.split(' ')
    const brr = b.split(' ')
    let days = parseInt(arr[0]) - parseInt(brr[0])
    let hours = parseInt(arr[2]) - parseInt(brr[2])
    let minutes = parseInt(arr[4]) - parseInt(brr[4])
    let seconds = parseInt(arr[6]) - parseInt(brr[6])
    let millis = parseInt(arr[8]) - parseInt(brr[8])

    if (days > 0) {
        return 1
    } else if (days < 0) {
        return -1
    }
    if (hours > 0) {
        return 1
    } else if (hours < 0) {
        return -1
    }
    if (minutes > 0) {
        return 1
    } else if (minutes < 0) {
        return -1
    }
    if (seconds > 0) {
        return 1
    } else if (seconds < 0) {
        return -1
    }
    if (millis > 0) {
        return 1
    } else if (millis < 0) {
        return -1
    }
    return 0
}

export const millis_to_time_string = (milliseconds: number): string => {
    let millis = milliseconds
    let seconds = 0
    let minutes = 0
    let hours = 0
    let days = 0
    if (millis >= 1000) {
        seconds = Math.floor(millis / 1000)
        millis = millis % 1000
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60)
        seconds = seconds % 60
    }
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60)
        minutes = minutes % 60
    }
    if (hours >= 24) {
        days = Math.floor(hours / 24)
        hours = hours % 24
    }
    return `${days} D ${hours} H ${minutes} M ${seconds} S ${millis} Ms`
}