import { Console } from "./func/index.js"

// Latihan 1
import { shuffleString } from "./func/shuffle_string.js"
Console(shuffleString, 'Hello')

// Latihan 2
import { isAnagram } from "./func/is_anagram.js"
Console(isAnagram, 'listen', 'silent')

// Latihan 3
import { wordFrequency } from "./func/word_frequency.js"
Console(wordFrequency, 'banana apple banana orange apple banana')

// Latihan 4
import { filterOddLengthWords } from "./func/filter_odd_length_words.js"
Console(filterOddLengthWords, ["hello", "world", "typescript", "js"])

// Latihan 5
import { extractInitials } from "./func/extract_initials.js"
Console(extractInitials, "I love TypeScript")

// Latihan 6
import { doubleChars } from "./func/double_chars.js"
Console(doubleChars, 'Hello')

// Latihan 7
import { removeDuplicates } from "./func/remove_duplicates.js"
Console(removeDuplicates, ["apple", "banana", "apple", "cherry", "banana"])

// Latihan 8
import { formatPhoneNumber } from "./func/format_phone_number.js"
Console(formatPhoneNumber, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

// Latihan 9
import { camelToSnake } from "./func/camel_to_snake.js"
Console(camelToSnake, "thisIsAFunction")

// Latihan 10
import { findShortestWord } from "./func/find_shortest_word.js"
Console(findShortestWord, "I love TypeScript and programming")