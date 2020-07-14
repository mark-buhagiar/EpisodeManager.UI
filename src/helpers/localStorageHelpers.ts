import LocalStorageItem from '../models/LocalStorageItem';

function findLocalStorageItems(query: string): LocalStorageItem[] {
    let i;
    const results = [];
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            if (i.match(query) || (!query && typeof i === 'string')) {
                const value = localStorage.getItem(i);
                if (value !== null) {
                    const parsedValue = JSON.parse(value);
                    results.push({ key: i, val: parsedValue });
                }
            }
        }
    }
    return results;
}

export function removeItemWithRegexKey(key: string): void {
    try {
        localStorage.removeItem(findLocalStorageItems(key)[0].key);
    } catch {
        console.log('LocalStorage key not found');
    }
}
