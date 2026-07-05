export function cleanText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'“’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd');
}

export function levenshteinDistance(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  const matrix = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[len1][len2];
}

export function evaluateTranslation(userTranslation, referenceText, keywords = []) {
  const cleanedUser = cleanText(userTranslation);
  const cleanedRef = cleanText(referenceText);

  const accentlessUser = stripAccents(cleanedUser);
  const accentlessRef = stripAccents(cleanedRef);

  // 1. Keyword Matching (Strict & Relaxed Accentless)
  const matchedKeywords = [];
  const missingKeywords = [];

  keywords.forEach((kw) => {
    const cleanKw = cleanText(kw);
    const accentlessKw = stripAccents(cleanKw);

    if (cleanedUser.includes(cleanKw) || accentlessUser.includes(accentlessKw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // 2. Token Overlap
  const userWords = cleanedUser.split(' ').filter(w => w.length > 0);
  const refWords = cleanedRef.split(' ').filter(w => w.length > 0);

  const userWordsAccentless = accentlessUser.split(' ').filter(w => w.length > 0);
  const refWordsAccentless = accentlessRef.split(' ').filter(w => w.length > 0);

  let matchedWordsCount = 0;
  const refWordMatchStatus = refWords.map((word) => {
    const cleanW = cleanText(word);
    const accentlessW = stripAccents(cleanW);
    const isMatched = userWords.includes(cleanW) || userWordsAccentless.includes(accentlessW);
    if (isMatched) matchedWordsCount++;
    return { word, matched: isMatched };
  });

  const userWordMatchStatus = userWords.map((word) => {
    const cleanW = cleanText(word);
    const accentlessW = stripAccents(cleanW);
    const isMatched = refWords.includes(cleanW) || refWordsAccentless.includes(accentlessW);
    return { word, matched: isMatched };
  });

  // 3. Levenshtein Similarity
  const maxLen = Math.max(cleanedUser.length, cleanedRef.length);
  const distance = levenshteinDistance(cleanedUser, cleanedRef);
  const levSimilarity = maxLen > 0 ? (1 - distance / maxLen) : 0;

  // Component Scores
  const keywordScore = keywords.length > 0 ? (matchedKeywords.length / keywords.length) * 100 : 100;
  const wordOverlapScore = refWords.length > 0 ? (matchedWordsCount / refWords.length) * 100 : 100;
  const structureScore = levSimilarity * 100;

  // Final Hybrid Score
  let finalScore = 0;
  if (keywords.length > 0) {
    finalScore = Math.round(0.4 * keywordScore + 0.4 * wordOverlapScore + 0.2 * structureScore);
  } else {
    finalScore = Math.round(0.7 * wordOverlapScore + 0.3 * structureScore);
  }

  // Clip
  finalScore = Math.max(0, Math.min(100, finalScore));

  return {
    score: finalScore,
    components: {
      keywordScore: Math.round(keywordScore),
      wordOverlapScore: Math.round(wordOverlapScore),
      structureScore: Math.round(structureScore)
    },
    refWordMatchStatus,
    userWordMatchStatus,
    matchedKeywords,
    missingKeywords,
    cleanedUser,
    cleanedRef
  };
}
