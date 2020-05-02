type Dictionary<T> = {
    [key: string]: T[];
};

export function groupBy<T>(items: T[], key: (item: T) => string): Dictionary<T> {
    return items.reduce(
        (result, item) => ({
            ...result,
            [key(item)]: [...(result[key(item)] || []), item],
        }),
        {} as Dictionary<T>,
    );
}
