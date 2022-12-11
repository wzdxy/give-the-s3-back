const lang = 'en-US'
export const i18n = (value: any) => {
    if (typeof value === "string") return value
    const desiredValue = value[lang]
    if (desiredValue) return desiredValue
    else {
        return value['en-us']
    }
}