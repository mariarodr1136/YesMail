import FemaleIcon1 from '../assets/FemaleIcon1.png';
import FemaleIcon2 from '../assets/FemaleIcon2.png';
import FemaleIcon3 from '../assets/FemaleIcon3.png';
import FemaleIcon4 from '../assets/FemaleIcon4.png';
import FemaleIcon5 from '../assets/FemaleIcon5.png';
import FemaleIcon6 from '../assets/FemaleIcon6.png';
import MaleIcon1 from '../assets/MaleIcon1.png';
import MaleIcon2 from '../assets/MaleIcon2.png';
import MaleIcon3 from '../assets/MaleIcon3.png';
import MaleIcon4 from '../assets/MaleIcon4.png';
import MaleIcon5 from '../assets/MaleIcon5.png';
import MaleIcon6 from '../assets/MaleIcon6.png';
import MaleIcon7 from '../assets/MaleIcon7.png';

const FEMALE_ICONS = [FemaleIcon1, FemaleIcon2, FemaleIcon3, FemaleIcon4, FemaleIcon5, FemaleIcon6];
const MALE_ICONS = [MaleIcon1, MaleIcon2, MaleIcon3, MaleIcon4, MaleIcon5, MaleIcon6, MaleIcon7];

const FEMALE_FIRST_NAMES = new Set([
    'Ari',
    'Asha',
    'Bianca',
    'Camila',
    'Clara',
    'Elena',
    'Elise',
    'Helena',
    'Imani',
    'Ivy',
    'Janelle',
    'Kiara',
    'Lena',
    'Leslie',
    'Maren',
    'Maya',
    'Mila',
    'Mira',
    'Monica',
    'Nadia',
    'Naomi',
    'Priya',
    'Rae',
    'Rina',
    'Serena',
    'Sienna',
    'Talia',
    'Tessa'
]);

const MALE_FIRST_NAMES = new Set([
    'Adrian',
    'Caleb',
    'Damon',
    'Darius',
    'Devon',
    'Evan',
    'Gavin',
    'Gideon',
    'Jonah',
    'Jules',
    'Marcus',
    'Micah',
    'Nico',
    'Noah',
    'Omar',
    'Owen',
    'Peter',
    'Rory',
    'Rowan',
    'Seth',
    'Theo'
]);

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

const getFirstName = (fullName) => {
    if (!fullName) return '';
    return String(fullName).trim().split(/\s+/)[0] || '';
};

const guessGender = (senderName) => {
    const first = getFirstName(senderName);
    if (!first) return 'unknown';
    if (FEMALE_FIRST_NAMES.has(first)) return 'female';
    if (MALE_FIRST_NAMES.has(first)) return 'male';
    // Light heuristic fallback for names not in our list.
    if (first.toLowerCase().endsWith('a')) return 'female';
    return 'unknown';
};

export const pickSenderAvatar = (senderName) => {
    const gender = guessGender(senderName);
    if (gender === 'female') return pickRandom(FEMALE_ICONS);
    if (gender === 'male') return pickRandom(MALE_ICONS);
    // Unknown: still pick something to avoid empty avatars.
    return pickRandom([...FEMALE_ICONS, ...MALE_ICONS]);
};

