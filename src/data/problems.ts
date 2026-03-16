// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PROBLEM_META: Record<string, any> = {
  // ── BIG-O (conceptual — special type) ──────────────────────────
  "bigo-1": {
    type: "conceptual",
    question: "What is the Big-O time complexity of the function below?",
    snippet: `function mystery(n) {
  let count = 0;
  for (let i = n; i > 0; i = Math.floor(i/2))
    for (let j = 0; j < n; j++)
      count++;
  return count;
}`,
    choices: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    answer: "O(n log n)",
    explanation:
      "The outer loop halves i each time → O(log n) iterations. The inner loop runs n times per outer iteration. Total: O(n × log n) = O(n log n).",
  },
  "bigo-2": {
    type: "conceptual",
    question: "What is the space complexity of this recursive function?",
    snippet: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    choices: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: "O(n)",
    explanation:
      "Each call adds a frame to the call stack. factorial(n) → factorial(n-1) → … → factorial(1): n frames exist simultaneously at maximum depth.",
  },
  "bigo-3": {
    type: "conceptual",
    question: "Simplify to Big-O: f(n) = 5n³ + 200n² + 1000n + 9999",
    choices: ["O(n)", "O(n²)", "O(n³)", "O(n⁴)"],
    answer: "O(n³)",
    explanation:
      "Drop constants (5n³ → n³) and lower-order terms (200n², 1000n, 9999 all grow slower than n³ at large n). Result: O(n³).",
  },

  // ── ARRAYS ──────────────────────────────────────────────────────
  "arr-1": {
    fn: "twoSum",
    starter: `function twoSum(nums, target) {
  // Return indices of the two numbers that add up to target
  // Example: twoSum([2,7,11,15], 9) → [0,1]

}`,
    tests: [
      {
        desc: "Basic case",
        args: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Mid-array pair",
        args: [[3, 2, 4], 6],
        expected: [1, 2],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Duplicate values",
        args: [[3, 3], 6],
        expected: [0, 1],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Negative numbers",
        args: [[-1, -2, -3, -4, -5], -8],
        expected: [2, 4],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Large array",
        args: [[1, 5, 3, 7, 2, 8, 4, 6], 11],
        expected: [1, 7],
        cmp: (a: number[], b: number[]) => a[0] + a[1] === b[0] + b[1] || JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },

  "arr-2": {
    fn: "maxSubArray",
    starter: `function maxSubArray(nums) {
  // Find the contiguous subarray with the largest sum
  // Example: maxSubArray([-2,1,-3,4,-1,2,1,-5,4]) → 6

}`,
    tests: [
      {
        desc: "Mixed positive/negative",
        args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
      },
      { desc: "All positive", args: [[1, 2, 3, 4, 5]], expected: 15 },
      { desc: "All negative", args: [[-3, -1, -2]], expected: -1 },
      { desc: "Single element", args: [[7]], expected: 7 },
      { desc: "Two elements", args: [[-1, 2]], expected: 2 },
    ],
  },

  "arr-3": {
    fn: "productExceptSelf",
    starter: `function productExceptSelf(nums) {
  // Return array where out[i] = product of all elements except nums[i]
  // Must be O(n) time, O(1) extra space, no division
  // Example: productExceptSelf([1,2,3,4]) → [24,12,8,6]

}`,
    tests: [
      {
        desc: "Basic",
        args: [[1, 2, 3, 4]],
        expected: [24, 12, 8, 6],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "With zero",
        args: [[1, 0, 3, 4]],
        expected: [0, 12, 0, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Two elements", args: [[3, 4]], expected: [4, 3], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      {
        desc: "Two zeros",
        args: [[0, 0, 3]],
        expected: [0, 0, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Negatives",
        args: [[-1, 1, 0, -3, 3]],
        expected: [0, 0, 9, 0, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },

  "arr-4": {
    fn: "trap",
    starter: `function trap(height) {
  // Calculate total water trapped between bars
  // Example: trap([0,1,0,2,1,0,1,3,2,1,2,1]) → 6

}`,
    tests: [
      {
        desc: "Classic example",
        args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
        expected: 6,
      },
      { desc: "No water", args: [[3, 2, 1]], expected: 0 },
      { desc: "Simple valley", args: [[3, 0, 3]], expected: 3 },
      { desc: "Single bar", args: [[5]], expected: 0 },
      { desc: "Two bars", args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
    ],
  },

  // ── TWO POINTERS ────────────────────────────────────────────────
  "tp-1": {
    fn: "isPalindrome",
    starter: `function isPalindrome(s) {
  // Return true if s is a palindrome (alphanumeric only, case-insensitive)
  // Example: isPalindrome("A man, a plan, a canal: Panama") → true

}`,
    tests: [
      {
        desc: "Classic palindrome",
        args: ["A man, a plan, a canal: Panama"],
        expected: true,
      },
      { desc: "Not palindrome", args: ["race a car"], expected: false },
      { desc: "Empty string", args: [""], expected: true },
      { desc: "Single char", args: ["a"], expected: true },
      { desc: "Numbers", args: ["0P"], expected: false },
    ],
  },

  "tp-2": {
    fn: "maxArea",
    starter: `function maxArea(height) {
  // Find two lines that together with x-axis forms a container holding most water
  // Example: maxArea([1,8,6,2,5,4,8,3,7]) → 49

}`,
    tests: [
      { desc: "Classic", args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { desc: "Two elements", args: [[1, 1]], expected: 1 },
      { desc: "Ascending", args: [[1, 2, 3, 4, 5]], expected: 6 },
      { desc: "Equal heights", args: [[4, 4, 4, 4]], expected: 12 },
      { desc: "Large valley", args: [[1, 3, 2, 5, 25, 24, 5]], expected: 24 },
    ],
  },

  "tp-3": {
    fn: "threeSum",
    starter: `function threeSum(nums) {
  // Find all unique triplets that sum to zero
  // Example: threeSum([-1,0,1,2,-1,-4]) → [[-1,-1,2],[-1,0,1]]

}`,
    tests: [
      {
        desc: "Two triplets",
        args: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
        cmp: (a: number[][], b: number[][]) => {
          const sa = JSON.stringify(
            [...a]
              .map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x))
              .sort(),
          );
          const sb = JSON.stringify(
            [...b]
              .map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x))
              .sort(),
          );
          return sa === sb;
        },
      },
      { desc: "No triplets", args: [[0, 1, 1]], expected: [], cmp: (a: number[][], b: number[][]) => {
        const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
        const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
        return sa === sb;
      } },
      {
        desc: "All zeros",
        args: [[0, 0, 0]],
        expected: [[0, 0, 0]],
        cmp: (a: number[][], b: number[][]) => {
          const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
          const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
          return sa === sb;
        },
      },
      {
        desc: "With positives",
        args: [[-2, 0, 0, 2, 2]],
        expected: [[-2, 0, 2]],
        cmp: (a: number[][], b: number[][]) => {
          const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
          const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x)).sort());
          return sa === sb;
        },
      },
    ],
  },

  // ── SLIDING WINDOW ──────────────────────────────────────────────
  "sw-1": {
    fn: "maxProfit",
    starter: `function maxProfit(prices) {
  // Find maximum profit from one buy and one sell
  // Must buy before sell. Return 0 if no profit.
  // Example: maxProfit([7,1,5,3,6,4]) → 5

}`,
    tests: [
      { desc: "Classic", args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { desc: "Descending", args: [[7, 6, 4, 3, 1]], expected: 0 },
      { desc: "Single day", args: [[1]], expected: 0 },
      { desc: "All same", args: [[3, 3, 3, 3]], expected: 0 },
      { desc: "Big jump", args: [[1, 2, 3, 4, 5]], expected: 4 },
    ],
  },

  "sw-2": {
    fn: "lengthOfLongestSubstring",
    starter: `function lengthOfLongestSubstring(s) {
  // Find length of longest substring without repeating characters
  // Example: lengthOfLongestSubstring("abcabcbb") → 3

}`,
    tests: [
      { desc: "Repeating", args: ["abcabcbb"], expected: 3 },
      { desc: "All same", args: ["bbbbb"], expected: 1 },
      { desc: "Almost", args: ["pwwkew"], expected: 3 },
      { desc: "Empty", args: [""], expected: 0 },
      { desc: "No repeats", args: ["abcde"], expected: 5 },
    ],
  },

  "sw-3": {
    fn: "checkInclusion",
    starter: `function checkInclusion(s1, s2) {
  // Return true if s2 contains a permutation of s1
  // Example: checkInclusion("ab", "eidbaooo") → true

}`,
    tests: [
      { desc: "Contains perm", args: ["ab", "eidbaooo"], expected: true },
      { desc: "No perm", args: ["ab", "eidboaoo"], expected: false },
      { desc: "Exact match", args: ["abc", "abc"], expected: true },
      { desc: "s1 longer", args: ["hello", "oo"], expected: false },
      { desc: "At end", args: ["ab", "ooab"], expected: true },
    ],
  },

  // ── HASH MAPS ───────────────────────────────────────────────────
  "hm-1": {
    fn: "isAnagram",
    starter: `function isAnagram(s, t) {
  // Return true if t is an anagram of s
  // Example: isAnagram("anagram", "nagaram") → true

}`,
    tests: [
      { desc: "Is anagram", args: ["anagram", "nagaram"], expected: true },
      { desc: "Not anagram", args: ["rat", "car"], expected: false },
      { desc: "Different length", args: ["abc", "ab"], expected: false },
      { desc: "Single char", args: ["a", "a"], expected: true },
      { desc: "Repeat chars", args: ["aa", "aa"], expected: true },
    ],
  },

  "hm-2": {
    fn: "longestConsecutive",
    starter: `function longestConsecutive(nums) {
  // Find length of longest consecutive elements sequence in O(n)
  // Example: longestConsecutive([100,4,200,1,3,2]) → 4

}`,
    tests: [
      { desc: "Classic", args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      {
        desc: "Single run",
        args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
        expected: 9,
      },
      { desc: "Empty", args: [[]], expected: 0 },
      { desc: "Single", args: [[5]], expected: 1 },
      { desc: "Duplicates", args: [[1, 2, 2, 3]], expected: 3 },
    ],
  },

  "hm-3": {
    fn: "topKFrequent",
    starter: `function topKFrequent(nums, k) {
  // Return k most frequent elements (any order)
  // Example: topKFrequent([1,1,1,2,2,3], 2) → [1,2]

}`,
    tests: [
      {
        desc: "Classic k=2",
        args: [[1, 1, 1, 2, 2, 3], 2],
        expected: [1, 2],
        cmp: (a: unknown[], b: unknown[]) => {
          const sa = JSON.stringify(
            [...a]
              .map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x))
              .sort(),
          );
          const sb = JSON.stringify(
            [...b]
              .map((x) => (Array.isArray(x) ? [...x].sort((i, j) => i - j) : x))
              .sort(),
          );
          return sa === sb;
        },
      },
      { desc: "k=1", args: [[1], 1], expected: [1], cmp: (a: unknown[], b: unknown[]) => {
        const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
        const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
        return sa === sb;
      } },
      { desc: "k=all", args: [[1, 2, 3], 3], expected: [1, 2, 3], cmp: (a: unknown[], b: unknown[]) => {
        const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
        const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
        return sa === sb;
      } },
      {
        desc: "Ties",
        args: [[4, 1, 2, 1, 2, 3], 2],
        expected: [1, 2],
        cmp: (a: unknown[], b: unknown[]) => {
          const sa = JSON.stringify([...a].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
          const sb = JSON.stringify([...b].map((x) => (Array.isArray(x) ? [...x].sort((i: number, j: number) => i - j) : x)).sort());
          return sa === sb;
        },
      },
    ],
  },

  // ── RECURSION ───────────────────────────────────────────────────
  "rec-1": {
    fn: "mergeSort",
    starter: `function mergeSort(arr) {
  // Sort array using merge sort recursively
  // Example: mergeSort([5,2,4,6,1,3]) → [1,2,3,4,5,6]

}`,
    tests: [
      {
        desc: "Unsorted",
        args: [[5, 2, 4, 6, 1, 3]],
        expected: [1, 2, 3, 4, 5, 6],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Reverse",
        args: [[5, 4, 3, 2, 1]],
        expected: [1, 2, 3, 4, 5],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Sorted", args: [[1, 2, 3]], expected: [1, 2, 3], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      { desc: "Single", args: [[42]], expected: [42], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      {
        desc: "Duplicates",
        args: [[3, 1, 2, 1, 3]],
        expected: [1, 1, 2, 3, 3],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },

  "rec-2": {
    fn: "flatten",
    starter: `function flatten(arr) {
  // Recursively flatten nested array to any depth
  // Example: flatten([1,[2,[3,[4]],5]]) → [1,2,3,4,5]

}`,
    tests: [
      {
        desc: "Nested",
        args: [[1, [2, [3, [4]], 5]]],
        expected: [1, 2, 3, 4, 5],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Flat", args: [[1, 2, 3]], expected: [1, 2, 3], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      { desc: "Empty", args: [[]], expected: [], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      { desc: "Deep", args: [[[[[1]]]]], expected: [1], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      {
        desc: "Mixed depth",
        args: [[1, [2, 3], [4, [5, 6]]]],
        expected: [1, 2, 3, 4, 5, 6],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },

  // ── STACKS ──────────────────────────────────────────────────────
  "stk-1": {
    fn: "isValid",
    starter: `function isValid(s) {
  // Return true if brackets are properly matched and nested
  // Example: isValid("()[]{}") → true, isValid("(]") → false

}`,
    tests: [
      { desc: "All pairs", args: ["()[]{}"], expected: true },
      { desc: "Nested", args: ["({[]})"], expected: true },
      { desc: "Mismatch", args: ["(]"], expected: false },
      { desc: "Unclosed", args: ["("], expected: false },
      { desc: "Wrong order", args: ["([)]"], expected: false },
    ],
  },

  "stk-2": {
    fn: "MinStack",
    type: "class",
    starter: `class MinStack {
  constructor() {
    // Initialize your data structure
  }
  push(val) {
    // Push val onto stack
  }
  pop() {
    // Remove top element
  }
  top() {
    // Return top element
  }
  getMin() {
    // Return minimum element in O(1)
  }
}`,
    tests: [
      {
        desc: "Push/pop/getMin",
        setup: `const ms = new MinStack();
ms.push(-2); ms.push(0); ms.push(-3);`,
        ops: [
          { call: "ms.getMin()", expected: -3 },
          { call: "ms.pop(); ms.top()", expected: 0 },
          { call: "ms.getMin()", expected: -2 },
        ],
      },
    ],
  },

  "stk-3": {
    fn: "dailyTemperatures",
    starter: `function dailyTemperatures(temperatures) {
  // Return array where answer[i] = days until warmer temperature
  // Example: dailyTemperatures([73,74,75,71,69,72,76,73]) → [1,1,4,2,1,1,0,0]

}`,
    tests: [
      {
        desc: "Classic",
        args: [[73, 74, 75, 71, 69, 72, 76, 73]],
        expected: [1, 1, 4, 2, 1, 1, 0, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Descend",
        args: [[30, 40, 50, 60]],
        expected: [1, 1, 1, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Ascend",
        args: [[30, 20, 10]],
        expected: [0, 0, 0],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Single", args: [[50]], expected: [0], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
    ],
  },

  // ── BINARY SEARCH ────────────────────────────────────────────────
  "bs-1": {
    fn: "findMin",
    starter: `function findMin(nums) {
  // Find minimum element in a rotated sorted array
  // Example: findMin([3,4,5,1,2]) → 1

}`,
    tests: [
      { desc: "Rotated", args: [[3, 4, 5, 1, 2]], expected: 1 },
      { desc: "One rotation", args: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
      { desc: "Not rotated", args: [[1, 2, 3, 4, 5]], expected: 1 },
      { desc: "Two elements", args: [[2, 1]], expected: 1 },
      { desc: "Single", args: [[1]], expected: 1 },
    ],
  },

  "bs-2": {
    fn: "minEatingSpeed",
    starter: `function minEatingSpeed(piles, h) {
  // Find minimum eating speed k such that all piles can be eaten in h hours
  // Example: minEatingSpeed([3,6,7,11], 8) → 4

}`,
    tests: [
      { desc: "Classic", args: [[3, 6, 7, 11], 8], expected: 4 },
      { desc: "Single pile", args: [[30, 11, 23, 4, 20], 5], expected: 30 },
      { desc: "Plenty time", args: [[30, 11, 23, 4, 20], 6], expected: 23 },
      { desc: "Tight", args: [[1, 1, 1, 999999999], 10], expected: 142857143 },
    ],
  },

  // ── SORTING ──────────────────────────────────────────────────────
  "sort-1": {
    fn: "merge",
    starter: `function merge(intervals) {
  // Merge all overlapping intervals
  // Example: merge([[1,3],[2,6],[8,10],[15,18]]) → [[1,6],[8,10],[15,18]]

}`,
    tests: [
      {
        desc: "Classic",
        args: [
          [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "No overlap",
        args: [
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
        ],
        expected: [
          [1, 2],
          [3, 4],
          [5, 6],
        ],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "All overlap",
        args: [
          [
            [1, 4],
            [0, 4],
          ],
        ],
        expected: [[0, 4]],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Touch only",
        args: [
          [
            [1, 2],
            [2, 3],
          ],
        ],
        expected: [[1, 3]],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Single", args: [[[1, 1]]], expected: [[1, 1]], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
    ],
  },

  "sort-2": {
    fn: "sortColors",
    starter: `function sortColors(nums) {
  // Sort array of 0s, 1s, 2s in-place (Dutch National Flag)
  // Modify nums in place; return nothing
  // Example: sortColors([2,0,2,1,1,0]) → [0,0,1,1,2,2]

}`,
    tests: [
      {
        desc: "Mixed",
        args: [[2, 0, 2, 1, 1, 0]],
        expected: [0, 0, 1, 1, 2, 2],
        cmp: (_: unknown, __: unknown, arr: unknown) => JSON.stringify(arr) === JSON.stringify([0, 0, 1, 1, 2, 2]),
      },
      {
        desc: "All same",
        args: [[0, 0, 0]],
        expected: [0, 0, 0],
        cmp: (_: unknown, __: unknown, arr: unknown) => JSON.stringify(arr) === JSON.stringify([0, 0, 0]),
      },
      {
        desc: "Two types",
        args: [[0, 2, 0, 2]],
        expected: [0, 0, 2, 2],
        cmp: (_: unknown, __: unknown, arr: unknown) => JSON.stringify(arr) === JSON.stringify([0, 0, 2, 2]),
      },
    ],
  },

  // ── LINKED LISTS ─────────────────────────────────────────────────
  "ll-1": {
    fn: "reverseList",
    type: "linked-list",
    starter: `function reverseList(head) {
  // Reverse a singly linked list
  // Input/output as arrays: [1,2,3,4,5] → [5,4,3,2,1]

}`,
    tests: [
      {
        desc: "5 nodes",
        args: [[1, 2, 3, 4, 5]],
        expected: [5, 4, 3, 2, 1],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "2 nodes", args: [[1, 2]], expected: [2, 1], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      { desc: "Single", args: [[1]], expected: [1], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
      { desc: "Empty", args: [null], expected: null, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },

  // ── TREES ─────────────────────────────────────────────────────────
  "tree-1": {
    fn: "maxDepth",
    type: "tree",
    starter: `function maxDepth(root) {
  // Return maximum depth of a binary tree
  // Tree given as array [root, left, right, ...] (null = missing node)
  // Example: maxDepth([3,9,20,null,null,15,7]) → 3

}`,
    tests: [
      { desc: "3 levels", args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { desc: "1 node", args: [[1, null, 2]], expected: 2 },
      { desc: "Empty", args: [null], expected: 0 },
      { desc: "Left skewed", args: [[1, 2, null, 3, null, 4]], expected: 4 },
    ],
  },

  "tree-2": {
    fn: "diameterOfBinaryTree",
    type: "tree",
    starter: `function diameterOfBinaryTree(root) {
  // Return the length of the longest path between any two nodes
  // Example: diameterOfBinaryTree([1,2,3,4,5]) → 3

}`,
    tests: [
      { desc: "Classic", args: [[1, 2, 3, 4, 5]], expected: 3 },
      { desc: "Single", args: [[1]], expected: 0 },
      { desc: "Two nodes", args: [[1, 2]], expected: 1 },
    ],
  },

  // ── HEAPS ──────────────────────────────────────────────────────────
  "heap-1": {
    fn: "findKthLargest",
    starter: `function findKthLargest(nums, k) {
  // Find the kth largest element in the array (not kth distinct)
  // Example: findKthLargest([3,2,1,5,6,4], 2) → 5

}`,
    tests: [
      { desc: "k=2", args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { desc: "k=4", args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { desc: "k=1", args: [[1], 1], expected: 1 },
      { desc: "k=last", args: [[5, 4, 3, 2, 1], 5], expected: 1 },
    ],
  },

  // ── DP ──────────────────────────────────────────────────────────────
  "dp-1": {
    fn: "climbStairs",
    starter: `function climbStairs(n) {
  // How many distinct ways to climb n stairs (1 or 2 steps at a time)?
  // Example: climbStairs(3) → 3

}`,
    tests: [
      { desc: "n=1", args: [1], expected: 1 },
      { desc: "n=2", args: [2], expected: 2 },
      { desc: "n=3", args: [3], expected: 3 },
      { desc: "n=5", args: [5], expected: 8 },
      { desc: "n=10", args: [10], expected: 89 },
    ],
  },

  "dp-2": {
    fn: "lengthOfLIS",
    starter: `function lengthOfLIS(nums) {
  // Find length of longest strictly increasing subsequence
  // Example: lengthOfLIS([10,9,2,5,3,7,101,18]) → 4

}`,
    tests: [
      { desc: "Classic", args: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
      { desc: "All same", args: [[0, 1, 0, 3, 2, 3]], expected: 4 },
      { desc: "Descending", args: [[7, 7, 7, 7, 7, 7, 7]], expected: 1 },
      { desc: "Single", args: [[1]], expected: 1 },
    ],
  },

  "dp-3": {
    fn: "wordBreak",
    starter: `function wordBreak(s, wordDict) {
  // Return true if s can be segmented into words from wordDict
  // Example: wordBreak("leetcode", ["leet","code"]) → true

}`,
    tests: [
      {
        desc: "Can break",
        args: ["leetcode", ["leet", "code"]],
        expected: true,
      },
      {
        desc: "Cannot break",
        args: ["applepenapple", ["apple", "pen"]],
        expected: true,
      },
      {
        desc: "Impossible",
        args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
        expected: false,
      },
      { desc: "Single word", args: ["a", ["a"]], expected: true },
    ],
  },

  "dp-4": {
    fn: "canPartition",
    starter: `function canPartition(nums) {
  // Can you partition array into two subsets with equal sum?
  // Example: canPartition([1,5,11,5]) → true

}`,
    tests: [
      { desc: "Can partition", args: [[1, 5, 11, 5]], expected: true },
      { desc: "Cannot partition", args: [[1, 2, 3, 5]], expected: false },
      { desc: "Two equal", args: [[1, 1]], expected: true },
      { desc: "Single", args: [[1]], expected: false },
      { desc: "All same", args: [[2, 2, 2, 2]], expected: true },
    ],
  },
  // ── QUEUE / GRID PROBLEMS ──
  "q-1": {
    fn: "numIslands",
    starter: `function numIslands(grid) {
  // Count the number of islands (connected '1's) in a 2D grid
  // Example: numIslands([["1","1","0"],["1","1","0"],["0","0","1"]]) → 2

}`,
    tests: [
      {
        desc: "Two islands",
        args: [
          [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
          ],
        ],
        expected: 3,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "One island",
        args: [
          [
            ["1", "1", "1"],
            ["0", "1", "0"],
            ["1", "1", "1"],
          ],
        ],
        expected: 1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "All water",
        args: [
          [
            ["0", "0"],
            ["0", "0"],
          ],
        ],
        expected: 0,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "All land",
        args: [
          [
            ["1", "1"],
            ["1", "1"],
          ],
        ],
        expected: 1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Single cell land", args: [[["1"]]], expected: 1, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "q-2": {
    fn: "maxSlidingWindow",
    starter: `function maxSlidingWindow(nums, k) {
  // Return the max value in each sliding window of size k
  // Example: maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3) → [3,3,5,5,6,7]

}`,
    tests: [
      {
        desc: "Basic",
        args: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
        expected: [3, 3, 5, 5, 6, 7],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Window=1",
        args: [[1, 2, 3], 1],
        expected: [1, 2, 3],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Window=array",
        args: [[5, 3, 4], 3],
        expected: [5],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Decreasing",
        args: [[9, 8, 7, 6, 5], 2],
        expected: [9, 8, 7, 6],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },
  // ── LINKED LIST ──
  "ll-2": {
    fn: "detectCycleStart",
    type: "conceptual",
  },
  "ll-3": {
    fn: "reorderList",
    type: "conceptual",
  },
  // ── TREES ──
  "tree-3": {
    fn: "rightSideView",
    type: "conceptual",
  },
  "tree-4": {
    fn: "lowestCommonAncestor",
    starter: `function lowestCommonAncestor(root, p, q) {
  // Find lowest common ancestor in a BST
  // root is a TreeNode, p and q are values
  // Return the LCA node's value

}`,
    tests: [
      { desc: "Split at root", args: null, expected: null, cmp: () => true },
    ],
    type: "conceptual",
  },
  // ── HEAP ──
  "heap-2": {
    fn: "MedianFinder",
    type: "conceptual",
  },
  // ── GRAPH ──
  "g-1": {
    fn: "cloneGraph",
    type: "conceptual",
  },
  "g-2": {
    fn: "findOrder",
    starter: `function findOrder(numCourses, prerequisites) {
  // Return course order (topological sort), or [] if impossible
  // prerequisites[i] = [a, b] means b must be taken before a
  // Example: findOrder(4, [[1,0],[2,0],[3,1],[3,2]]) → [0,1,2,3] or [0,2,1,3]

}`,
    tests: [
      {
        desc: "Basic chain",
        args: [2, [[1, 0]]],
        expected: [0, 1],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "No prereqs",
        args: [3, []],
        expected: null,
        cmp: (a: number[] | null) => a != null && a.length === 3,
      },
      {
        desc: "Impossible (cycle)",
        args: [
          2,
          [
            [1, 0],
            [0, 1],
          ],
        ],
        expected: [],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },
  "g-3": {
    fn: "pacificAtlantic",
    type: "conceptual",
  },
  // ── BACKTRACKING ──
  "bt-1": {
    fn: "combinationSum",
    starter: `function combinationSum(candidates, target) {
  // Find all unique combinations that sum to target (can reuse elements)
  // Example: combinationSum([2,3,6,7], 7) → [[2,2,3],[7]]

}`,
    tests: [
      {
        desc: "Basic",
        args: [[2, 3, 6, 7], 7],
        expected: [[2, 2, 3], [7]],
        cmp: (a: number[][], e: number[][]) =>
          JSON.stringify(a.map((x) => x.sort()).sort()) ===
          JSON.stringify(e.map((x) => x.sort()).sort()),
      },
      {
        desc: "Single",
        args: [[2], 4],
        expected: [[2, 2]],
        cmp: (a: number[][], e: number[][]) =>
          JSON.stringify(a.map((x) => x.sort()).sort()) ===
          JSON.stringify(e.map((x) => x.sort()).sort()),
      },
      { desc: "No solution", args: [[3], 2], expected: [], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
    ],
  },
  "bt-2": {
    fn: "exist",
    starter: `function exist(board, word) {
  // Return true if word exists in grid (horizontal/vertical adjacent cells)
  // Example: exist([["A","B"],["C","D"]], "ABDC") → true

}`,
    tests: [
      {
        desc: "Found",
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCCED",
        ],
        expected: true,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "Not found",
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCB",
        ],
        expected: false,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Single char", args: [[["A"]], "A"], expected: true, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  // ── GREEDY ──
  "gr-1": {
    fn: "canJump",
    starter: `function canJump(nums) {
  // Can you reach the last index? nums[i] = max jump from position i
  // Example: canJump([2,3,1,1,4]) → true

}`,
    tests: [
      {
        desc: "Can reach",
        args: [[2, 3, 1, 1, 4]],
        expected: true,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "Cannot reach",
        args: [[3, 2, 1, 0, 4]],
        expected: false,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Already there", args: [[0]], expected: true, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "One jump", args: [[1, 0]], expected: true, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "gr-2": {
    fn: "eraseOverlapIntervals",
    starter: `function eraseOverlapIntervals(intervals) {
  // Minimum removals to make all intervals non-overlapping
  // Example: eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]) → 1

}`,
    tests: [
      {
        desc: "Remove one",
        args: [
          [
            [1, 2],
            [2, 3],
            [3, 4],
            [1, 3],
          ],
        ],
        expected: 1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "Remove two",
        args: [
          [
            [1, 2],
            [1, 2],
            [1, 2],
          ],
        ],
        expected: 2,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "None needed",
        args: [
          [
            [1, 2],
            [2, 3],
          ],
        ],
        expected: 0,
        cmp: (a: unknown, b: unknown) => a === b,
      },
    ],
  },
  // ── TRIE ──
  "trie-1": {
    fn: "Trie",
    type: "conceptual",
  },
  "trie-2": {
    fn: "findWords",
    type: "conceptual",
  },
  // ── MOCK PROBLEMS ──
  m1: {
    fn: "twoSum",
    starter: `function twoSum(nums, target) {
  // Return indices of two numbers that add up to target
  // Example: twoSum([2,7,11,15], 9) → [0,1]

}`,
    tests: [
      {
        desc: "Basic",
        args: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Mid-array",
        args: [[3, 2, 4], 6],
        expected: [1, 2],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "Duplicates", args: [[3, 3], 6], expected: [0, 1], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
    ],
  },
  m2: {
    fn: "numIslands",
    starter: `function numIslands(grid) {
  // Count the number of islands (connected '1's)
  // Example: numIslands([["1","1","0"],["0","0","1"]]) → 2

}`,
    tests: [
      {
        desc: "Two islands",
        args: [
          [
            ["1", "1", "0", "0"],
            ["1", "1", "0", "0"],
            ["0", "0", "1", "0"],
            ["0", "0", "0", "1"],
          ],
        ],
        expected: 3,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "One island",
        args: [
          [
            ["1", "1"],
            ["1", "1"],
          ],
        ],
        expected: 1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "All water",
        args: [
          [
            ["0", "0"],
            ["0", "0"],
          ],
        ],
        expected: 0,
        cmp: (a: unknown, b: unknown) => a === b,
      },
    ],
  },
  m3: {
    fn: "coinChange",
    starter: `function coinChange(coins, amount) {
  // Fewest coins to make amount, or -1 if impossible
  // Example: coinChange([1,5,11], 15) → 3

}`,
    tests: [
      { desc: "Basic", args: [[1, 2, 5], 11], expected: 3, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "Impossible", args: [[2], 3], expected: -1, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "Zero", args: [[1], 0], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "One coin", args: [[1], 1], expected: 1, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  m4: { fn: "maxPathSum", type: "conceptual" },
  // ── ADVANCED GRAPHS ──
  "ag-1": {
    fn: "countComponents",
    starter: `function countComponents(n, edges) {
  // Count connected components in undirected graph
  // Example: countComponents(5, [[0,1],[1,2],[3,4]]) → 2

}`,
    tests: [
      {
        desc: "Two components",
        args: [
          5,
          [
            [0, 1],
            [1, 2],
            [3, 4],
          ],
        ],
        expected: 2,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "All connected",
        args: [
          3,
          [
            [0, 1],
            [1, 2],
          ],
        ],
        expected: 1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "No edges", args: [4, []], expected: 4, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "ag-2": {
    fn: "networkDelayTime",
    starter: `function networkDelayTime(times, n, k) {
  // Min time for signal from node k to reach all nodes, or -1
  // times[i] = [source, target, weight]
  // Example: networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2) → 2

}`,
    tests: [
      {
        desc: "Basic",
        args: [
          [
            [2, 1, 1],
            [2, 3, 1],
            [3, 4, 1],
          ],
          4,
          2,
        ],
        expected: 2,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "Unreachable",
        args: [[[1, 2, 1]], 3, 1],
        expected: -1,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Single node", args: [[], 1, 1], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "ag-3": {
    fn: "findRedundantConnection",
    starter: `function findRedundantConnection(edges) {
  // Find the edge that, if removed, makes the graph a tree
  // Example: findRedundantConnection([[1,2],[1,3],[2,3]]) → [2,3]

}`,
    tests: [
      {
        desc: "Triangle",
        args: [
          [
            [1, 2],
            [1, 3],
            [2, 3],
          ],
        ],
        expected: [2, 3],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Square",
        args: [
          [
            [1, 2],
            [2, 3],
            [3, 4],
            [1, 4],
            [1, 5],
          ],
        ],
        expected: [1, 4],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
    ],
  },
  // ── DESIGN ──
  "ds-1": { fn: "LRUCache", type: "conceptual" },
  "ds-2": { fn: "Twitter", type: "conceptual" },
  "ds-3": {
    fn: "RandomizedSet",
    type: "conceptual",
  },
  // ── ADVANCED DP ──
  "adp-1": {
    fn: "maxProfitWithCooldown",
    starter: `function maxProfitWithCooldown(prices) {
  // Max profit with cooldown (must wait 1 day after selling)
  // Example: maxProfitWithCooldown([1,2,3,0,2]) → 3

}`,
    tests: [
      {
        desc: "With cooldown",
        args: [[1, 2, 3, 0, 2]],
        expected: 3,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Decreasing", args: [[5, 4, 3, 2, 1]], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "Single", args: [[1]], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "adp-2": {
    fn: "minDistance",
    starter: `function minDistance(word1, word2) {
  // Minimum edit operations (insert, delete, replace) to convert word1 to word2
  // Example: minDistance("horse", "ros") → 3

}`,
    tests: [
      { desc: "horse→ros", args: ["horse", "ros"], expected: 3, cmp: (a: unknown, b: unknown) => a === b },
      {
        desc: "intention→execution",
        args: ["intention", "execution"],
        expected: 5,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "Empty to word", args: ["", "abc"], expected: 3, cmp: (a: unknown, b: unknown) => a === b },
      { desc: "Same", args: ["abc", "abc"], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "adp-3": {
    fn: "numDistinct",
    starter: `function numDistinct(s, t) {
  // Count distinct subsequences of s that equal t
  // Example: numDistinct("rabbbit", "rabbit") → 3

}`,
    tests: [
      {
        desc: "rabbbit→rabbit",
        args: ["rabbbit", "rabbit"],
        expected: 3,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      {
        desc: "babgbag→bag",
        args: ["babgbag", "bag"],
        expected: 5,
        cmp: (a: unknown, b: unknown) => a === b,
      },
      { desc: "No match", args: ["abc", "d"], expected: 0, cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  // ── STRING ──
  "str-1": {
    fn: "longestPalindrome",
    starter: `function longestPalindrome(s) {
  // Return the longest palindromic substring
  // Example: longestPalindrome("babad") → "bab" or "aba"

}`,
    tests: [
      {
        desc: "babad",
        args: ["babad"],
        expected: null,
        cmp: (a: string) => a === "bab" || a === "aba",
      },
      { desc: "cbbd", args: ["cbbd"], expected: "bb", cmp: (a: unknown, b: unknown) => a === b },
      { desc: "Single", args: ["a"], expected: "a", cmp: (a: unknown, b: unknown) => a === b },
    ],
  },
  "str-2": {
    fn: "encode",
    type: "conceptual",
  },
  "str-3": {
    fn: "findAnagrams",
    starter: `function findAnagrams(s, p) {
  // Find all start indices of p's anagrams in s
  // Example: findAnagrams("cbaebabacd", "abc") → [0, 6]

}`,
    tests: [
      {
        desc: "Basic",
        args: ["cbaebabacd", "abc"],
        expected: [0, 6],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      {
        desc: "Overlapping",
        args: ["abab", "ab"],
        expected: [0, 1, 2],
        cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b),
      },
      { desc: "No match", args: ["xyz", "abc"], expected: [], cmp: (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b) },
    ],
  },
};
