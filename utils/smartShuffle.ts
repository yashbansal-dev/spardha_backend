
/**
 * Smart Shuffle Algorithm
 * 
 * Goal: Shuffle an array of images such that images from the same "event" (grouped by filename prefix)
 * are separated by at least K positions.
 * 
 * Strategy:
 * 1. Group images by prefix (e.g. "121A", "DSC").
 * 2. Shuffle each group internally.
 * 3. Reassemble the array by picking valid candidates for each slot.
 */

export const smartShuffle = (images: string[], minDistance: number = 4): string[] => {
    // 1. Group images
    const groups: Record<string, string[]> = {};

    // Regex to capture the event prefix (e.g., "121A" from "/assets/121A0024.JPG")
    // Adjust regex based on actual file paths: '/assets/gallery-all/121A0024.JPG'
    // We want "121A" or "DSC"
    const prefixRegex = /\/([a-zA-Z0-9]+)[0-9]{4,}\./;
    // Matches "121A" followed by at least 4 digits, or "DSC" followed by ...
    // Note: The file names are like '121A0024.JPG'. 
    // Let's relax it to just take the alphabetic/alphanumeric prefix before the number sequence.

    images.forEach(img => {
        const match = img.match(/\/([a-zA-Z]+|[0-9]+[a-zA-Z]+)(?=[0-9])/);
        // Examples:
        // /121A0024.JPG -> 121A
        // /DSC_0001.JPG -> DSC_
        // Let's try a simpler approach: get the filename, split by non-digits

        const filename = img.split('/').pop() || "";
        // Match standard camera prefixes roughly
        let prefix = "misc";
        if (filename.startsWith("121A")) prefix = "121A";
        else if (filename.startsWith("DSC")) prefix = "DSC";
        else if (filename.startsWith("IMG")) prefix = "IMG";

        if (!groups[prefix]) groups[prefix] = [];
        groups[prefix].push(img);
    });

    // 2. Shuffle each group internally
    Object.keys(groups).forEach(key => {
        groups[key] = fisherYatesShuffle(groups[key]);
    });

    // 3. Reconstruct
    // We will use a priority to pick from the group with the most remaining items
    // to avoid getting stuck with one group at the end.
    const result: string[] = [];
    const totalImages = images.length;

    // Flatten groups into a list of { prefix, images[] } for easier management
    let groupList = Object.keys(groups).map(k => ({
        prefix: k,
        items: groups[k]
    }));

    for (let i = 0; i < totalImages; i++) {
        // Filter variables for valid candidates
        // A candidate group is valid if it wasn't used in the last `minDistance` slots
        // actually more strictly: none of the last `minDistance` items have this prefix.

        // Find recent prefixes
        const recentPrefixes = new Set<string>();
        const startCheck = Math.max(0, result.length - minDistance);
        for (let j = startCheck; j < result.length; j++) {
            const path = result[j];
            const pFilename = path.split('/').pop() || "";
            let pPrefix = "misc";
            if (pFilename.startsWith("121A")) pPrefix = "121A";
            else if (pFilename.startsWith("DSC")) pPrefix = "DSC";
            else if (pFilename.startsWith("IMG")) pPrefix = "IMG";
            recentPrefixes.add(pPrefix);
        }

        // Sort groups by 'count remaining' descending -> best effort to use up large groups
        groupList.sort((a, b) => b.items.length - a.items.length);

        // Find a valid group
        let chosenGroup = groupList.find(g => g.items.length > 0 && !recentPrefixes.has(g.prefix));

        // Fallback: If all valid groups are empty or blocked, just pick the one with most items
        if (!chosenGroup) {
            chosenGroup = groupList.find(g => g.items.length > 0);
        }

        if (chosenGroup) {
            const img = chosenGroup.items.pop();
            if (img) result.push(img);
        }
    }

    return result;
};

// Standard Fisher-Yates
const fisherYatesShuffle = <T>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
