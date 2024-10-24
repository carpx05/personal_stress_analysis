export const API_URL = "https://personal-stress-analysis-1.onrender.com";

export const questions = [
  "I found myself getting upset by quite trivial things", // 1 (Stress)
  "I was aware of dryness of my mouth", // 2 (Anxiety)
  "I couldn’t seem to experience any positive feeling at all", // 3 (Depression)
    "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)", // 4 (Anxiety)
    "I just couldn’t seem to get going", // 5 (Depression)
    "I tended to over-react to situations", // 6 (Stress)
    "I had a feeling of shakiness (e.g., legs going to give way)", // 7 (Anxiety)
    "I found it difficult to relax", // 8 (Stress)
    "I found myself in situations that made me so anxious I was most relieved when they ended", // 9 (Anxiety)
    "I felt that I had nothing to look forward to", // 10 (Depression)
    "I found myself getting upset rather easily", // 11 (Stress)
    "I felt that I was using a lot of nervous energy", // 12 (Stress)
    "I felt sad and depressed", // 13 (Depression)
    "I found myself getting impatient when I was delayed in any way", // 14 (Stress)
    "I had a feeling of faintness", // 15 (Anxiety)
    "I felt that I had lost interest in just about everything", // 16 (Depression)
    "I felt I wasn’t worth much as a person", // 17 (Depression)
    "I felt that I was rather touchy", // 18 (Stress)
    "I perspired noticeably (e.g., hands sweaty) in the absence of high temperatures or physical exertion", // 19 (Anxiety)
    "I felt scared without any good reason", // 20 (Anxiety)
    "I felt that life wasn’t worthwhile", // 21 (Depression)
    "I found it hard to wind down", // 22 (Stress)
    "I had difficulty in swallowing", // 23 (Anxiety)
    "I couldn’t seem to get any enjoyment out of the things I did", // 24 (Depression),
    "I was aware of the action of my heart in the absence of physical exertion", // 25 (Anxiety)
    "I felt down-hearted and blue", // 26 (Depression)
    "I found that I was very irritable", // 27 (Stress)
    "I felt I was close to panic", // 28 (Anxiety)
    "I found it hard to calm down after something upset me", // 29 (Stress)
    "I feared that I would be thrown by some trivial but unfamiliar task", // 30 (Anxiety)
    "I was unable to become enthusiastic about anything", // 31 (Depression)
    "I found it difficult to tolerate interruptions to what I was doing", // 32 (Stress)
    "I was in a state of nervous tension", // 33 (Stress)
    "I felt I was pretty worthless", // 34 (Depression)
    "I was intolerant of anything that kept me from getting on with what I was doing", // 35 (Stress)
    "I felt terrified", // 36 (Anxiety)
    "I could see nothing in the future to be hopeful about", // 37 (Depression)
    "I felt that life was meaningless", // 38 (Depression)
    "I found myself getting agitated", // 39 (Stress)
    "I was worried about situations in which I might panic and make a fool of myself", // 40 (Anxiety)
    "I experienced trembling (e.g., in the hands)", // 41 (Anxiety)
    "I found it difficult to work up the initiative to do things", // 42 (Depression)

];

export const stressQuestions = [
  1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39,
];
export const anxietyQuestions = [
  2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41,
];
export const depressionQuestions = [
  3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42,
];
