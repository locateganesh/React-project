
export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function minLength(value, length) {
    return value.trim().length < length
}
export function maxLength(value, length) {
    return value.trim().length >= length
}