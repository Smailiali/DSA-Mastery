// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LANGUAGES: any[] = [
  {
    id: "javascript",
    label: "JavaScript",
    ext: "js",
    pistonLang: "javascript",
    pistonVer: "18.15.0",
    indent: 2,
  },
  {
    id: "typescript",
    label: "TypeScript",
    ext: "ts",
    pistonLang: "typescript",
    pistonVer: "5.0.3",
    indent: 2,
  },
  {
    id: "python",
    label: "Python",
    ext: "py",
    pistonLang: "python",
    pistonVer: "3.10.0",
    indent: 4,
  },
  {
    id: "java",
    label: "Java",
    ext: "java",
    pistonLang: "java",
    pistonVer: "15.0.2",
    indent: 4,
  },
  {
    id: "cpp",
    label: "C++",
    ext: "cpp",
    pistonLang: "c++",
    pistonVer: "10.2.0",
    indent: 4,
  },
  {
    id: "go",
    label: "Go",
    ext: "go",
    pistonLang: "go",
    pistonVer: "1.16.2",
    indent: 2,
  },
  {
    id: "rust",
    label: "Rust",
    ext: "rs",
    pistonLang: "rust",
    pistonVer: "1.50.0",
    indent: 4,
  },
  {
    id: "csharp",
    label: "C#",
    ext: "cs",
    pistonLang: "csharp",
    pistonVer: "6.12.0",
    indent: 4,
  },
  {
    id: "kotlin",
    label: "Kotlin",
    ext: "kt",
    pistonLang: "kotlin",
    pistonVer: "1.4.31-1",
    indent: 4,
  },
  {
    id: "ruby",
    label: "Ruby",
    ext: "rb",
    pistonLang: "ruby",
    pistonVer: "3.0.1",
    indent: 2,
  },
  {
    id: "swift",
    label: "Swift",
    ext: "swift",
    pistonLang: "swift",
    pistonVer: "5.3.3",
    indent: 2,
  },
  {
    id: "php",
    label: "PHP",
    ext: "php",
    pistonLang: "php",
    pistonVer: "8.2.3",
    indent: 4,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LANG_MAP: Record<string, any> = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l])
);

