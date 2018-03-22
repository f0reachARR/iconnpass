const PADDING = 12;
const textWidth = (str: string) => str.split('')
    .reduce((len, char) => len + (char.match(/([\uff66-\uff9c]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])|[\x20-\x7E]/) ? 6 : 10), 0);

export const RED = 'e05d44';
export const GREEN = '4c1';
export const YELLOW = 'dfb317';
export const ORANGE = 'fe7d37';
export const GRAY = '9f9f9f';
export const BLUE = '007ec6';

export const svg = (subject: string, status: string, color = '4c1') => {
    const subjectWidth = textWidth(subject) + PADDING;
    const statusWidth = textWidth(status) + PADDING;
    const width = subjectWidth + statusWidth;
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="20">
<linearGradient id="b" x2="0" y2="100%">
<stop offset="0" stop-color="#bbb" stop-opacity=".1" />
<stop offset="1" stop-opacity=".1" />
</linearGradient>
<mask id="a">
<rect width="${width}" height="20" rx="3" fill="#fff" />
</mask>
<g mask="url(#a)">
<path fill="#555"    d="M0 0h${subjectWidth}v20H0z" />
<path fill="#${color}" d="M${subjectWidth} 0h${statusWidth}v20H${subjectWidth}z" />
<path fill="url(#b)" d="M0 0h${width}v20H0z" />
</g>
<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
<text x="${Math.floor(subjectWidth / 2)}" y="15" fill="#010101" fill-opacity=".3">${subject}</text>
<text x="${Math.floor(subjectWidth / 2)}" y="14">${subject}</text>
<text x="${Math.floor(statusWidth / 2) + subjectWidth}" y="15" fill="#010101" fill-opacity=".3">${status}</text>
<text x="${Math.floor(statusWidth / 2) + subjectWidth}" y="14">${status}</text>
</g>
</svg>`.replace(/\n/g, '');
};