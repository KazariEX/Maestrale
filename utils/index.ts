export function tableToOptions(table: {
    [key: number]: string
}) {
    return Object.entries(table).map(([key, value]) => {
        return {
            value: Number(key),
            label: value
        }
    });
}