function camel_to_snake(s: string): string {
  return s
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

export const STARTERS: Record<string, (fn: string, desc: string, example: string) => string> = {
  javascript: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
function ${fn}() {
  // your solution here

}`,
  typescript: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
function ${fn}(): any {
  // your solution here

}`,
  python: (fn, desc, example) =>
    `# ${desc}
# Example: ${example}
def ${camel_to_snake(fn)}(*args):
    # your solution here
    pass`,
  java: (_fn, desc, example) =>
    `// ${desc}
// Example: ${example}
// Wrap your method inside the Solution class below

public static Object solution() {
    // your solution here
    return null;
}`,
  cpp: (_fn, desc, example) =>
    `// ${desc}
// Example: ${example}

// Write your solution here — use standard STL freely
auto solution() {
    // your solution here
}`,
  go: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
func ${fn[0].toUpperCase() + fn.slice(1)}() interface{} {
    // your solution here
    return nil
}`,
  rust: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
fn ${camel_to_snake(fn)}() {
    // your solution here
}`,
  csharp: (_fn, desc, example) =>
    `// ${desc}
// Example: ${example}
public static object Solution() {
    // your solution here
    return null;
}`,
  kotlin: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
fun ${fn}(): Any? {
    // your solution here
    return null
}`,
  ruby: (fn, desc, example) =>
    `# ${desc}
# Example: ${example}
def ${camel_to_snake(fn)}(*args)
  # your solution here
end`,
  swift: (fn, desc, example) =>
    `// ${desc}
// Example: ${example}
func ${fn}() -> Any? {
    // your solution here
    return nil
}`,
  php: (fn, desc, example) =>
    `<?php
// ${desc}
// Example: ${example}
function ${fn}() {
    // your solution here
}`,
};

export const PROBLEM_STARTERS: Record<string, Record<string, string>> = {
  "arr-1": {
    javascript: `function twoSum(nums, target) {\n  // Return [i,j] where nums[i]+nums[j]===target\n  \n}`,
    typescript: `function twoSum(nums: number[], target: number): number[] {\n  \n  return [];\n}`,
    python: `def two_sum(nums, target):\n    # Return [i,j] where nums[i]+nums[j]==target\n    pass`,
    java: `public static int[] twoSum(int[] nums, int target) {\n    // HashMap approach: O(n)\n    return new int[]{};\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> twoSum(vector<int>& nums, int target) {\n    \n    return {};\n}`,
    go: `func twoSum(nums []int, target int) []int {\n    \n    return nil\n}`,
    rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n    \n    vec![]\n}`,
    csharp: `public static int[] TwoSum(int[] nums, int target) {\n    \n    return new int[]{};\n}`,
    kotlin: `fun twoSum(nums: IntArray, target: Int): IntArray {\n    \n    return intArrayOf()\n}`,
    ruby: `def two_sum(nums, target)\n  # Return [i,j] where nums[i]+nums[j]==target\nend`,
    swift: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n    \n    return []\n}`,
    php: `<?php\nfunction twoSum($nums, $target) {\n    \n}`,
  },
  "arr-2": {
    javascript: `function maxSubArray(nums) {\n  // Kadane's algorithm\n  \n}`,
    python: `def max_sub_array(nums):\n    # Kadane's algorithm\n    pass`,
    java: `public static int maxSubArray(int[] nums) {\n    \n    return 0;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint maxSubArray(vector<int>& nums) {\n    \n    return 0;\n}`,
    go: `func maxSubArray(nums []int) int {\n    \n    return 0\n}`,
    rust: `fn max_sub_array(nums: Vec<i32>) -> i32 {\n    \n    0\n}`,
    csharp: `public static int MaxSubArray(int[] nums) {\n    \n    return 0;\n}`,
    kotlin: `fun maxSubArray(nums: IntArray): Int {\n    \n    return 0\n}`,
    ruby: `def max_sub_array(nums)\n  0\nend`,
    swift: `func maxSubArray(_ nums: [Int]) -> Int {\n    \n    return 0\n}`,
    php: `<?php\nfunction maxSubArray($nums) {\n    \n}`,
  },
  "tp-1": {
    javascript: `function isPalindrome(s) {\n  // Ignore non-alphanumeric, ignore case\n  \n}`,
    python: `def is_palindrome(s):\n    # Ignore non-alphanumeric, ignore case\n    pass`,
    java: `public static boolean isPalindrome(String s) {\n    \n    return false;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nbool isPalindrome(string s) {\n    \n    return false;\n}`,
    go: `func isPalindrome(s string) bool {\n    \n    return false\n}`,
    rust: `fn is_palindrome(s: String) -> bool {\n    \n    false\n}`,
    csharp: `public static bool IsPalindrome(string s) {\n    \n    return false;\n}`,
    kotlin: `fun isPalindrome(s: String): Boolean {\n    \n    return false\n}`,
    ruby: `def is_palindrome(s)\n  false\nend`,
    swift: `func isPalindrome(_ s: String) -> Bool {\n    \n    return false\n}`,
    php: `<?php\nfunction isPalindrome($s) {\n    \n}`,
  },
  "sw-1": {
    javascript: `function maxProfit(prices) {\n  // One buy + one sell, max profit\n  \n}`,
    python: `def max_profit(prices):\n    pass`,
    java: `public static int maxProfit(int[] prices) {\n    return 0;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint maxProfit(vector<int>& prices) {\n    return 0;\n}`,
    go: `func maxProfit(prices []int) int {\n    return 0\n}`,
    rust: `fn max_profit(prices: Vec<i32>) -> i32 {\n    0\n}`,
    csharp: `public static int MaxProfit(int[] prices) {\n    return 0;\n}`,
    kotlin: `fun maxProfit(prices: IntArray): Int {\n    return 0\n}`,
    ruby: `def max_profit(prices)\n  0\nend`,
    swift: `func maxProfit(_ prices: [Int]) -> Int {\n    return 0\n}`,
    php: `<?php\nfunction maxProfit($prices) {\n    \n}`,
  },
  "sw-2": {
    javascript: `function lengthOfLongestSubstring(s) {\n  \n}`,
    python: `def length_of_longest_substring(s):\n    pass`,
    java: `public static int lengthOfLongestSubstring(String s) {\n    return 0;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint lengthOfLongestSubstring(string s) {\n    return 0;\n}`,
    go: `func lengthOfLongestSubstring(s string) int {\n    return 0\n}`,
    rust: `fn length_of_longest_substring(s: String) -> i32 {\n    0\n}`,
    csharp: `public static int LengthOfLongestSubstring(string s) {\n    return 0;\n}`,
    kotlin: `fun lengthOfLongestSubstring(s: String): Int {\n    return 0\n}`,
    ruby: `def length_of_longest_substring(s)\n  0\nend`,
    swift: `func lengthOfLongestSubstring(_ s: String) -> Int {\n    return 0\n}`,
    php: `<?php\nfunction lengthOfLongestSubstring($s) {\n    \n}`,
  },
  "hm-1": {
    javascript: `function isAnagram(s, t) {\n  \n}`,
    python: `def is_anagram(s, t):\n    pass`,
    java: `public static boolean isAnagram(String s, String t) {\n    return false;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nbool isAnagram(string s, string t) {\n    return false;\n}`,
    go: `func isAnagram(s string, t string) bool {\n    return false\n}`,
    rust: `fn is_anagram(s: String, t: String) -> bool {\n    false\n}`,
    csharp: `public static bool IsAnagram(string s, string t) {\n    return false;\n}`,
    kotlin: `fun isAnagram(s: String, t: String): Boolean {\n    return false\n}`,
    ruby: `def is_anagram(s, t)\n  false\nend`,
    swift: `func isAnagram(_ s: String, _ t: String) -> Bool {\n    return false\n}`,
    php: `<?php\nfunction isAnagram($s, $t) {\n    \n}`,
  },
  "dp-1": {
    javascript: `function climbStairs(n) {\n  // How many ways to climb n stairs (1 or 2 at a time)?\n  \n}`,
    python: `def climb_stairs(n):\n    pass`,
    java: `public static int climbStairs(int n) {\n    return 0;\n}`,
    cpp: `int climbStairs(int n) {\n    return 0;\n}`,
    go: `func climbStairs(n int) int {\n    return 0\n}`,
    rust: `fn climb_stairs(n: i32) -> i32 {\n    0\n}`,
    csharp: `public static int ClimbStairs(int n) {\n    return 0;\n}`,
    kotlin: `fun climbStairs(n: Int): Int {\n    return 0\n}`,
    ruby: `def climb_stairs(n)\n  0\nend`,
    swift: `func climbStairs(_ n: Int) -> Int {\n    return 0\n}`,
    php: `<?php\nfunction climbStairs($n) {\n    \n}`,
  },
  "stk-1": {
    javascript: `function isValid(s) {\n  // Return true if brackets are valid\n  \n}`,
    python: `def is_valid(s):\n    pass`,
    java: `public static boolean isValid(String s) {\n    return false;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nbool isValid(string s) {\n    return false;\n}`,
    go: `func isValid(s string) bool {\n    return false\n}`,
    rust: `fn is_valid(s: String) -> bool {\n    false\n}`,
    csharp: `public static bool IsValid(string s) {\n    return false;\n}`,
    kotlin: `fun isValid(s: String): Boolean {\n    return false\n}`,
    ruby: `def is_valid(s)\n  false\nend`,
    swift: `func isValid(_ s: String) -> Bool {\n    return false\n}`,
    php: `<?php\nfunction isValid($s) {\n    \n}`,
  },
};
