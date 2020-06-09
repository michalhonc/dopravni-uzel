import React from 'react';
import FuzzySearch from 'fuzzy-search';

export function useFuzzySearch(needle: string, haystack: object, keys: string[]) {
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        const searcher = new FuzzySearch(haystack, keys, {});

        const searchRes = searcher.search(needle);
        setResult(searchRes);
    }, [needle]);

    return [result];
}
