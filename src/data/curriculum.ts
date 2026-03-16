export const CURRICULUM = [
  // ══════════════════ WEEK 1 ══════════════════
  {
    week: 1,
    title: "Foundations",
    color: "#00d4aa",
    topics: [
      {
        id: "big-o",
        title: "Big-O Notation",
        emoji: "📊",
        summary:
          "The language of algorithm efficiency — how we measure and compare speed and memory as inputs grow.",
        intuition: `Imagine searching for a name in a phone book. You could read every page (O(n)), flip to the middle each time (O(log n)), or jump straight to the right letter (O(1)). Big-O tells us which strategy scales better as the phone book grows from 1,000 to 1,000,000 names.

Big-O describes the worst-case upper bound of resource consumption. We drop constants and lower-order terms because at scale only the dominant term matters.

Key insight: O(2n) and O(n) are the same Big-O class. At n=1,000,000, a constant factor barely matters compared to whether you're O(n) vs O(n²).`,
        diagram: `
  Time Complexity Growth (as n increases):

  O(1)        ─────────────────────────  constant
  O(log n)    ────────╱─────────────────  logarithmic
  O(n)              ╱                    linear
  O(n log n)       ╱                     linearithmic
  O(n²)           ╱                      quadratic
  O(2ⁿ)          ╱                       exponential

  Best ──────────────────────────── Worst
        `,
        complexity: {
          common: [
            { name: "O(1)", desc: "Array index access, hash map lookup" },
            {
              name: "O(log n)",
              desc: "Binary search, balanced BST operations",
            },
            { name: "O(n)", desc: "Linear scan, single loop" },
            { name: "O(n log n)", desc: "Merge sort, heap sort" },
            { name: "O(n²)", desc: "Nested loops, bubble sort" },
            {
              name: "O(2ⁿ)",
              desc: "Recursive Fibonacci, generating all subsets",
            },
          ],
        },
        patterns: [
          "Single loop → O(n)",
          "Nested loop → O(n²)",
          "Halving input each step → O(log n)",
          "Recursion branching factor k → O(kⁿ) without memoization",
          "Drop constants: O(3n) = O(n)",
          "Drop lower terms: O(n² + n) = O(n²)",
        ],
        mistakes: [
          "Forgetting space complexity (recursion stack counts!)",
          "Assuming O(n log n) > O(n²) for all inputs (only true at large n)",
          "Confusing average case with worst case",
          "Not analyzing variable-size inner loops correctly",
        ],
        realWorld: [
          "Database query planning",
          "Choosing algorithms for real-time systems",
          "Understanding why nested loops kill big-data performance",
        ],
        code: `// O(1) — Constant: array index access
function getFirst(arr) { return arr[0]; }

// O(n) — Linear: single scan
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++)
    if (arr[i] > max) max = arr[i];
  return max;
}

// O(n²) — Quadratic: nested loops
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}

// O(log n) — Binary Search: halve each step
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}

// O(n log n) — Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
function merge(a, b) {
  const res = []; let i = 0, j = 0;
  while (i < a.length && j < b.length)
    res.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return [...res, ...a.slice(i), ...b.slice(j)];
}`,
        problems: [
          {
            id: "bigo-1",
            title: "Analyze Time Complexity",
            difficulty: "Easy",
            description:
              "What is the time complexity?\n\nfunction mystery(n) {\n  let count = 0;\n  for (let i = n; i > 0; i = Math.floor(i/2))\n    for (let j = 0; j < n; j++)\n      count++;\n  return count;\n}",
            examples: [{ input: "n = 8", output: "O(n log n)" }],
            hints: [
              "Outer loop: how many times does i get halved?",
              "Inner loop: runs n times per outer iteration.",
              "Multiply: log(n) × n = O(n log n).",
            ],
            solution:
              "Outer loop runs O(log n) times. Inner loop O(n). Total: O(n log n).",
            code: `// Outer: i = n, n/2, n/4 … 1 → log(n) iterations
// Inner: always n iterations
// Total: n × log(n) = O(n log n)`,
            whyInterviewers:
              "Tests ability to analyze non-uniform nested loops — very common pattern.",
          },
          {
            id: "bigo-2",
            title: "Space Complexity of Recursion",
            difficulty: "Easy",
            description:
              "What is the space complexity?\n\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
            examples: [{ input: "n = 5", output: "O(n) space" }],
            hints: [
              "Each recursive call adds a frame to the call stack.",
              "How deep does the stack get?",
              "factorial(5) → factorial(4) → … → factorial(1): n frames.",
            ],
            solution:
              "O(n) space — n call stack frames exist simultaneously at maximum depth.",
            code: `// Call stack at factorial(5):
// factorial(5) → (4) → (3) → (2) → (1)
// 5 frames simultaneously = O(n)`,
            whyInterviewers:
              "Many candidates forget recursion uses stack space. Critical blind spot.",
          },
          {
            id: "bigo-3",
            title: "Drop Constants",
            difficulty: "Easy",
            description:
              "Simplify: f(n) = 5n³ + 200n² + 1000n + 9999. What is the Big-O?",
            examples: [
              { input: "f(n) = 5n³ + 200n² + 1000n + 9999", output: "O(n³)" },
            ],
            hints: [
              "Which term grows fastest as n → ∞?",
              "Drop all lower-order terms.",
              "Drop leading constants.",
            ],
            solution:
              "O(n³). At large n, n³ dominates. Constants and lower-order terms are dropped.",
            code: `// As n → ∞:
// 5n³ dominates 200n² which dominates 1000n
// Drop constants: 5n³ → n³
// Big-O: O(n³)`,
            whyInterviewers:
              "Tests fundamental Big-O simplification — must-know for every analysis.",
          },
        ],
      },
      {
        id: "arrays",
        title: "Arrays",
        emoji: "📦",
        summary:
          "Contiguous memory blocks with O(1) random access — the most fundamental data structure.",
        intuition: `Arrays are like numbered parking spots. You know spot #47 and can drive directly there — O(1) access. But if you need to add a spot in the middle, everyone after it shifts over — O(n) insertion.

Arrays trade flexibility (hard to insert/delete mid-array) for speed (instant index access). This tradeoff drives almost every array problem.

Most interview problems use arrays as input. The real skill is recognizing WHICH technique applies: two pointers, sliding window, prefix sums, or sort-first.`,
        diagram: `
  Array: [3, 7, 1, 9, 4, 2, 8]
   idx:   0  1  2  3  4  5  6

  ┌───┬───┬───┬───┬───┬───┬───┐
  │ 3 │ 7 │ 1 │ 9 │ 4 │ 2 │ 8 │  ← contiguous memory
  └───┴───┴───┴───┴───┴───┴───┘

  arr[3] → direct jump → O(1)
  Insert at idx 2 → shift 2,3,4,5,6 right → O(n)
        `,
        complexity: {
          common: [
            { name: "Access", desc: "O(1)" },
            { name: "Search (unsorted)", desc: "O(n)" },
            { name: "Search (sorted)", desc: "O(log n) with binary search" },
            { name: "Insert/Delete (end)", desc: "O(1) amortized" },
            { name: "Insert/Delete (middle)", desc: "O(n) — shift required" },
          ],
        },
        patterns: [
          "Two pointers for pair/subarray problems",
          "Sliding window for contiguous subarrays",
          "Sort first to simplify comparisons",
          "Prefix sums for O(1) range queries",
          "Hash map to replace O(n) scans with O(1) lookups",
        ],
        mistakes: [
          "Off-by-one errors (< vs <=)",
          "Not handling empty array edge case",
          "Mutating array while iterating",
        ],
        realWorld: [
          "Image pixel buffers",
          "Database rows",
          "Streaming video buffers",
        ],
        code: `// 1. Prefix Sums — O(1) range queries
function buildPrefix(arr) {
  const pre = [0];
  for (const x of arr) pre.push(pre.at(-1) + x);
  return pre;
}
// sum(l, r) = pre[r+1] - pre[l]

// 2. Kadane's — Max Subarray Sum O(n)
function maxSubArray(nums) {
  let curr = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}

// 3. Product Except Self — No division, O(n)
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) { out[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
  return out;
}

// 4. Dutch National Flag — Sort 0s,1s,2s in O(n)
function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo],nums[mid]] = [nums[mid],nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid],nums[hi]] = [nums[hi],nums[mid]]; hi--; }
  }
}`,
        problems: [
          {
            id: "arr-1",
            title: "Two Sum",
            difficulty: "Easy",
            description:
              "Return indices of two numbers that add up to target. Exactly one solution exists.",
            examples: [
              { input: "[2,7,11,15], target=9", output: "[0,1]" },
              { input: "[3,2,4], target=6", output: "[1,2]" },
            ],
            hints: [
              "Brute force O(n²): check every pair.",
              "For each x, you need target-x. How to check instantly?",
              "Hash map: store seen[value]=index, look up complement in O(1).",
            ],
            solution:
              "Hash map: for each num, check if complement exists, then store it.",
            code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) return [seen.get(comp), i];
    seen.set(nums[i], i);
  }
}
// Time: O(n) | Space: O(n)`,
            whyInterviewers:
              "Tests hash map pattern. The jump from O(n²) to O(n) shows DS knowledge.",
          },
          {
            id: "arr-2",
            title: "Maximum Subarray (Kadane's)",
            difficulty: "Medium",
            description: "Find the contiguous subarray with the largest sum.",
            examples: [
              {
                input: "[-2,1,-3,4,-1,2,1,-5,4]",
                output: "6 (subarray [4,-1,2,1])",
              },
            ],
            hints: [
              "At each position: extend current or start fresh?",
              "Start fresh when running sum goes negative.",
              "Track both running sum AND global max.",
            ],
            solution:
              "Kadane's: curr = max(arr[i], curr + arr[i]). Restart when sum goes negative.",
            code: `function maxSubArray(nums) {
  let curr = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    best = Math.max(best, curr);
  }
  return best;
}
// Time: O(n) | Space: O(1)`,
            whyInterviewers:
              "Classic greedy/DP-lite. Tests decision making at each step.",
          },
          {
            id: "arr-3",
            title: "Product of Array Except Self",
            difficulty: "Hard",
            description:
              "Return array where out[i] = product of all elements except nums[i]. No division. O(n) time, O(1) extra space.",
            examples: [{ input: "[1,2,3,4]", output: "[24,12,8,6]" }],
            hints: [
              "out[i] = (product of everything LEFT) × (product of everything RIGHT)",
              "Build left products in first pass.",
              "Multiply by right product in second pass — use a running variable, not array.",
            ],
            solution:
              "Two passes: fill with left products, then multiply running right product right-to-left.",
            code: `function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    out[i] = left; left *= nums[i];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= right; right *= nums[i];
  }
  return out;
}
// Time: O(n) | Space: O(1) extra`,
            whyInterviewers:
              "Elegant two-pass trick. Tests creativity when obvious approach (division) is banned.",
          },
          {
            id: "arr-4",
            title: "Trapping Rain Water",
            difficulty: "Hard",
            description:
              "Given an elevation map, compute how much water it can trap after raining.",
            examples: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
            hints: [
              "Water at position i = min(maxLeft[i], maxRight[i]) - height[i]",
              "Precompute max heights from left and right.",
              "Optimize to O(1) space with two pointers: process the smaller side first.",
            ],
            solution:
              "Two pointer approach: maintain left/right max, process the smaller side.",
            code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax ? leftMax = height[left] : water += leftMax - height[left];
      left++;
    } else {
      height[right] >= rightMax ? rightMax = height[right] : water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
// Time: O(n) | Space: O(1)`,
            whyInterviewers:
              "Top 10 most asked. Tests spatial reasoning and two-pointer mastery.",
          },
        ],
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        emoji: "👆👆",
        summary:
          "Two indices moving intelligently through data — turns O(n²) pair-checking into O(n).",
        intuition: `Two pointers eliminates the inner loop. Instead of checking every pair (O(n²)), two pointers move based on what you learn — each pointer traverses the array at most once, giving O(n).

Three main patterns:
1. Opposite ends — move inward on sorted arrays (pair sums, palindromes)
2. Fast/slow — detect cycles, find midpoints (linked lists)  
3. Read/write — filter/compact arrays in-place

The key: each pointer moves at most n times total.`,
        diagram: `
  Opposite Ends (sorted):
  [1, 2, 3, 4, 5, 6, 7]
   L─────────────────R   sum < target? L++
      L──────────────R   sum > target? R--

  Read/Write (remove duplicates):
  [1, 1, 2, 3, 3, 4]
   W  R              W=write, R=read
      W  R           nums[R] != nums[R-1] → write
         W     R
        `,
        complexity: {
          common: [
            { name: "Time", desc: "O(n) — each pointer moves ≤ n steps" },
            { name: "Space", desc: "O(1) — just two variables" },
          ],
        },
        patterns: [
          "Sorted array + target sum → opposite pointers",
          "Remove duplicates in-place → read/write pointers",
          "Palindrome check → converge from both ends",
          "3Sum → fix one, two-pointer for remaining two",
          "Cycle detection → fast/slow pointers (Floyd's)",
        ],
        mistakes: [
          "Using on unsorted array when sort is required first",
          "Not skipping duplicates in 3Sum",
          "Wrong while condition (< vs <=)",
        ],
        realWorld: [
          "In-place string reversal",
          "Linked list cycle detection",
          "Merging sorted arrays",
        ],
        code: `// Container With Most Water
function maxWater(h) {
  let l = 0, r = h.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(h[l], h[r]));
    h[l] < h[r] ? l++ : r--;
  }
  return max;
}

// Remove Duplicates from Sorted Array (in-place)
function removeDuplicates(nums) {
  let w = 1;
  for (let r = 1; r < nums.length; r++)
    if (nums[r] !== nums[r-1]) nums[w++] = nums[r];
  return w;
}

// 3Sum — all unique triplets summing to 0
function threeSum(nums) {
  nums.sort((a,b) => a-b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let l = i+1, r = nums.length-1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l+1]) l++;
        while (l < r && nums[r] === nums[r-1]) r--;
        l++; r--;
      } else s < 0 ? l++ : r--;
    }
  }
  return res;
}`,
        problems: [
          {
            id: "tp-1",
            title: "Valid Palindrome",
            difficulty: "Easy",
            description:
              "Is the string a palindrome? Only consider alphanumeric characters, ignore case.",
            examples: [
              { input: '"A man, a plan, a canal: Panama"', output: "true" },
            ],
            hints: [
              "Two pointers from both ends.",
              "Skip non-alphanumeric with each pointer.",
              "Compare lowercased characters.",
            ],
            solution:
              "Converge from both ends, skip non-alnum, compare lowercase.",
            code: `function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !/[a-z0-9]/i.test(s[l])) l++;
    while (l < r && !/[a-z0-9]/i.test(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`,
            whyInterviewers:
              "Classic warm-up. Tests pointer mechanics and edge case handling.",
          },
          {
            id: "tp-2",
            title: "Container With Most Water",
            difficulty: "Medium",
            description:
              "Given heights of n vertical lines, find two lines that form a container holding the most water.",
            examples: [{ input: "[1,8,6,2,5,4,8,3,7]", output: "49" }],
            hints: [
              "Area = width × min(height[l], height[r]). Start with widest container.",
              "If you move the taller pointer inward, area can only decrease. Which pointer should you move?",
              "Always move the shorter pointer — that's the only chance to find larger area.",
            ],
            solution: "Start widest, always move the shorter pointer inward.",
            code: `function maxArea(h) {
  let l = 0, r = h.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(h[l], h[r]));
    h[l] <= h[r] ? l++ : r--;
  }
  return max;
}
// Time: O(n) | Space: O(1)`,
            whyInterviewers:
              "Tests greedy intuition: why moving the shorter pointer is always correct.",
          },
          {
            id: "tp-3",
            title: "3Sum",
            difficulty: "Hard",
            description: "Find all unique triplets that sum to zero.",
            examples: [
              { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
            ],
            hints: [
              "Sort the array first. Fix one element, two-pointer for the other two.",
              "Outer loop: skip duplicates with i > 0 && nums[i] === nums[i-1].",
              "Inner: after finding a triplet, skip duplicates on both sides.",
            ],
            solution:
              "Sort + fix i + two-pointer l,r. Skip duplicates carefully.",
            code: `function threeSum(nums) {
  nums.sort((a,b) => a-b);
  const res = [];
  for (let i = 0; i < nums.length-2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let l = i+1, r = nums.length-1;
    while (l < r) {
      const s = nums[i]+nums[l]+nums[r];
      if (s === 0) {
        res.push([nums[i],nums[l],nums[r]]);
        while (l < r && nums[l]===nums[l+1]) l++;
        while (l < r && nums[r]===nums[r-1]) r--;
        l++; r--;
      } else s < 0 ? l++ : r--;
    }
  }
  return res;
}`,
            whyInterviewers:
              "Extends Two Sum. Tests duplicate handling and systematic reduction.",
          },
        ],
      },
      {
        id: "sliding-window",
        title: "Sliding Window",
        emoji: "🪟",
        summary:
          "Maintain a window over contiguous elements — solve subarray/substring problems in O(n) instead of O(n²).",
        intuition: `Sliding window is for problems about a contiguous sequence with a constraint. Instead of checking every possible subarray (O(n²)), you maintain a window and slide it:
- Expand right to include new elements
- Shrink left when the window violates the constraint

Each element enters and exits the window exactly once → O(n).

Two variants:
1. Fixed window — size k is given
2. Variable window — expand until invalid, then shrink`,
        diagram: `
  Longest subarray with sum ≤ 10: [2,1,5,2,3,2]

  L=0,R=0 sum=2  ✓ [2]
  L=0,R=1 sum=3  ✓ [2,1]
  L=0,R=2 sum=8  ✓ [2,1,5]
  L=0,R=3 sum=10 ✓ [2,1,5,2]  ← maxLen=4
  L=0,R=4 sum=13 ✗ shrink L++
  L=1,R=4 sum=11 ✗ shrink L++
  L=2,R=4 sum=10 ✓ [5,2,3]
        `,
        complexity: {
          common: [
            {
              name: "Time",
              desc: "O(n) — each element enters/exits window once",
            },
            {
              name: "Space",
              desc: "O(k) window size, often O(alphabet) for strings",
            },
          ],
        },
        patterns: [
          "Max/min of size-k subarray → fixed window",
          "Longest no-repeat substring → variable + set",
          "Minimum window substring → variable + freq map",
          "Exactly-k subarrays → atMost(k) - atMost(k-1)",
        ],
        mistakes: [
          "Forgetting to update window state when shrinking",
          "Not resetting window data structure on shrink",
          "Using fixed window logic on variable window problem",
        ],
        realWorld: [
          "Network packet buffering",
          "Moving average calculations",
          "Stream rate limiting",
        ],
        code: `// Fixed: Max sum subarray of size k
function maxSumK(arr, k) {
  let sum = arr.slice(0, k).reduce((a,b) => a+b, 0);
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i-k];
    max = Math.max(max, sum);
  }
  return max;
}

// Variable: Longest substring without repeating
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let l = 0, max = 0;
  for (let r = 0; r < s.length; r++) {
    if (seen.has(s[r]) && seen.get(s[r]) >= l)
      l = seen.get(s[r]) + 1;
    seen.set(s[r], r);
    max = Math.max(max, r - l + 1);
  }
  return max;
}

// Minimum window containing all chars of t
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c)||0)+1);
  let l=0, formed=0, required=need.size, minLen=Infinity, minStart=0;
  const win = new Map();
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    win.set(c, (win.get(c)||0)+1);
    if (need.has(c) && win.get(c) === need.get(c)) formed++;
    while (formed === required) {
      if (r-l+1 < minLen) { minLen=r-l+1; minStart=l; }
      const lc = s[l];
      win.set(lc, win.get(lc)-1);
      if (need.has(lc) && win.get(lc) < need.get(lc)) formed--;
      l++;
    }
  }
  return minLen===Infinity ? "" : s.slice(minStart, minStart+minLen);
}`,
        problems: [
          {
            id: "sw-1",
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            description:
              "Find maximum profit buying once and selling once. Must buy before sell.",
            examples: [
              { input: "[7,1,5,3,6,4]", output: "5 (buy at 1, sell at 6)" },
            ],
            hints: [
              "At each day, what's the best profit if you sell today?",
              "Track minimum price seen so far.",
              "Profit = price[i] - minSoFar. Track the maximum.",
            ],
            solution:
              "Single pass: track min price and max profit simultaneously.",
            code: `function maxProfit(prices) {
  let min = Infinity, max = 0;
  for (const p of prices) {
    min = Math.min(min, p);
    max = Math.max(max, p - min);
  }
  return max;
}
// Time: O(n) | Space: O(1)`,
            whyInterviewers:
              "Clean greedy — incremental thinking at its simplest.",
          },
          {
            id: "sw-2",
            title: "Longest Substring Without Repeating",
            difficulty: "Medium",
            description:
              "Find length of the longest substring without repeating characters.",
            examples: [{ input: '"abcabcbb"', output: "3 (abc)" }],
            hints: [
              "Sliding window. Window is invalid when it contains a duplicate.",
              "Use a Map: char → last seen index.",
              "When duplicate found, jump l past it.",
            ],
            solution:
              "Variable window with Map: l jumps past previous occurrence.",
            code: `function lengthOfLongestSubstring(s) {
  const last = new Map(); let l=0, max=0;
  for (let r=0; r<s.length; r++) {
    if (last.has(s[r]) && last.get(s[r])>=l) l=last.get(s[r])+1;
    last.set(s[r], r);
    max = Math.max(max, r-l+1);
  }
  return max;
}
// Time: O(n) | Space: O(alphabet)`,
            whyInterviewers:
              "Top 5 most asked. Window + hash map combo seen in dozens of variants.",
          },
          {
            id: "sw-3",
            title: "Permutation in String",
            difficulty: "Medium",
            description: "Return true if s2 contains a permutation of s1.",
            examples: [
              {
                input: 's1="ab", s2="eidbaooo"',
                output: "true (s2 contains 'ba')",
              },
            ],
            hints: [
              "A permutation = same characters, same frequency, any order.",
              "Use a fixed window of size s1.length.",
              "Compare frequency maps — shrink/expand as window slides.",
            ],
            solution:
              "Fixed window of size |s1|. Use frequency arrays for O(1) comparison.",
            code: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const have = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);
  for (const c of s1) need[c.charCodeAt(0)-a]++;
  for (let i=0; i<s1.length; i++) have[s2.charCodeAt(i)-a]++;
  if (need.join()===have.join()) return true;
  for (let i=s1.length; i<s2.length; i++) {
    have[s2.charCodeAt(i)-a]++;
    have[s2.charCodeAt(i-s1.length)-a]--;
    if (need.join()===have.join()) return true;
  }
  return false;
}`,
            whyInterviewers:
              "Anagram + sliding window combo. Appears constantly in string interviews.",
          },
        ],
      },
      {
        id: "hash-maps",
        title: "Hash Maps & Sets",
        emoji: "🗺️",
        summary:
          "O(1) average lookup, insert, delete — the most powerful weapon against nested loops.",
        intuition: `A hash map is a super-powered dictionary. Store value at key 'hello', retrieve it in O(1) later. The magic: a hash function converts any key to an array index in constant time.

The interview pattern: whenever you're doing O(n) lookups inside a loop (O(n²) total), ask "can I precompute this in a hash map for O(1) lookups?"

Sets work the same way — just keys, no values. Perfect for deduplication and membership testing.`,
        diagram: `
  key "apple" → hash() → idx 3 → buckets[3] = "fruit"
  key "car"   → hash() → idx 7 → buckets[7] = "vehicle"

  [null, null, null, "fruit", null, null, null, "vehicle"]
   0     1     2      3       4     5     6       7

  Collision: both "apple" and "grape" → idx 3
  → Chaining: buckets[3] = [("apple","fruit"),("grape","fruit")]
        `,
        complexity: {
          common: [
            {
              name: "Get/Set/Delete",
              desc: "O(1) average, O(n) worst (all keys collide)",
            },
            { name: "Space", desc: "O(n)" },
            { name: "Iteration", desc: "O(n)" },
          ],
        },
        patterns: [
          "Frequency counting in O(n)",
          "Two Sum complement lookup",
          "Anagram detection via sorted key",
          "Grouping elements by computed property",
          "Prefix sum + hash map for subarray problems",
        ],
        mistakes: [
          "Using object {} instead of Map for non-string keys",
          "Mutating map keys while iterating",
          "Not considering hash collision worst case",
        ],
        realWorld: [
          "Database indexes",
          "Browser caching",
          "Deduplification in pipelines",
        ],
        code: `// Frequency Counter — first unique char
function firstUnique(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c)||0)+1);
  for (let i=0; i<s.length; i++) if (freq.get(s[i])===1) return i;
  return -1;
}

// Group Anagrams
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

// Longest Consecutive Sequence — O(n)
function longestConsecutive(nums) {
  const set = new Set(nums); let max = 0;
  for (const n of set) {
    if (!set.has(n-1)) { // sequence start
      let len=1, cur=n;
      while (set.has(++cur)) len++;
      max = Math.max(max, len);
    }
  }
  return max;
}

// Subarray Sum = K
function subarraySum(nums, k) {
  const map = new Map([[0,1]]); let sum=0, count=0;
  for (const n of nums) {
    sum += n;
    count += map.get(sum-k) || 0;
    map.set(sum, (map.get(sum)||0)+1);
  }
  return count;
}`,
        problems: [
          {
            id: "hm-1",
            title: "Valid Anagram",
            difficulty: "Easy",
            description: "Return true if t is an anagram of s.",
            examples: [{ input: 's="anagram", t="nagaram"', output: "true" }],
            hints: [
              "Anagram = same chars, same frequencies.",
              "Build freq map for s, subtract for t.",
              "If any freq < 0, return false.",
            ],
            solution: "Frequency map: count up for s, count down for t.",
            code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c)||0)+1);
  for (const c of t) {
    if (!freq.get(c)) return false;
    freq.set(c, freq.get(c)-1);
  }
  return true;
}`,
            whyInterviewers:
              "Foundation of frequency counting — used in dozens of harder problems.",
          },
          {
            id: "hm-2",
            title: "Longest Consecutive Sequence",
            difficulty: "Medium",
            description:
              "Find the length of the longest consecutive elements sequence in O(n).",
            examples: [{ input: "[100,4,200,1,3,2]", output: "4 (1,2,3,4)" }],
            hints: [
              "Sorting would be O(n log n). Can you do O(n)?",
              "Use a Set. For each number, only start counting if n-1 is NOT in the set.",
              "That makes it the start of a sequence. Count how far it extends.",
            ],
            solution: "HashSet + only count from sequence starts.",
            code: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (!set.has(n-1)) {
      let len=1, cur=n;
      while (set.has(++cur)) len++;
      best = Math.max(best, len);
    }
  }
  return best;
}
// Time: O(n) | Space: O(n)`,
            whyInterviewers:
              "Tests insight: skip non-starts to avoid O(n²) while still getting O(n).",
          },
          {
            id: "hm-3",
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            description:
              "Return the k most frequent elements in O(n log n) or better.",
            examples: [{ input: "[1,1,1,2,2,3], k=2", output: "[1,2]" }],
            hints: [
              "Count frequencies with a hash map.",
              "Then get top-k by frequency.",
              "Bucket sort trick: put nums in bucket[freq] for O(n) solution.",
            ],
            solution:
              "Frequency map + bucket sort: bucket[freq] = [nums]. Scan buckets from high to low.",
            code: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n)||0)+1);
  const buckets = Array.from({length: nums.length+1}, ()=>[]);
  for (const [n, f] of freq) buckets[f].push(n);
  const res = [];
  for (let i=buckets.length-1; i>=0 && res.length<k; i--)
    res.push(...buckets[i]);
  return res.slice(0,k);
}
// Time: O(n) | Space: O(n)`,
            whyInterviewers:
              "Bucket sort insight elevates from O(n log n) to O(n) — interviewers love this.",
          },
        ],
      },
      {
        id: "recursion",
        title: "Recursion",
        emoji: "🔄",
        summary:
          "Break problems into smaller versions of themselves — the foundation of DFS, divide-and-conquer, and DP.",
        intuition: `Recursion: a function calls itself with a simpler input until hitting a base case.

Three laws:
1. Must have a base case (stopping condition)
2. Must reduce toward the base case
3. Must call itself

The mental model: TRUST THE RECURSION. Assume the function works for n-1. Figure out how to handle n using that result. This is the "recursive leap of faith."

Stack visualization: each call adds a frame. When base case hits, frames pop in reverse collecting results.`,
        diagram: `
  factorial(4):
  4 * factorial(3)
      3 * factorial(2)
          2 * factorial(1)
              returns 1
          returns 2
      returns 6
  returns 24

  fib(5) without memo — exponential blowup:
       fib(5)
      /      \\
   fib(4)   fib(3)
   /    \\   /    \\
 fib(3) fib(2) fib(2) fib(1)  ← recomputed!
        `,
        complexity: {
          common: [
            {
              name: "Time",
              desc: "Depends on recurrence. Naive fib = O(2ⁿ), memoized = O(n)",
            },
            { name: "Space", desc: "O(depth) call stack. Factorial = O(n)" },
          ],
        },
        patterns: [
          "Base case + recursive case pattern",
          "Memoization to avoid exponential recomputation",
          "Divide and conquer (merge sort, binary search)",
          "Backtracking (generate all combinations)",
          "Tree/graph DFS",
        ],
        mistakes: [
          "Missing base case → stack overflow",
          "Not reducing problem size → infinite recursion",
          "Recomputing subproblems without memoization → O(2ⁿ)",
        ],
        realWorld: [
          "File system traversal",
          "DOM rendering",
          "Parsing nested JSON/XML",
        ],
        code: `// Memoized Fibonacci — O(n) time
function fib(n, memo={}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}

// Power (fast exponentiation) — O(log n)
function power(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) { const h = power(base, exp/2); return h*h; }
  return base * power(base, exp-1);
}

// Generate All Subsets
function subsets(nums) {
  const res = [];
  function bt(i, curr) {
    res.push([...curr]);
    for (let j=i; j<nums.length; j++) {
      curr.push(nums[j]);
      bt(j+1, curr);
      curr.pop();
    }
  }
  bt(0, []);
  return res;
}

// Tower of Hanoi
function hanoi(n, from='A', to='C', via='B') {
  if (n === 0) return;
  hanoi(n-1, from, via, to);
  console.log(\`Move disk \${n}: \${from} → \${to}\`);
  hanoi(n-1, via, to, from);
}`,
        problems: [
          {
            id: "rec-1",
            title: "Merge Sort Implementation",
            difficulty: "Medium",
            description: "Implement merge sort recursively.",
            examples: [{ input: "[5,2,4,6,1,3]", output: "[1,2,3,4,5,6]" }],
            hints: [
              "Base case: array of size 0 or 1 is already sorted.",
              "Divide: split array in half.",
              "Conquer: recursively sort each half, then merge.",
            ],
            solution: "Split → sort halves → merge.",
            code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const m = arr.length >> 1;
  const L = mergeSort(arr.slice(0,m));
  const R = mergeSort(arr.slice(m));
  return merge(L, R);
}
function merge(a, b) {
  const res=[]; let i=0,j=0;
  while(i<a.length&&j<b.length) res.push(a[i]<=b[j]?a[i++]:b[j++]);
  return [...res,...a.slice(i),...b.slice(j)];
}
// Time: O(n log n) | Space: O(n)`,
            whyInterviewers:
              "Classic divide-and-conquer. Must be able to implement from scratch.",
          },
          {
            id: "rec-2",
            title: "Flatten Nested Array",
            difficulty: "Medium",
            description: "Flatten an arbitrarily nested array of integers.",
            examples: [{ input: "[1,[2,[3,[4]]],5]", output: "[1,2,3,4,5]" }],
            hints: [
              "For each element: if it's an array, recurse into it. If it's a number, add it.",
              "You can also use Array.isArray() to check.",
            ],
            solution:
              "Recursively process each element — if array, flatten; if value, collect.",
            code: `function flatten(arr) {
  return arr.reduce((acc, item) =>
    acc.concat(Array.isArray(item) ? flatten(item) : item), []);
}
// Or iteratively with stack — O(n)`,
            whyInterviewers:
              "Tests recursive thinking on real data formats (JSON, trees).",
          },
        ],
      },
    ],
  },

  // ══════════════════ WEEK 2 ══════════════════
  {
    week: 2,
    title: "Core Data Structures",
    color: "#7c3aed",
    topics: [
      {
        id: "stacks",
        title: "Stacks",
        emoji: "🥞",
        summary:
          "Last-In First-Out structure — essential for parsing, undo systems, and monotonic problems.",
        intuition: `A stack is a pile of plates. You add to the top (push) and take from the top (pop) — Last-In First-Out (LIFO).

The key use cases that scream "stack":
1. Matching parentheses / brackets
2. "Previous/next greater element" problems (monotonic stack)
3. Undo/redo, browser back button
4. DFS iteratively
5. Expression evaluation

Monotonic stack is the advanced technique: maintain a stack that's always increasing (or decreasing). This solves "next greater element" problems in O(n) instead of O(n²).`,
        diagram: `
  Stack operations:
  push(1) → [1]
  push(2) → [1, 2]
  push(3) → [1, 2, 3]
  pop()   → returns 3, stack=[1,2]
  peek()  → returns 2, stack=[1,2]

  Monotonic Stack — Next Greater Element:
  arr = [2, 1, 2, 4, 3]
  stack keeps decreasing indices

  i=0: push 0. stack=[0]
  i=1: 1<arr[0]=2, push. stack=[0,1]
  i=2: 2>arr[1]=1 → NGE[1]=2, pop. 2=arr[0]=2, push. stack=[0,2]
  i=3: 4>arr[2]=2 → NGE[2]=4; 4>arr[0]=2 → NGE[0]=4. push. stack=[3]
        `,
        complexity: {
          common: [
            { name: "Push/Pop/Peek", desc: "O(1)" },
            { name: "Space", desc: "O(n)" },
          ],
        },
        patterns: [
          "Parentheses matching → push open, pop+check close",
          "Next Greater Element → monotonic stack",
          "Largest Rectangle in Histogram → monotonic stack",
          "DFS iteratively → explicit stack",
          "Min stack → maintain parallel min-tracking stack",
        ],
        mistakes: [
          "Checking top of empty stack (always check length first)",
          "Using array unshift/shift (O(n)) instead of push/pop (O(1))",
          "Not understanding when to use min-stack vs max-stack",
        ],
        realWorld: [
          "Compiler syntax validation",
          "Call stack in JavaScript engine",
          "Undo/redo in editors",
        ],
        code: `// Valid Parentheses
function isValid(s) {
  const stack = [], map = {')':'(', ']':'[', '}':'{'};
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}

// Min Stack — O(1) getMin
class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) {
    this.stack.push(val);
    this.minStack.push(Math.min(val, this.minStack.at(-1) ?? val));
  }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}

// Next Greater Element (Monotonic Stack)
function nextGreaterElement(nums) {
  const res = new Array(nums.length).fill(-1);
  const stack = []; // stores indices
  for (let i=0; i<nums.length; i++) {
    while (stack.length && nums[i] > nums[stack.at(-1)]) {
      res[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return res;
}

// Largest Rectangle in Histogram
function largestRectangle(heights) {
  const stack = [-1]; let max = 0;
  heights.push(0); // sentinel
  for (let i=0; i<heights.length; i++) {
    while (stack.at(-1) !== -1 && heights[i] < heights[stack.at(-1)]) {
      const h = heights[stack.pop()];
      const w = i - stack.at(-1) - 1;
      max = Math.max(max, h*w);
    }
    stack.push(i);
  }
  return max;
}`,
        problems: [
          {
            id: "stk-1",
            title: "Valid Parentheses",
            difficulty: "Easy",
            description:
              'Given a string of brackets, return true if it is valid. "()" and "()[]{}" are valid. "(]" is not.',
            examples: [
              { input: '"()[]{}"', output: "true" },
              { input: '"(]"', output: "false" },
            ],
            hints: [
              "For every close bracket, the most recent unmatched open bracket must match.",
              "Use a stack: push open brackets, pop on close.",
              "At the end, stack must be empty.",
            ],
            solution: "Push open brackets. On close, pop and verify match.",
            code: `function isValid(s) {
  const stack=[], map={')':'(', ']':'[', '}':'{'};
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length===0;
}
// Time: O(n) | Space: O(n)`,
            whyInterviewers:
              "Foundational stack problem. Simple but requires clean thinking.",
          },
          {
            id: "stk-2",
            title: "Min Stack",
            difficulty: "Medium",
            description:
              "Design a stack supporting push, pop, top, and getMin() all in O(1).",
            examples: [
              {
                input: "push(-2), push(0), push(-3), getMin(), pop(), getMin()",
                output: "-3, -2",
              },
            ],
            hints: [
              "Maintaining a separate min-stack in parallel is the key.",
              "Min stack stores: what was the min AT THE TIME this element was pushed?",
              "On pop, pop both stacks.",
            ],
            solution:
              "Parallel minStack: each entry = min of all elements up to that point.",
            code: `class MinStack {
  constructor() { this.s=[]; this.m=[]; }
  push(v) { this.s.push(v); this.m.push(Math.min(v,this.m.at(-1)??v)); }
  pop() { this.s.pop(); this.m.pop(); }
  top() { return this.s.at(-1); }
  getMin() { return this.m.at(-1); }
}`,
            whyInterviewers:
              "Classic O(1) constraint design — tests if you think beyond the obvious.",
          },
          {
            id: "stk-3",
            title: "Daily Temperatures",
            difficulty: "Medium",
            description:
              "For each day, find how many days until a warmer temperature. Return 0 if none.",
            examples: [
              {
                input: "[73,74,75,71,69,72,76,73]",
                output: "[1,1,4,2,1,1,0,0]",
              },
            ],
            hints: [
              "For each temperature, you need the next day that's hotter.",
              "Monotonic decreasing stack of indices.",
              "When you find a hotter day, pop and compute the difference.",
            ],
            solution:
              "Monotonic stack: maintain indices of days waiting for a warmer day.",
            code: `function dailyTemperatures(T) {
  const res=new Array(T.length).fill(0), stack=[];
  for (let i=0; i<T.length; i++) {
    while (stack.length && T[i] > T[stack.at(-1)]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
// Time: O(n) | Space: O(n)`,
            whyInterviewers:
              "Monotonic stack introduction — pattern used in 10+ interview problems.",
          },
        ],
      },
      {
        id: "queues",
        title: "Queues",
        emoji: "🚶",
        summary:
          "First-In First-Out structure — the backbone of BFS and level-by-level processing.",
        intuition: `A queue is a line at a coffee shop — first person in, first person served (FIFO). You enqueue at the back and dequeue from the front.

Queues power BFS because BFS processes nodes level by level: enqueue neighbors, process them in order. This guarantees shortest path in unweighted graphs.

Deque (double-ended queue) is the advanced version: efficient insertion and deletion from both ends. Key for sliding window maximum (monotonic deque) and BFS with pruning.`,
        diagram: `
  Queue: enqueue at right, dequeue from left

  enqueue(1): [1]
  enqueue(2): [1, 2]
  enqueue(3): [1, 2, 3]
  dequeue():  returns 1, queue=[2,3]
  dequeue():  returns 2, queue=[3]

  Monotonic Deque (max of sliding window):
  arr=[1,3,-1,-3,5,3,6,7], k=3
  window [1,3,-1] → max=3 (3 stays in deque)
  window [3,-1,-3]→ max=3
  window [-1,-3,5]→ max=5 (old elements removed)
        `,
        complexity: {
          common: [
            { name: "Enqueue/Dequeue (linked list)", desc: "O(1)" },
            {
              name: "JS Array shift()",
              desc: "O(n) — avoid for large inputs!",
            },
            { name: "Use array with pointer index", desc: "O(1) amortized" },
          ],
        },
        patterns: [
          "BFS → queue of nodes to visit",
          "Level-order tree traversal",
          "Sliding window maximum → monotonic deque",
          "Circular queue design",
          "Task scheduling / rate limiting",
        ],
        mistakes: [
          "Using array.shift() (O(n)) instead of pointer-based queue",
          "Forgetting to check queue size before snapshot in BFS level iteration",
          "Using queue when stack (DFS) is what's needed",
        ],
        realWorld: [
          "OS process scheduling",
          "Print spooling",
          "Message queues (Kafka, RabbitMQ)",
        ],
        code: `// Efficient Queue using index pointer
class Queue {
  constructor() { this.data=[]; this.head=0; }
  enqueue(x) { this.data.push(x); }
  dequeue() { return this.head<this.data.length ? this.data[this.head++] : undefined; }
  size() { return this.data.length - this.head; }
  isEmpty() { return this.size()===0; }
}

// BFS Level Order
function levelOrder(root) {
  if (!root) return [];
  const res=[], q=[root];
  while (q.length) {
    const level=[], size=q.length;
    for (let i=0; i<size; i++) {
      const node=q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}

// Sliding Window Maximum (Monotonic Deque)
function maxSlidingWindow(nums, k) {
  const deque=[], res=[];
  for (let i=0; i<nums.length; i++) {
    // Remove elements outside window
    while (deque.length && deque[0] < i-k+1) deque.shift();
    // Remove smaller elements from back
    while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k-1) res.push(nums[deque[0]]);
  }
  return res;
}`,
        problems: [
          {
            id: "q-1",
            title: "Number of Islands",
            difficulty: "Medium",
            description:
              "Count the number of islands in a 2D grid of '1's (land) and '0's (water).",
            examples: [{ input: "11110\n11010\n11000\n00000", output: "1" }],
            hints: [
              "Each connected component of 1s is an island.",
              "BFS or DFS from each unvisited '1', marking visited cells.",
              "Count how many times you start a new BFS/DFS.",
            ],
            solution:
              "For each unvisited '1', BFS to mark entire island as visited.",
            code: `function numIslands(grid) {
  let count=0;
  const R=grid.length, C=grid[0].length;
  function bfs(r,c) {
    const q=[[r,c]]; grid[r][c]='0';
    while(q.length) {
      const [row,col]=q.shift();
      for(const[dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        const nr=row+dr, nc=col+dc;
        if(nr>=0&&nr<R&&nc>=0&&nc<C&&grid[nr][nc]==='1') {
          grid[nr][nc]='0'; q.push([nr,nc]);
        }
      }
    }
  }
  for(let r=0;r<R;r++) for(let c=0;c<C;c++)
    if(grid[r][c]==='1') { bfs(r,c); count++; }
  return count;
}`,
            whyInterviewers:
              "Queue + BFS + grid traversal — a three-in-one fundamental pattern.",
          },
          {
            id: "q-2",
            title: "Sliding Window Maximum",
            difficulty: "Hard",
            description:
              "Return the maximum value in each sliding window of size k.",
            examples: [
              { input: "[1,3,-1,-3,5,3,6,7], k=3", output: "[3,3,5,5,6,7]" },
            ],
            hints: [
              "Brute force is O(nk). Can you do O(n)?",
              "Monotonic deque: maintain indices where values are decreasing.",
              "Front = max of window. When front index leaves window, remove it.",
            ],
            solution:
              "Monotonic deque: front always holds index of window maximum.",
            code: `function maxSlidingWindow(nums, k) {
  const dq=[], res=[];
  for(let i=0;i<nums.length;i++) {
    while(dq.length && dq[0]<=i-k) dq.shift();
    while(dq.length && nums[dq.at(-1)]<nums[i]) dq.pop();
    dq.push(i);
    if(i>=k-1) res.push(nums[dq[0]]);
  }
  return res;
}
// Time: O(n) | Space: O(k)`,
            whyInterviewers:
              "Hard problem with elegant O(n) solution. Tests advanced deque thinking.",
          },
        ],
      },
      {
        id: "binary-search",
        title: "Binary Search",
        emoji: "🔍",
        summary:
          "Eliminate half the search space each step — O(log n) for any monotonic problem, not just sorted arrays.",
        intuition: `Binary search isn't just for sorted arrays. The KEY insight: binary search works on ANY problem where you can ask "is the answer ≤ mid?" and get a yes/no — this splits the search space.

Pattern: define a search space [lo, hi]. Compute mid. If condition(mid) is true, eliminate one half. Repeat until lo meets hi.

The hardest part: figuring out what to binary search ON. Common targets: the answer value itself ("search on answer"), index in sorted array, position in matrix.`,
        diagram: `
  Binary Search on sorted array:
  [1, 3, 5, 7, 9, 11, 13], target=7

  lo=0, hi=6, mid=3, arr[3]=7 ✓ → found!

  target=9:
  lo=0,hi=6,mid=3, arr[3]=7 < 9 → lo=4
  lo=4,hi=6,mid=5, arr[5]=11 > 9 → hi=4
  lo=4,hi=4,mid=4, arr[4]=9 ✓  → found!

  "Search on answer" pattern:
  "What's minimum speed to eat k bananas?" →
  Binary search the SPEED VALUE, check if feasible.
        `,
        complexity: {
          common: [
            { name: "Time", desc: "O(log n) — halve search space each step" },
            { name: "Space", desc: "O(1) iterative, O(log n) recursive" },
          ],
        },
        patterns: [
          "Standard: find target in sorted array",
          "Find first/last position of target",
          "Search rotated sorted array",
          "Search on answer: minimize/maximize a value",
          "Find peak element in mountain array",
        ],
        mistakes: [
          "Integer overflow in mid = (lo+hi)/2 → use (lo + (hi-lo)/2)",
          "Wrong termination condition (< vs <=)",
          "Not handling duplicate elements correctly",
          "Infinite loop: lo/hi not moving (wrong update)",
        ],
        realWorld: [
          "Database index lookups",
          "Git bisect for bug finding",
          "Load balancing thresholds",
        ],
        code: `// Standard Binary Search
function binarySearch(arr, target) {
  let lo=0, hi=arr.length-1;
  while (lo<=hi) {
    const mid = lo + ((hi-lo)>>1); // avoids overflow
    if (arr[mid]===target) return mid;
    arr[mid]<target ? lo=mid+1 : hi=mid-1;
  }
  return -1;
}

// Find Leftmost Position
function searchLeft(arr, target) {
  let lo=0, hi=arr.length;
  while (lo<hi) {
    const mid = (lo+hi)>>1;
    arr[mid]<target ? lo=mid+1 : hi=mid;
  }
  return lo<arr.length && arr[lo]===target ? lo : -1;
}

// Search Rotated Sorted Array
function searchRotated(nums, target) {
  let lo=0, hi=nums.length-1;
  while (lo<=hi) {
    const mid=(lo+hi)>>1;
    if (nums[mid]===target) return mid;
    if (nums[lo]<=nums[mid]) { // left half sorted
      if (target>=nums[lo] && target<nums[mid]) hi=mid-1;
      else lo=mid+1;
    } else { // right half sorted
      if (target>nums[mid] && target<=nums[hi]) lo=mid+1;
      else hi=mid-1;
    }
  }
  return -1;
}

// Search on Answer — Koko Eating Bananas
function minEatingSpeed(piles, h) {
  let lo=1, hi=Math.max(...piles);
  while (lo<hi) {
    const mid=(lo+hi)>>1;
    const hours=piles.reduce((sum,p)=>sum+Math.ceil(p/mid),0);
    hours<=h ? hi=mid : lo=mid+1;
  }
  return lo;
}`,
        problems: [
          {
            id: "bs-1",
            title: "Find Minimum in Rotated Sorted Array",
            difficulty: "Medium",
            description:
              "Find the minimum element in a rotated sorted array (no duplicates).",
            examples: [
              { input: "[3,4,5,1,2]", output: "1" },
              { input: "[4,5,6,7,0,1,2]", output: "0" },
            ],
            hints: [
              "The minimum is at the rotation point.",
              "If arr[mid] > arr[hi], minimum is in the right half.",
              "Else minimum is in the left half (including mid).",
            ],
            solution:
              "Binary search: compare mid with right to decide which half the minimum is in.",
            code: `function findMin(nums) {
  let lo=0, hi=nums.length-1;
  while (lo<hi) {
    const mid=(lo+hi)>>1;
    nums[mid]>nums[hi] ? lo=mid+1 : hi=mid;
  }
  return nums[lo];
}
// Time: O(log n) | Space: O(1)`,
            whyInterviewers:
              "Tests binary search adaptability beyond simple sorted array.",
          },
          {
            id: "bs-2",
            title: "Koko Eating Bananas",
            difficulty: "Medium",
            description:
              "Find minimum eating speed k such that Koko can eat all piles within h hours.",
            examples: [{ input: "piles=[3,6,7,11], h=8", output: "4" }],
            hints: [
              "Speed can range from 1 to max(piles).",
              "At speed k, hours needed = sum(ceil(pile/k)).",
              "Binary search on the SPEED. Check if it's feasible.",
            ],
            solution:
              "Binary search on speed (1 to max). Find minimum feasible speed.",
            code: `function minEatingSpeed(piles, h) {
  let lo=1, hi=Math.max(...piles);
  while(lo<hi) {
    const mid=(lo+hi)>>1;
    const hours=piles.reduce((s,p)=>s+Math.ceil(p/mid),0);
    hours<=h ? hi=mid : lo=mid+1;
  }
  return lo;
}
// Time: O(n log m) where m=max pile`,
            whyInterviewers:
              "Classic 'search on answer' — tests recognizing when to binary search the ANSWER not the array.",
          },
        ],
      },
      {
        id: "sorting",
        title: "Sorting Algorithms",
        emoji: "📋",
        summary:
          "Fundamental ordering algorithms — know implementations, tradeoffs, and when to use each.",
        intuition: `You won't implement sort from scratch in most interviews (just use .sort()), BUT you must understand:
1. Why O(n log n) is the lower bound for comparison sorts
2. Merge Sort: stable, O(n log n) guaranteed, O(n) space
3. Quick Sort: O(n log n) average, O(log n) space, in-place, O(n²) worst
4. Heap Sort: O(n log n) guaranteed, O(1) space
5. Counting/Radix Sort: O(n+k) for integers — beats O(n log n)!

Interview angle: sorting often SIMPLIFIES problems. "Sort first" is a common technique — once sorted, you can use binary search, two pointers, and greedy strategies.`,
        diagram: `
  Merge Sort (stable, O(n log n)):
  [5,3,8,1,9,2]
   ↓ divide
  [5,3,8] [1,9,2]
   ↓        ↓
  [5,3][8] [1,9][2]
   ↓         ↓
  [3,5][8] [1,9][2]
      ↓          ↓
  [3,5,8]   [1,2,9]
       ↓merge↓
  [1,2,3,5,8,9]

  Quick Sort pivot partitioning:
  [3,6,8,10,1,2,1] pivot=1
  → [1,1] [3,6,8,10,2]  (partition)
        `,
        complexity: {
          common: [
            {
              name: "Merge Sort",
              desc: "O(n log n) all cases, O(n) space, stable",
            },
            {
              name: "Quick Sort",
              desc: "O(n log n) avg, O(n²) worst, O(log n) space, unstable",
            },
            {
              name: "Heap Sort",
              desc: "O(n log n) all cases, O(1) space, unstable",
            },
            {
              name: "Counting Sort",
              desc: "O(n+k) time+space, only for bounded integers",
            },
            {
              name: "JavaScript .sort()",
              desc: "O(n log n) — Timsort (stable)",
            },
          ],
        },
        patterns: [
          "Sort first → enables two pointers, binary search, greedy",
          "Custom comparator for complex objects",
          "Partial sort (Top-K) → heap in O(n log k)",
          "Counting sort for bounded integer ranges",
        ],
        mistakes: [
          "JS default .sort() sorts lexicographically — always pass comparator for numbers!",
          "Choosing quicksort on nearly-sorted data (O(n²) without randomization)",
          "Forgetting merge sort's O(n) extra space cost",
        ],
        realWorld: [
          "Database ORDER BY",
          "Leaderboard ranking",
          "File system sorting",
        ],
        code: `// QuickSort
function quickSort(arr, lo=0, hi=arr.length-1) {
  if (lo>=hi) return arr;
  const p = partition(arr, lo, hi);
  quickSort(arr, lo, p-1);
  quickSort(arr, p+1, hi);
  return arr;
}
function partition(arr, lo, hi) {
  const pivot=arr[hi]; let i=lo;
  for(let j=lo;j<hi;j++) {
    if(arr[j]<=pivot) { [arr[i],arr[j]]=[arr[j],arr[i]]; i++; }
  }
  [arr[i],arr[hi]]=[arr[hi],arr[i]];
  return i;
}

// Counting Sort (integers 0..k)
function countingSort(arr, k) {
  const count=new Array(k+1).fill(0);
  for(const x of arr) count[x]++;
  const res=[];
  for(let i=0;i<=k;i++) while(count[i]--) res.push(i);
  return res;
}

// Sort Colors (Dutch National Flag)
function sortColors(nums) {
  let lo=0,mid=0,hi=nums.length-1;
  while(mid<=hi) {
    if(nums[mid]===0) { [nums[lo],nums[mid]]=[nums[mid],nums[lo]]; lo++;mid++; }
    else if(nums[mid]===1) mid++;
    else { [nums[mid],nums[hi]]=[nums[hi],nums[mid]]; hi--; }
  }
}`,
        problems: [
          {
            id: "sort-1",
            title: "Merge Intervals",
            difficulty: "Medium",
            description: "Merge all overlapping intervals.",
            examples: [
              {
                input: "[[1,3],[2,6],[8,10],[15,18]]",
                output: "[[1,6],[8,10],[15,18]]",
              },
            ],
            hints: [
              "Sort by start time first.",
              "Then scan: if current start ≤ previous end, merge (extend end).",
              "Otherwise, start a new interval.",
            ],
            solution: "Sort by start, then greedily merge overlapping.",
            code: `function merge(intervals) {
  intervals.sort((a,b)=>a[0]-b[0]);
  const res=[intervals[0]];
  for(let i=1;i<intervals.length;i++) {
    const last=res.at(-1), curr=intervals[i];
    curr[0]<=last[1] ? last[1]=Math.max(last[1],curr[1]) : res.push(curr);
  }
  return res;
}
// Time: O(n log n) | Space: O(n)`,
            whyInterviewers:
              "Sort-first pattern + greedy merge. Very common in scheduling problems.",
          },
          {
            id: "sort-2",
            title: "Sort Colors (Dutch National Flag)",
            difficulty: "Medium",
            description:
              "Sort an array containing only 0s, 1s, and 2s in O(n) with O(1) space — one pass.",
            examples: [{ input: "[2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }],
            hints: [
              "Three partitions: [0s | 1s | unknowns | 2s]",
              "Three pointers: lo (end of 0s), mid (current), hi (start of 2s).",
              "Swap based on nums[mid]: 0→swap with lo, 1→advance, 2→swap with hi.",
            ],
            solution: "Dutch National Flag: three-pointer one-pass partition.",
            code: `function sortColors(nums) {
  let lo=0, mid=0, hi=nums.length-1;
  while(mid<=hi) {
    if(nums[mid]===0) { [nums[lo],nums[mid]]=[nums[mid],nums[lo]]; lo++;mid++; }
    else if(nums[mid]===1) mid++;
    else { [nums[mid],nums[hi]]=[nums[hi],nums[mid]]; hi--; }
    // Don't increment mid when swapping with hi!
  }
}`,
            whyInterviewers:
              "Classic partitioning. The 'don't increment mid when swapping with hi' catches everyone.",
          },
        ],
      },
      {
        id: "linked-lists",
        title: "Linked Lists",
        emoji: "🔗",
        summary:
          "Dynamic chain of nodes — O(1) insert/delete at known position, O(n) access.",
        intuition: `A linked list is a treasure hunt — each clue tells you where the next is. You can't jump to step 5; you must follow the chain.

vs Arrays: arrays give O(1) random access but O(n) insert. Linked lists give O(1) insert at known position but O(n) to find that position.

The dummy node trick: add a fake head at the start. Eliminates edge cases when head changes (deletion, reversal) — cleaner code, fewer bugs.

Fast/slow pointers: the most elegant technique. Tortoise (slow, 1 step) and hare (fast, 2 steps) — detects cycles, finds midpoints, finds nth-from-end.`,
        diagram: `
  Singly Linked List:
  head→[1|•]→[2|•]→[3|•]→[4|null]

  Dummy head:
  dummy→[1|•]→[2|•]→[3|•]→null
    ↑ dummy.next is the real head

  Fast/Slow for midpoint:
  1→2→3→4→5
  S=1 F=1
  S=2 F=3
  S=3 F=5 ← F reaches end, S is at middle
        `,
        complexity: {
          common: [
            { name: "Access by index", desc: "O(n)" },
            { name: "Insert/Delete at head", desc: "O(1)" },
            { name: "Insert/Delete (given node)", desc: "O(1)" },
            { name: "Search", desc: "O(n)" },
          ],
        },
        patterns: [
          "Dummy head for edge-case-free code",
          "Fast/slow pointers: cycle, midpoint, nth from end",
          "Reverse in-place: iterative and recursive",
          "Merge two sorted lists",
          "Reverse K groups",
        ],
        mistakes: [
          "Losing reference to next before relinking",
          "Null checks — always verify node.next before accessing",
          "Off-by-one in advance-N-steps for nth from end",
        ],
        realWorld: [
          "Browser history (back/forward)",
          "Music playlists",
          "Undo/redo",
        ],
        code: `class ListNode { constructor(v,n=null){this.val=v;this.next=n;} }

// Reverse (Iterative)
function reverseList(head) {
  let prev=null, cur=head;
  while(cur) { const nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; }
  return prev;
}

// Midpoint (Fast/Slow)
function midpoint(head) {
  let s=head,f=head;
  while(f&&f.next) { s=s.next; f=f.next.next; }
  return s;
}

// Detect Cycle
function hasCycle(head) {
  let s=head,f=head;
  while(f&&f.next) { s=s.next; f=f.next.next; if(s===f) return true; }
  return false;
}

// Merge Two Sorted
function merge(l1,l2) {
  const dummy=new ListNode(0); let c=dummy;
  while(l1&&l2) {
    if(l1.val<=l2.val) { c.next=l1; l1=l1.next; }
    else { c.next=l2; l2=l2.next; }
    c=c.next;
  }
  c.next=l1||l2; return dummy.next;
}

// Remove Nth from End
function removeNthFromEnd(head,n) {
  const dummy=new ListNode(0,head);
  let f=dummy,s=dummy;
  for(let i=0;i<=n;i++) f=f.next;
  while(f) { s=s.next; f=f.next; }
  s.next=s.next.next;
  return dummy.next;
}`,
        problems: [
          {
            id: "ll-1",
            title: "Reverse Linked List",
            difficulty: "Easy",
            description: "Reverse a singly linked list. Return the new head.",
            examples: [{ input: "1→2→3→4→5", output: "5→4→3→2→1" }],
            hints: [
              "Iterative: use three pointers: prev, curr, next.",
              "Save next before overwriting curr.next.",
              "Advance all three, return prev at end.",
            ],
            solution:
              "prev=null, curr=head. Each step: save next, reverse link, advance.",
            code: `function reverseList(head) {
  let prev=null, cur=head;
  while(cur) {
    const nxt=cur.next;
    cur.next=prev;
    prev=cur;
    cur=nxt;
  }
  return prev;
}
// Time: O(n) | Space: O(1)`,
            whyInterviewers:
              "Must-know. Also asked recursively — know both versions.",
          },
          {
            id: "ll-2",
            title: "Detect Cycle Start",
            difficulty: "Medium",
            description:
              "Find the node where the cycle begins. Return null if no cycle.",
            examples: [
              { input: "3→2→0→-4→(back to 2)", output: "node with val=2" },
            ],
            hints: [
              "First, detect cycle with fast/slow.",
              "When they meet, reset one pointer to head.",
              "Move both one step at a time — they meet at cycle start.",
            ],
            solution:
              "Floyd's: after meeting point, reset slow to head, advance both by 1 → meet at cycle start.",
            code: `function detectCycle(head) {
  let s=head,f=head;
  while(f&&f.next) {
    s=s.next; f=f.next.next;
    if(s===f) { // cycle found
      s=head;
      while(s!==f) { s=s.next; f=f.next; }
      return s; // cycle start
    }
  }
  return null;
}`,
            whyInterviewers:
              "Floyd's cycle detection — mathematical elegance. Interviewers love the 'reset and walk' insight.",
          },
          {
            id: "ll-3",
            title: "Reorder List",
            difficulty: "Medium",
            description: "Reorder: L0→Ln→L1→Ln-1→L2→Ln-2→... in-place.",
            examples: [{ input: "1→2→3→4→5", output: "1→5→2→4→3" }],
            hints: [
              "Three steps: find midpoint, reverse second half, merge the two halves.",
              "All three use techniques you already know!",
            ],
            solution:
              "Find mid (fast/slow) → reverse second half → interleave.",
            code: `function reorderList(head) {
  // 1. Find mid
  let s=head,f=head;
  while(f.next&&f.next.next){s=s.next;f=f.next.next;}
  // 2. Reverse second half
  let prev=null,cur=s.next; s.next=null;
  while(cur){const nxt=cur.next;cur.next=prev;prev=cur;cur=nxt;}
  // 3. Merge
  let a=head,b=prev;
  while(b){const na=a.next,nb=b.next;a.next=b;b.next=na;a=na;b=nb;}
}`,
            whyInterviewers:
              "Combines three techniques into one clean solution. Tests synthesis.",
          },
        ],
      },
      {
        id: "trees",
        title: "Trees & BSTs",
        emoji: "🌳",
        summary:
          "Hierarchical structures — master DFS/BFS traversals and BST properties.",
        intuition: `A tree is a connected acyclic graph with a root. Binary trees: each node has ≤ 2 children.

Key insight: most tree problems are just DFS with different return values or state tracking. Master DFS and you've mastered trees.

BST property: left < node < right. This gives O(log n) search in balanced trees. Inorder traversal of BST always gives sorted output — this unlocks many problems.

Bottom-up DFS: solve children first, combine at root. Top-down DFS: pass state from root to children. Know which pattern fits each problem.`,
        diagram: `
  Binary Tree:
          1
         / \\
        2   3
       / \\   \\
      4   5   6

  Inorder  (L→root→R): 4,2,5,1,3,6
  Preorder (root→L→R): 1,2,4,5,3,6
  Postorder(L→R→root): 4,5,2,6,3,1
  Level order:         1,2,3,4,5,6

  BST:    5
         / \\
        3   7
       / \\ / \\
      2  4 6  8
  Inorder → [2,3,4,5,6,7,8] ← sorted!
        `,
        complexity: {
          common: [
            {
              name: "BST search/insert",
              desc: "O(h): balanced=O(log n), skewed=O(n)",
            },
            { name: "DFS all traversals", desc: "O(n) time, O(h) space" },
            {
              name: "BFS level order",
              desc: "O(n) time, O(w) space, w=max width",
            },
          ],
        },
        patterns: [
          "DFS returning value (bottom-up): height, diameter, LCA",
          "DFS with params (top-down): path sum, max depth",
          "BFS: level order, right side view, shortest path",
          "BST: inorder=sorted, validate with min/max bounds",
          "Serialize/deserialize using preorder + null markers",
        ],
        mistakes: [
          "Forgetting null check before accessing node.val",
          "BST validation: compare with parent only (wrong!). Must pass bounds.",
          "Forgetting BFS queue snapshots size before processing a level",
        ],
        realWorld: [
          "File system hierarchy",
          "HTML DOM",
          "Decision trees in ML",
        ],
        code: `class TreeNode{constructor(v,l=null,r=null){this.val=v;this.left=l;this.right=r;}}

// Max Depth
const maxDepth=r=>!r?0:1+Math.max(maxDepth(r.left),maxDepth(r.right));

// Validate BST
function isValidBST(root,lo=-Infinity,hi=Infinity) {
  if(!root) return true;
  if(root.val<=lo||root.val>=hi) return false;
  return isValidBST(root.left,lo,root.val)&&isValidBST(root.right,root.val,hi);
}

// LCA
function lca(root,p,q) {
  if(!root||root===p||root===q) return root;
  const L=lca(root.left,p,q), R=lca(root.right,p,q);
  return L&&R?root:L||R;
}

// Path Sum II (all root-to-leaf paths)
function pathSum(root,target) {
  const res=[];
  function dfs(node,rem,path) {
    if(!node) return;
    path.push(node.val);
    if(!node.left&&!node.right&&rem===node.val) res.push([...path]);
    dfs(node.left,rem-node.val,path);
    dfs(node.right,rem-node.val,path);
    path.pop();
  }
  dfs(root,target,[]);
  return res;
}

// Level Order BFS
function levelOrder(root) {
  if(!root) return [];
  const res=[],q=[root];
  while(q.length){
    const sz=q.length,lvl=[];
    for(let i=0;i<sz;i++){const n=q.shift();lvl.push(n.val);if(n.left)q.push(n.left);if(n.right)q.push(n.right);}
    res.push(lvl);
  }
  return res;
}`,
        problems: [
          {
            id: "tree-1",
            title: "Maximum Depth of Binary Tree",
            difficulty: "Easy",
            description: "Find the maximum depth of a binary tree.",
            examples: [{ input: "[3,9,20,null,null,15,7]", output: "3" }],
            hints: [
              "Base case: null node has depth 0.",
              "Depth = 1 + max(depth(left), depth(right))",
            ],
            solution:
              "Recursive: return 0 for null, 1+max(children) otherwise.",
            code: `const maxDepth=r=>!r?0:1+Math.max(maxDepth(r.left),maxDepth(r.right));
// Time: O(n) | Space: O(h)`,
            whyInterviewers:
              "Perfect warm-up. Every tree problem builds on this pattern.",
          },
          {
            id: "tree-2",
            title: "Diameter of Binary Tree",
            difficulty: "Medium",
            description:
              "Find the length of the longest path between any two nodes.",
            examples: [
              { input: "[1,2,3,4,5]", output: "3 (4→2→1→3 or 5→2→1→3)" },
            ],
            hints: [
              "Diameter through a node = left height + right height.",
              "Update a global max at each node.",
              "Return height (not diameter) to parent — that's what parent needs.",
            ],
            solution:
              "DFS: at each node compute diameter; return height upward.",
            code: `function diameterOfBinaryTree(root) {
  let max=0;
  function h(n) {
    if(!n) return 0;
    const l=h(n.left),r=h(n.right);
    max=Math.max(max,l+r);
    return 1+Math.max(l,r);
  }
  h(root); return max;
}`,
            whyInterviewers:
              "Classic 'return one thing, track another globally' pattern.",
          },
          {
            id: "tree-3",
            title: "Binary Tree Right Side View",
            difficulty: "Medium",
            description:
              "Return the values visible from the right side (rightmost node of each level).",
            examples: [{ input: "[1,2,3,null,5,null,4]", output: "[1,3,4]" }],
            hints: [
              "Process level by level (BFS).",
              "At each level, take the last element.",
              "Or DFS: visit right before left, record first-seen at each depth.",
            ],
            solution: "BFS: snapshot each level's last element.",
            code: `function rightSideView(root) {
  if(!root) return [];
  const res=[],q=[root];
  while(q.length){
    const sz=q.length; let last;
    for(let i=0;i<sz;i++){const n=q.shift();last=n.val;if(n.left)q.push(n.left);if(n.right)q.push(n.right);}
    res.push(last);
  }
  return res;
}`,
            whyInterviewers:
              "BFS level-processing pattern applied to a clever problem.",
          },
          {
            id: "tree-4",
            title: "Lowest Common Ancestor of BST",
            difficulty: "Medium",
            description: "Find the LCA of two nodes in a BST.",
            examples: [
              { input: "root=[6,2,8,0,4,7,9], p=2, q=8", output: "6" },
            ],
            hints: [
              "Use the BST property! No need to check all paths.",
              "If both p and q are less than node, go left.",
              "If both are greater, go right. Otherwise, current node is LCA.",
            ],
            solution: "Exploit BST property to eliminate subtrees in O(log n).",
            code: `function lcaBST(root,p,q) {
  if(p.val<root.val&&q.val<root.val) return lcaBST(root.left,p,q);
  if(p.val>root.val&&q.val>root.val) return lcaBST(root.right,p,q);
  return root;
}
// Time: O(h) | Space: O(h)`,
            whyInterviewers:
              "Tests BST property exploitation — much simpler than general binary tree LCA.",
          },
        ],
      },
    ],
  },

  // ══════════════════ WEEK 3 ══════════════════
  {
    week: 3,
    title: "Advanced Structures",
    color: "#dc2626",
    topics: [
      {
        id: "heaps",
        title: "Heaps / Priority Queues",
        emoji: "⛰️",
        summary:
          "Always-sorted-by-priority structure — O(log n) insert, O(1) peek, O(log n) extract.",
        intuition: `A heap is a complete binary tree where every parent satisfies the heap property: min-heap (parent ≤ children) or max-heap (parent ≥ children). The root is always the min/max.

The key property: you can always find and remove the min/max in O(log n). This is O(n) with arrays, O(log n) with heap.

Heap = priority queue in disguise. Classic use: "find the Kth largest/smallest" — just maintain a heap of size K.

JS has no built-in heap, so in interviews you either implement one or use the patterns verbally.`,
        diagram: `
  Min-Heap (array representation):
       1
      / \\
     3   2
    / \\ / \\
   7  4 5  6

  arr = [1, 3, 2, 7, 4, 5, 6]
  parent(i) = Math.floor((i-1)/2)
  leftChild(i) = 2*i + 1
  rightChild(i) = 2*i + 2

  Insert 0: add at end, bubble up
  [1,3,2,7,4,5,6,0] → 0 bubbles to root
  [0,3,1,7,4,5,6,2]

  ExtractMin: swap root with last, bubble down
        `,
        complexity: {
          common: [
            { name: "Peek min/max", desc: "O(1)" },
            { name: "Insert", desc: "O(log n)" },
            { name: "Extract min/max", desc: "O(log n)" },
            { name: "Build heap from array", desc: "O(n) — not O(n log n)!" },
          ],
        },
        patterns: [
          "Top-K elements → min-heap of size K",
          "K closest points → max-heap (evict farthest)",
          "Merge K sorted lists → min-heap of list heads",
          "Find median → two heaps (max-heap left, min-heap right)",
          "Task scheduling → max-heap of frequencies",
        ],
        mistakes: [
          "Using max-heap when min-heap is needed or vice versa",
          "Not checking heap size before extracting",
          "Thinking build-heap is O(n log n) — it's O(n)!",
        ],
        realWorld: [
          "Dijkstra's algorithm",
          "OS CPU scheduling",
          "Event-driven simulations",
        ],
        code: `// Min-Heap implementation
class MinHeap {
  constructor() { this.h = []; }
  size() { return this.h.length; }
  peek() { return this.h[0]; }
  push(val) {
    this.h.push(val);
    this._bubbleUp(this.h.length - 1);
  }
  pop() {
    const min = this.h[0];
    const last = this.h.pop();
    if (this.h.length) { this.h[0] = last; this._siftDown(0); }
    return min;
  }
  _bubbleUp(i) {
    while (i > 0) {
      const p = (i-1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p],this.h[i]] = [this.h[i],this.h[p]];
      i = p;
    }
  }
  _siftDown(i) {
    const n = this.h.length;
    while (true) {
      let min = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.h[l] < this.h[min]) min = l;
      if (r < n && this.h[r] < this.h[min]) min = r;
      if (min === i) break;
      [this.h[min],this.h[i]] = [this.h[i],this.h[min]];
      i = min;
    }
  }
}

// Top K Frequent using MinHeap
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n)||0)+1);
  const heap = new MinHeap();
  for (const [n, f] of freq) {
    heap.push([f, n]);
    if (heap.size() > k) heap.pop();
  }
  return heap.h.map(([,n]) => n);
}

// Merge K Sorted Lists
function mergeKLists(lists) {
  const heap = new MinHeap(); // compare by node val
  // ...simplified: push all node values, sort, rebuild
  const all = [];
  function collect(node) { while(node) { all.push(node.val); node=node.next; } }
  lists.forEach(collect);
  all.sort((a,b)=>a-b);
  // rebuild linked list from sorted values
  let dummy = {next:null}, cur = dummy;
  for (const v of all) { cur.next = {val:v,next:null}; cur=cur.next; }
  return dummy.next;
}`,
        problems: [
          {
            id: "heap-1",
            title: "Kth Largest Element",
            difficulty: "Medium",
            description: "Find the kth largest element in an unsorted array.",
            examples: [{ input: "[3,2,1,5,6,4], k=2", output: "5" }],
            hints: [
              "Sorting is O(n log n). Can you do O(n log k)?",
              "Use a min-heap of size k.",
              "If heap size exceeds k, remove the minimum. The heap's min is the Kth largest.",
            ],
            solution:
              "Min-heap of size k: push elements, eject minimum when size > k. Root = kth largest.",
            code: `// Using sort (simple): O(n log n)
function findKthLargest(nums, k) {
  return nums.sort((a,b)=>b-a)[k-1];
}

// Using min-heap: O(n log k)
function findKthLargestHeap(nums, k) {
  // Simulate with sorted array of k elements
  const heap = nums.slice(0,k).sort((a,b)=>a-b);
  for(let i=k;i<nums.length;i++) {
    if(nums[i]>heap[0]) {
      heap[0]=nums[i];
      heap.sort((a,b)=>a-b); // O(k log k) each — use real heap in practice
    }
  }
  return heap[0];
}`,
            whyInterviewers:
              "Top-K problems are ubiquitous. Tests heap vs sort decision.",
          },
          {
            id: "heap-2",
            title: "Find Median from Data Stream",
            difficulty: "Hard",
            description:
              "Design a data structure supporting addNum(num) and findMedian() in O(log n) / O(1).",
            examples: [
              {
                input: "add(1), add(2), median()=1.5, add(3), median()=2.0",
                output: "1.5, 2.0",
              },
            ],
            hints: [
              "Split stream into two halves: lower half (max-heap) and upper half (min-heap).",
              "Max of lower ≤ Min of upper always.",
              "Median = average of tops, or top of the larger heap.",
            ],
            solution:
              "Two heaps: max-heap for lower half, min-heap for upper half. Balance sizes to differ by at most 1.",
            code: `class MedianFinder {
  constructor() {
    this.lo = []; // max-heap (negate for JS)
    this.hi = []; // min-heap
  }
  addNum(num) {
    // Always push to lo first
    this.lo.push(-num); this.lo.sort((a,b)=>a-b); // max-heap via negation
    // Balance: largest of lo must go to hi
    this.hi.push(-this.lo.shift()); this.hi.sort((a,b)=>a-b);
    // Keep lo.length >= hi.length
    if(this.hi.length > this.lo.length) {
      this.lo.push(-this.hi.shift()); this.lo.sort((a,b)=>a-b);
    }
  }
  findMedian() {
    if(this.lo.length > this.hi.length) return -this.lo[0];
    return (-this.lo[0] + this.hi[0]) / 2;
  }
}`,
            whyInterviewers:
              "Advanced design problem. Two heaps maintaining a partition — pure elegance.",
          },
        ],
      },
      {
        id: "graphs",
        title: "Graphs (BFS & DFS)",
        emoji: "🕸️",
        summary:
          "Networks of nodes and edges — model relationships, paths, connectivity.",
        intuition: `Graphs generalize trees. A tree IS a connected, acyclic graph. Add cycles → general graph. Remove connectivity → disconnected graph.

BFS: queue-based level-by-level exploration. Perfect for shortest path in unweighted graphs. Guarantees minimum hops.

DFS: stack/recursion deep-first exploration. Perfect for connectivity, cycle detection, topological sort, all paths.

Grid problems are just graphs in disguise: each cell is a node, adjacent cells are edges. The "islands" pattern is the most common variant.`,
        diagram: `
  Graph: 0─1─2
               |  |
               3─4

  Adjacency List:         BFS from 0:
  0: [1]                  Level 0: [0]
  1: [0,2,3]              Level 1: [1]
  2: [1,4]                Level 2: [2,3]
  3: [1,4]                Level 3: [4]
  4: [2,3]

  DFS from 0:  0→1→2→4→3
        `,
        complexity: {
          common: [
            { name: "BFS/DFS", desc: "O(V+E) time, O(V) space" },
            { name: "Adjacency list storage", desc: "O(V+E)" },
          ],
        },
        patterns: [
          "BFS → shortest path unweighted",
          "DFS → components, cycle detection, all paths",
          "Islands → DFS/BFS on 2D grid",
          "Topological sort → DFS or Kahn's BFS",
          "Bipartite check → 2-coloring BFS",
        ],
        mistakes: [
          "Not marking visited → infinite loop in cyclic graphs",
          "Using DFS for shortest path (wrong!)",
          "Not iterating all nodes for disconnected graphs",
        ],
        realWorld: ["Social networks", "GPS navigation", "Dependency graphs"],
        code: `// BFS — Shortest Path
function bfs(graph, start, end) {
  const visited=new Set([start]), q=[[start,0]];
  while(q.length) {
    const [node,dist]=q.shift();
    if(node===end) return dist;
    for(const nbr of graph[node]||[]) {
      if(!visited.has(nbr)) { visited.add(nbr); q.push([nbr,dist+1]); }
    }
  }
  return -1;
}

// DFS — Connected Components
function countComponents(n, edges) {
  const adj=Array.from({length:n},()=>[]);
  for(const [a,b] of edges){adj[a].push(b);adj[b].push(a);}
  const vis=new Set(); let count=0;
  function dfs(v){vis.add(v);for(const u of adj[v])if(!vis.has(u))dfs(u);}
  for(let i=0;i<n;i++) if(!vis.has(i)){dfs(i);count++;}
  return count;
}

// Islands (Grid DFS)
function numIslands(grid) {
  let count=0;const R=grid.length,C=grid[0].length;
  function dfs(r,c){
    if(r<0||r>=R||c<0||c>=C||grid[r][c]==='0') return;
    grid[r][c]='0';
    dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);
  }
  for(let r=0;r<R;r++)for(let c=0;c<C;c++)if(grid[r][c]==='1'){dfs(r,c);count++;}
  return count;
}

// Topological Sort (Kahn's BFS)
function topoSort(n, prereqs) {
  const adj=Array.from({length:n},()=>[]);
  const indeg=new Array(n).fill(0);
  for(const [a,b] of prereqs){adj[b].push(a);indeg[a]++;}
  const q=[];
  for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i);
  const order=[];
  while(q.length){
    const v=q.shift();order.push(v);
    for(const u of adj[v]) if(--indeg[u]===0) q.push(u);
  }
  return order.length===n ? order : []; // empty = cycle exists
}`,
        problems: [
          {
            id: "g-1",
            title: "Clone Graph",
            difficulty: "Medium",
            description: "Deep clone a connected undirected graph.",
            examples: [
              {
                input: "adjList=[[2,4],[1,3],[2,4],[1,3]]",
                output: "deep copy of same graph",
              },
            ],
            hints: [
              "DFS/BFS traversal. For each node, create a clone.",
              "Use a map: originalNode → cloneNode to avoid revisiting.",
              "Clone neighbors recursively/iteratively.",
            ],
            solution:
              "DFS with a visited map: original → clone. Clone node, then recurse on neighbors.",
            code: `function cloneGraph(node) {
  if(!node) return null;
  const map=new Map();
  function dfs(n) {
    if(map.has(n)) return map.get(n);
    const clone={val:n.val,neighbors:[]};
    map.set(n,clone);
    for(const nbr of n.neighbors) clone.neighbors.push(dfs(nbr));
    return clone;
  }
  return dfs(node);
}`,
            whyInterviewers:
              "Tests deep copy with cycles. The map prevents infinite recursion.",
          },
          {
            id: "g-2",
            title: "Course Schedule II",
            difficulty: "Medium",
            description:
              "Return an ordering of courses to finish all, or [] if impossible.",
            examples: [
              {
                input: "n=4, prereqs=[[1,0],[2,0],[3,1],[3,2]]",
                output: "[0,1,2,3]",
              },
            ],
            hints: [
              "This is topological sort.",
              "If a cycle exists, return [].",
              "Use Kahn's algorithm: process nodes with 0 in-degree first.",
            ],
            solution:
              "Kahn's topological sort. If order has n nodes, valid; else cycle exists.",
            code: `function findOrder(n, prereqs) {
  const adj=Array.from({length:n},()=>[]);
  const indeg=new Array(n).fill(0);
  for(const [a,b] of prereqs){adj[b].push(a);indeg[a]++;}
  const q=[],order=[];
  for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i);
  while(q.length){
    const v=q.shift();order.push(v);
    for(const u of adj[v]) if(--indeg[u]===0) q.push(u);
  }
  return order.length===n?order:[];
}`,
            whyInterviewers:
              "Topological sort is tested constantly for dependency/prerequisite problems.",
          },
          {
            id: "g-3",
            title: "Pacific Atlantic Water Flow",
            difficulty: "Hard",
            description:
              "Find all cells from which water can flow to both Pacific and Atlantic oceans.",
            examples: [
              {
                input: "5×5 height matrix",
                output: "list of [row,col] coordinates",
              },
            ],
            hints: [
              "Reverse thinking: instead of water flowing down, flood FROM the oceans UP.",
              "BFS from Pacific edges, mark reachable cells.",
              "BFS from Atlantic edges separately.",
              "Return intersection.",
            ],
            solution: "Reverse BFS from both oceans. Intersection = answer.",
            code: `function pacificAtlantic(heights) {
  const R=heights.length,C=heights[0].length;
  const dirs=[[-1,0],[1,0],[0,-1],[0,1]];
  function bfs(starts) {
    const vis=new Set(starts.map(([r,c])=>r*C+c));
    const q=[...starts];
    while(q.length){
      const [r,c]=q.shift();
      for(const[dr,dc] of dirs){
        const nr=r+dr,nc=c+dc;
        if(nr>=0&&nr<R&&nc>=0&&nc<C&&!vis.has(nr*C+nc)&&heights[nr][nc]>=heights[r][c]){
          vis.add(nr*C+nc);q.push([nr,nc]);
        }
      }
    }
    return vis;
  }
  const pac=[],atl=[];
  for(let r=0;r<R;r++){pac.push([r,0]);atl.push([r,C-1]);}
  for(let c=0;c<C;c++){pac.push([0,c]);atl.push([R-1,c]);}
  const pVis=bfs(pac),aVis=bfs(atl);
  const res=[];
  for(let r=0;r<R;r++) for(let c=0;c<C;c++) if(pVis.has(r*C+c)&&aVis.has(r*C+c)) res.push([r,c]);
  return res;
}`,
            whyInterviewers:
              "Multi-source BFS + reverse thinking. Tests creative problem framing.",
          },
        ],
      },
      {
        id: "backtracking",
        title: "Backtracking",
        emoji: "↩️",
        summary:
          "Build solutions incrementally, abandoning partial solutions that can't lead to valid answers.",
        intuition: `Backtracking = DFS + pruning. You're exploring a decision tree: at each step, make a choice. If it leads to a dead end, UNDO the choice (backtrack) and try the next option.

Template (always the same):
1. If solution complete → add to results
2. For each valid choice:
   a. Make the choice
   b. Recurse
   c. Undo the choice (backtrack)

The three classic problems: subsets, permutations, combinations. Everything else is a variation.`,
        diagram: `
  Permutations([1,2,3]):
  start=[]
  ├─ [1]
  │   ├─ [1,2] → [1,2,3] ✓
  │   └─ [1,3] → [1,3,2] ✓
  ├─ [2]
  │   ├─ [2,1] → [2,1,3] ✓
  │   └─ [2,3] → [2,3,1] ✓
  └─ [3]
      ├─ [3,1] → [3,1,2] ✓
      └─ [3,2] → [3,2,1] ✓
        `,
        complexity: {
          common: [
            { name: "Subsets", desc: "O(2ⁿ) — each element included or not" },
            { name: "Permutations", desc: "O(n! × n)" },
            { name: "Combinations", desc: "O(C(n,k) × k)" },
          ],
        },
        patterns: [
          "Subsets → include/exclude each element",
          "Permutations → pick from remaining at each step",
          "Combinations → pick k from n, start index increases",
          "Sudoku/N-Queens → constraint checking at each cell",
          "Word search → grid DFS with visited marking",
        ],
        mistakes: [
          "Forgetting to undo (backtrack) before trying next choice",
          "Using index wrong — subsets need start index, permutations don't",
          "Not deep-copying when adding to results ([...current] not current)",
        ],
        realWorld: [
          "Puzzle solving",
          "Compiler parsing",
          "AI game trees (chess, Go)",
        ],
        code: `// Subsets
function subsets(nums) {
  const res=[];
  function bt(start,curr) {
    res.push([...curr]);
    for(let i=start;i<nums.length;i++) {
      curr.push(nums[i]); bt(i+1,curr); curr.pop();
    }
  }
  bt(0,[]); return res;
}

// Permutations
function permute(nums) {
  const res=[];
  function bt(curr,used) {
    if(curr.length===nums.length){res.push([...curr]);return;}
    for(let i=0;i<nums.length;i++) {
      if(used[i]) continue;
      used[i]=true; curr.push(nums[i]); bt(curr,used);
      curr.pop(); used[i]=false;
    }
  }
  bt([],new Array(nums.length).fill(false)); return res;
}

// Combinations
function combine(n,k) {
  const res=[];
  function bt(start,curr) {
    if(curr.length===k){res.push([...curr]);return;}
    for(let i=start;i<=n;i++) {
      curr.push(i); bt(i+1,curr); curr.pop();
    }
  }
  bt(1,[]); return res;
}

// N-Queens
function solveNQueens(n) {
  const res=[], board=Array.from({length:n},()=>new Array(n).fill('.'));
  const cols=new Set(),diag1=new Set(),diag2=new Set();
  function bt(r) {
    if(r===n){res.push(board.map(row=>row.join('')));return;}
    for(let c=0;c<n;c++) {
      if(cols.has(c)||diag1.has(r-c)||diag2.has(r+c)) continue;
      board[r][c]='Q';cols.add(c);diag1.add(r-c);diag2.add(r+c);
      bt(r+1);
      board[r][c]='.';cols.delete(c);diag1.delete(r-c);diag2.delete(r+c);
    }
  }
  bt(0); return res;
}`,
        problems: [
          {
            id: "bt-1",
            title: "Combination Sum",
            difficulty: "Medium",
            description:
              "Find all combinations of candidates that sum to target. Numbers can be reused.",
            examples: [
              {
                input: "candidates=[2,3,6,7], target=7",
                output: "[[2,2,3],[7]]",
              },
            ],
            hints: [
              "Backtracking. At each step: include current candidate (can reuse) or skip to next.",
              "Pass remaining target. Base case: remaining=0 (found!), remaining<0 (prune).",
              "Pass start index to avoid generating duplicate combinations.",
            ],
            solution:
              "Backtrack with start index. Include same element again (i, not i+1).",
            code: `function combinationSum(candidates, target) {
  const res=[];
  function bt(start,curr,rem) {
    if(rem===0){res.push([...curr]);return;}
    for(let i=start;i<candidates.length;i++) {
      if(candidates[i]>rem) continue;
      curr.push(candidates[i]);
      bt(i,curr,rem-candidates[i]); // i not i+1 (can reuse)
      curr.pop();
    }
  }
  bt(0,[],target); return res;
}`,
            whyInterviewers:
              "Core backtracking with reuse. Tests start-index management.",
          },
          {
            id: "bt-2",
            title: "Word Search",
            difficulty: "Medium",
            description:
              "Given a 2D board and a word, check if the word exists in the grid (adjacent cells, no revisiting).",
            examples: [
              {
                input: "board=[['A','B'],['C','D']], word='ABDC'",
                output: "true",
              },
            ],
            hints: [
              "For each cell matching word[0], start DFS.",
              "Mark cell as visited by temporarily changing it.",
              "Backtrack: restore cell after DFS returns.",
              "Base case: index === word.length → found!",
            ],
            solution:
              "DFS from each cell. Mark visited with '#', restore on backtrack.",
            code: `function exist(board, word) {
  const R=board.length,C=board[0].length;
  function dfs(r,c,i) {
    if(i===word.length) return true;
    if(r<0||r>=R||c<0||c>=C||board[r][c]!==word[i]) return false;
    const tmp=board[r][c]; board[r][c]='#'; // mark visited
    const found=dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1);
    board[r][c]=tmp; // backtrack
    return found;
  }
  for(let r=0;r<R;r++) for(let c=0;c<C;c++) if(dfs(r,c,0)) return true;
  return false;
}`,
            whyInterviewers:
              "Grid backtracking. The 'mark then restore' pattern is iconic.",
          },
        ],
      },
      {
        id: "greedy",
        title: "Greedy Algorithms",
        emoji: "💰",
        summary:
          "Make the locally optimal choice at each step, hoping it leads to a globally optimal solution.",
        intuition: `Greedy: at each step, make the best choice you can see right now, without looking back. Not every problem has an optimal greedy solution — you must PROVE greedy works (exchange argument) or use DP instead.

When does greedy work? When the problem has:
1. Optimal substructure: global optimum built from local optima
2. Greedy choice property: a greedy choice is always part of some optimal solution

Classic greedy signals: "minimum/maximum number of X", "schedule to maximize Y", "interval problems", "always take the best available option".`,
        diagram: `
  Activity Selection (greedy by end time):
  Activity: A  B  C  D  E
  Start:    1  3  0  5  8
  End:      2  4  6  7  9

  Sort by end time: A(2), B(4), C(6), D(7), E(9)
  Take A (end=2). B starts at 3 ≥ 2 → take B.
  C starts at 0 < 4 → skip. D starts at 5 ≥ 4 → take D.
  E starts at 8 ≥ 7 → take E.
  Result: {A,B,D,E} — maximum 4 activities!
        `,
        complexity: {
          common: [
            {
              name: "Most greedy solutions",
              desc: "O(n log n) — dominated by sorting",
            },
            { name: "Space", desc: "O(1) to O(n)" },
          ],
        },
        patterns: [
          "Interval scheduling → sort by end time, greedily take non-overlapping",
          "Jump game → track max reachable index",
          "Fractional knapsack → take highest value/weight ratio first",
          "Huffman coding → always merge two smallest frequencies",
        ],
        mistakes: [
          "Applying greedy when DP is needed (e.g., 0/1 knapsack)",
          "Wrong sort direction (start vs end time)",
          "Not proving the greedy choice is always safe",
        ],
        realWorld: [
          "Network routing (Dijkstra)",
          "Compression (Huffman)",
          "Task scheduling",
        ],
        code: `// Jump Game — can you reach the end?
function canJump(nums) {
  let maxReach=0;
  for(let i=0;i<nums.length;i++) {
    if(i>maxReach) return false; // can't reach this position
    maxReach=Math.max(maxReach, i+nums[i]);
  }
  return true;
}

// Jump Game II — minimum jumps
function jump(nums) {
  let jumps=0, currEnd=0, farthest=0;
  for(let i=0;i<nums.length-1;i++) {
    farthest=Math.max(farthest,i+nums[i]);
    if(i===currEnd) { jumps++; currEnd=farthest; }
  }
  return jumps;
}

// Meeting Rooms II — minimum rooms needed
function minMeetingRooms(intervals) {
  const starts=intervals.map(i=>i[0]).sort((a,b)=>a-b);
  const ends=intervals.map(i=>i[1]).sort((a,b)=>a-b);
  let rooms=0,j=0;
  for(let i=0;i<starts.length;i++) {
    if(starts[i]<ends[j]) rooms++;
    else j++;
  }
  return rooms;
}

// Gas Station — circular tour
function canCompleteCircuit(gas,cost) {
  let total=0,curr=0,start=0;
  for(let i=0;i<gas.length;i++) {
    total+=gas[i]-cost[i];
    curr+=gas[i]-cost[i];
    if(curr<0) { start=i+1; curr=0; }
  }
  return total>=0?start:-1;
}`,
        problems: [
          {
            id: "gr-1",
            title: "Jump Game",
            difficulty: "Medium",
            description: "Given jump lengths, can you reach the last index?",
            examples: [
              { input: "[2,3,1,1,4]", output: "true" },
              { input: "[3,2,1,0,4]", output: "false" },
            ],
            hints: [
              "Track the farthest reachable index as you scan.",
              "If current index exceeds farthest reachable, you're stuck.",
              "Greedy: at each step, update maxReach = max(maxReach, i + nums[i])",
            ],
            solution:
              "Single pass: maintain max reachable index. If i > maxReach at any point, return false.",
            code: `function canJump(nums) {
  let maxReach=0;
  for(let i=0;i<nums.length;i++) {
    if(i>maxReach) return false;
    maxReach=Math.max(maxReach,i+nums[i]);
  }
  return true;
}`,
            whyInterviewers:
              "Clean greedy intuition. Often followed by Jump Game II (min jumps).",
          },
          {
            id: "gr-2",
            title: "Non-overlapping Intervals",
            difficulty: "Medium",
            description:
              "Find minimum number of intervals to remove to make the rest non-overlapping.",
            examples: [
              {
                input: "[[1,2],[2,3],[3,4],[1,3]]",
                output: "1 (remove [1,3])",
              },
            ],
            hints: [
              "Equivalent: find maximum non-overlapping intervals, subtract from total.",
              "Sort by end time.",
              "Greedily take intervals that end earliest — leaves most room for future intervals.",
            ],
            solution:
              "Sort by end. Greedily keep non-overlapping intervals. Answer = total - kept.",
            code: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a,b)=>a[1]-b[1]);
  let kept=1,end=intervals[0][1];
  for(let i=1;i<intervals.length;i++) {
    if(intervals[i][0]>=end) { kept++; end=intervals[i][1]; }
  }
  return intervals.length-kept;
}`,
            whyInterviewers:
              "Interval scheduling greedy. Sort by end time is the key insight.",
          },
        ],
      },
    ],
  },

  // ══════════════════ WEEK 4 ══════════════════
  {
    week: 4,
    title: "Mastery",
    color: "#f59e0b",
    topics: [
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        emoji: "💡",
        summary:
          "Solve overlapping subproblems once, cache results — the most powerful interview technique.",
        intuition: `DP's fearsome reputation has a simple core: if you're solving the same subproblem multiple times, CACHE the result.

Two approaches:
1. Memoization (top-down): write recursive solution, add cache. Natural thinking.
2. Tabulation (bottom-up): fill table from base cases up. Usually faster.

Recognize DP: "count the ways", "find the max/min", "is it possible?", overlapping subproblems.

The framework:
1. Define state: dp[i] means...
2. Transition: dp[i] = f(dp[i-1], dp[i-2], ...)
3. Base cases
4. Evaluation order (bottom-up: which states need to be computed first?)`,
        diagram: `
  Coin Change: coins=[1,3,5], target=7
  dp[i] = min coins to make amount i

  dp[0]=0 (base)
  dp[1]=1 (one 1-coin)
  dp[2]=2 (two 1-coins)
  dp[3]=1 (one 3-coin)
  dp[4]=2 (3+1)
  dp[5]=1 (one 5-coin)
  dp[6]=2 (5+1 or 3+3)
  dp[7]=3 (5+1+1 or 3+3+1)

  Transition: dp[i] = min(dp[i-c]+1) for each coin c ≤ i
        `,
        complexity: {
          common: [
            {
              name: "Time",
              desc: "O(states × transition). Usually O(n²) or O(n×m)",
            },
            {
              name: "Space",
              desc: "O(states), often optimizable to O(1) or O(n)",
            },
          ],
        },
        patterns: [
          "1D: climbing stairs, house robber, decode ways",
          "2D: grid paths, LCS, edit distance",
          "Knapsack: coin change, partition equal subset",
          "String: palindromic substrings, word break",
          "State machine: stock with cooldown, best time variants",
        ],
        mistakes: [
          "Wrong state definition (hardest part of DP)",
          "Missing base cases",
          "Wrong fill order for 2D DP",
          "Not space-optimizing when only previous row needed",
        ],
        realWorld: [
          "Text autocomplete",
          "DNA sequence alignment",
          "Stock trading algorithms",
        ],
        code: `// House Robber (1D DP, O(1) space)
function rob(nums) {
  let p2=0,p1=0;
  for(const n of nums){const t=Math.max(p1,p2+n);p2=p1;p1=t;}
  return p1;
}

// Coin Change
function coinChange(coins,amount) {
  const dp=new Array(amount+1).fill(Infinity);
  dp[0]=0;
  for(let a=1;a<=amount;a++)
    for(const c of coins)
      if(c<=a) dp[a]=Math.min(dp[a],1+dp[a-c]);
  return dp[amount]===Infinity?-1:dp[amount];
}

// Longest Common Subsequence
function lcs(a,b) {
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?1+dp[i-1][j-1]:Math.max(dp[i-1][j],dp[i][j-1]);
  return dp[m][n];
}

// 0/1 Knapsack
function knapsack(weights,values,cap) {
  const dp=new Array(cap+1).fill(0);
  for(let i=0;i<weights.length;i++)
    for(let w=cap;w>=weights[i];w--)
      dp[w]=Math.max(dp[w],dp[w-weights[i]]+values[i]);
  return dp[cap];
}

// Unique Paths (2D DP)
function uniquePaths(m,n) {
  const dp=new Array(n).fill(1);
  for(let i=1;i<m;i++) for(let j=1;j<n;j++) dp[j]+=dp[j-1];
  return dp[n-1];
}`,
        problems: [
          {
            id: "dp-1",
            title: "Climbing Stairs",
            difficulty: "Easy",
            description:
              "You can climb 1 or 2 steps. How many distinct ways to reach the nth step?",
            examples: [{ input: "n=4", output: "5" }],
            hints: [
              "To reach step n: came from n-1 (1 step) or n-2 (2 steps).",
              "ways(n) = ways(n-1) + ways(n-2).",
              "This is Fibonacci! Base: ways(1)=1, ways(2)=2.",
            ],
            solution: "Fibonacci DP with O(1) space.",
            code: `function climbStairs(n) {
  if(n<=2) return n;
  let a=1,b=2;
  for(let i=3;i<=n;i++){const t=a+b;a=b;b=t;}
  return b;
}`,
            whyInterviewers:
              "Intro to DP thinking. Fibonacci disguised as a real problem.",
          },
          {
            id: "dp-2",
            title: "Longest Increasing Subsequence",
            difficulty: "Medium",
            description:
              "Find the length of the longest strictly increasing subsequence.",
            examples: [
              { input: "[10,9,2,5,3,7,101,18]", output: "4 ([2,3,7,101])" },
            ],
            hints: [
              "dp[i] = length of LIS ending at index i.",
              "For each i, check all j < i where nums[j] < nums[i].",
              "dp[i] = max(dp[j]+1) for valid j.",
            ],
            solution: "O(n²) DP or O(n log n) with patience sorting.",
            code: `function lengthOfLIS(nums) {
  const dp=new Array(nums.length).fill(1);
  let max=1;
  for(let i=1;i<nums.length;i++) {
    for(let j=0;j<i;j++)
      if(nums[j]<nums[i]) dp[i]=Math.max(dp[i],dp[j]+1);
    max=Math.max(max,dp[i]);
  }
  return max;
}
// O(n log n) version uses binary search on 'tails' array`,
            whyInterviewers:
              "Classic DP with an elegant O(n log n) variant that demonstrates depth.",
          },
          {
            id: "dp-3",
            title: "Word Break",
            difficulty: "Medium",
            description: "Can s be segmented into words from wordDict?",
            examples: [
              { input: 's="leetcode", dict=["leet","code"]', output: "true" },
            ],
            hints: [
              "dp[i] = can s[0..i-1] be segmented?",
              "dp[0] = true (empty string).",
              "dp[i] = any dp[j] where s[j..i-1] is in dict.",
            ],
            solution:
              "1D DP: dp[i] = any valid j < i where dp[j] is true and s[j..i] is in dict.",
            code: `function wordBreak(s, wordDict) {
  const set=new Set(wordDict);
  const dp=new Array(s.length+1).fill(false);
  dp[0]=true;
  for(let i=1;i<=s.length;i++)
    for(let j=0;j<i;j++)
      if(dp[j]&&set.has(s.slice(j,i))){dp[i]=true;break;}
  return dp[s.length];
}`,
            whyInterviewers:
              "DP + hash set combo. Teaches how to define state for string problems.",
          },
          {
            id: "dp-4",
            title: "Partition Equal Subset Sum",
            difficulty: "Medium",
            description:
              "Can the array be partitioned into two subsets with equal sum?",
            examples: [
              { input: "[1,5,11,5]", output: "true ([1,5,5] and [11])" },
            ],
            hints: [
              "Total must be even. Target = total/2.",
              "This is a 0/1 knapsack: can any subset sum to target?",
              "dp[j] = can we make sum j? Update backwards to avoid using item twice.",
            ],
            solution:
              "0/1 knapsack: dp[j] = can we make sum j? Iterate backwards.",
            code: `function canPartition(nums) {
  const sum=nums.reduce((a,b)=>a+b,0);
  if(sum%2) return false;
  const target=sum/2;
  const dp=new Array(target+1).fill(false);
  dp[0]=true;
  for(const n of nums)
    for(let j=target;j>=n;j--)
      dp[j]=dp[j]||dp[j-n];
  return dp[target];
}`,
            whyInterviewers:
              "0/1 knapsack disguised as a partition problem. Recognizing this wins the interview.",
          },
        ],
      },
      {
        id: "tries",
        title: "Tries",
        emoji: "🌐",
        summary:
          "Tree-based string index — O(L) search where L=word length, perfect for prefix problems.",
        intuition: `A trie (prefix tree) stores strings by their characters, sharing prefixes. Each path from root to a marked node represents a word.

vs Hash Map: hash map is O(L) lookup too, but trie also gives you:
- All words with a given prefix in O(L + results)
- Efficient prefix matching
- Space efficiency for shared prefixes

Classic use: autocomplete, spell check, IP routing tables.`,
        diagram: `
  Insert: ["car","card","care","cat","dog"]

         root
        /    \\
       c      d
       |      |
       a      o
      /|\\      |
     r  t    g ✓
    /|   \\
   d✓ e✓  ✓
   |
   ✓(card)

  ✓ marks end of word
        `,
        complexity: {
          common: [
            { name: "Insert", desc: "O(L) where L = word length" },
            { name: "Search / Prefix", desc: "O(L)" },
            { name: "Space", desc: "O(total characters × alphabet size)" },
          ],
        },
        patterns: [
          "Autocomplete → trie with getAllWords(prefix)",
          "Word search II → trie + backtracking on grid",
          "Replace words → trie for O(L) prefix lookup",
          "Design search system → trie + ranking",
        ],
        mistakes: [
          "Confusing isEnd with 'leaf node' (a word can be a prefix of another)",
          "Not handling character offset correctly (26-letter alphabet)",
          "Forgetting to handle empty string edge case",
        ],
        realWorld: [
          "Search engine autocomplete",
          "DNS routing",
          "Contact book search",
        ],
        code: `class TrieNode {
  constructor() { this.children={}; this.isEnd=false; }
}

class Trie {
  constructor() { this.root=new TrieNode(); }

  insert(word) {
    let node=this.root;
    for(const c of word) {
      if(!node.children[c]) node.children[c]=new TrieNode();
      node=node.children[c];
    }
    node.isEnd=true;
  }

  search(word) {
    let node=this.root;
    for(const c of word) {
      if(!node.children[c]) return false;
      node=node.children[c];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node=this.root;
    for(const c of prefix) {
      if(!node.children[c]) return false;
      node=node.children[c];
    }
    return true;
  }

  getAllWithPrefix(prefix) {
    let node=this.root;
    for(const c of prefix) {
      if(!node.children[c]) return [];
      node=node.children[c];
    }
    const res=[];
    function dfs(n,path) {
      if(n.isEnd) res.push(prefix.slice(0,-path.length)+path); // simplified
      for(const [c,child] of Object.entries(n.children)) dfs(child,path+c);
    }
    dfs(node,'');
    return res;
  }
}`,
        problems: [
          {
            id: "trie-1",
            title: "Implement Trie",
            difficulty: "Medium",
            description:
              "Implement a trie with insert, search, and startsWith methods.",
            examples: [
              {
                input:
                  'insert("apple"), search("apple"), search("app"), startsWith("app")',
                output: "true, false, true",
              },
            ],
            hints: [
              "Each node: 26 children (or object), isEnd flag.",
              "Insert: create nodes as needed.",
              "Search: traverse; return true only if isEnd.",
              "startsWith: traverse; return true if path exists (ignore isEnd).",
            ],
            solution: "Classic trie node with children map + isEnd flag.",
            code: `class Trie {
  constructor(){this.root={};}
  insert(w){let n=this.root;for(const c of w){if(!n[c])n[c]={};n=n[c];}n['#']=true;}
  search(w){let n=this.root;for(const c of w){if(!n[c])return false;n=n[c];}return!!n['#'];}
  startsWith(p){let n=this.root;for(const c of p){if(!n[c])return false;n=n[c];}return true;}
}`,
            whyInterviewers:
              "Design + data structure. Clean implementation matters.",
          },
          {
            id: "trie-2",
            title: "Word Search II",
            difficulty: "Hard",
            description:
              "Given a board and a list of words, find all words that exist in the board.",
            examples: [
              {
                input: "board, words=['oath','pea','eat','rain']",
                output: "['oath','eat']",
              },
            ],
            hints: [
              "Brute force: run Word Search for each word → O(words × 4^L × R×C).",
              "Build a trie of all words. One DFS traversal finds all.",
              "During DFS, follow the trie simultaneously — prune when prefix not in trie.",
            ],
            solution:
              "Trie + backtracking DFS. Prune when current path not in trie.",
            code: `function findWords(board, words) {
  const trie={},res=new Set();
  for(const w of words){let n=trie;for(const c of w){if(!n[c])n[c]={};n=n[c];}n['#']=w;}
  const R=board.length,C=board[0].length;
  function dfs(r,c,node) {
    if(r<0||r>=R||c<0||c>=C) return;
    const ch=board[r][c];if(!node[ch]) return;
    const next=node[ch];
    if(next['#']) res.add(next['#']);
    board[r][c]='#';
    dfs(r+1,c,next);dfs(r-1,c,next);dfs(r,c+1,next);dfs(r,c-1,next);
    board[r][c]=ch;
  }
  for(let r=0;r<R;r++) for(let c=0;c<C;c++) dfs(r,c,trie);
  return [...res];
}`,
            whyInterviewers:
              "Trie + DFS combination. Tests ability to combine two data structures.",
          },
        ],
      },
    ],
  },
];

export const WEEK4_EXTRA_TOPICS = [
  {
    id: "advanced-graphs",
    title: "Advanced Graphs",
    emoji: "🗺️",
    summary:
      "Dijkstra's shortest path, Union-Find for connectivity, Bellman-Ford for negative weights.",
    intuition: `Once you master basic BFS/DFS, the next level is weighted graphs and dynamic connectivity.

Dijkstra's algorithm: like BFS but with a min-heap instead of a queue. Always expand the closest unvisited node. Works only with non-negative edge weights — gives O((V+E) log V).

Union-Find (Disjoint Set Union): tracks which nodes are in the same component. Two operations — find (which group?) and union (merge groups). With path compression + union by rank: nearly O(1) per operation (amortized O(α(n)) — inverse Ackermann, effectively constant).

Bellman-Ford: handles negative weights. Relax all edges V-1 times. O(VE) but necessary when Dijkstra fails.`,
    diagram: `
  Dijkstra on weighted graph:
  A──1──B──4──D
  |         |
  2         1
  |         |
  C──1──────┘

  Start=A. Heap: [(0,A)]
  Process A: dist[B]=1, dist[C]=2
  Process B(d=1): dist[D]=1+4=5
  Process C(d=2): dist[D]=min(5,2+1)=3
  Process D(d=3): done.

  Union-Find:
  Initially: {0},{1},{2},{3},{4}
  union(0,1): {0,1},{2},{3},{4}
  union(1,2): {0,1,2},{3},{4}
  find(0)==find(2)? YES → same component!
    `,
    complexity: {
      common: [
        { name: "Dijkstra", desc: "O((V+E) log V) with min-heap" },
        { name: "Bellman-Ford", desc: "O(V·E) — handles negative weights" },
        {
          name: "Union-Find find/union",
          desc: "O(α(n)) ≈ O(1) with optimizations",
        },
        { name: "Floyd-Warshall (all pairs)", desc: "O(V³)" },
      ],
    },
    patterns: [
      "Dijkstra for shortest path in weighted graph",
      "Union-Find for dynamic connectivity, cycle detection in undirected graphs",
      "Kruskal's MST = sort edges + Union-Find",
      "Bellman-Ford when edges can be negative",
      "Detect negative cycle: if still improving after V-1 rounds",
    ],
    mistakes: [
      "Using Dijkstra with negative weights (undefined behavior)",
      "Not using visited set in Dijkstra (can reprocess nodes)",
      "Union-Find without path compression (O(n) per find)",
    ],
    realWorld: [
      "GPS navigation (Dijkstra)",
      "Network connectivity (Union-Find)",
      "Arbitrage detection (Bellman-Ford)",
    ],
    code: `// Dijkstra's Shortest Path
function dijkstra(graph, start) {
  // graph: Map<node, Array<[neighbor, weight]>>
  const dist = new Map();
  const heap = new MinHeap((a,b) => a[0]-b[0]); // [dist, node]

  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(start, 0);
  heap.push([0, start]);

  while (!heap.isEmpty()) {
    const [d, u] = heap.pop();
    if (d > dist.get(u)) continue; // stale entry

    for (const [v, w] of graph.get(u) || []) {
      const newDist = d + w;
      if (newDist < dist.get(v)) {
        dist.set(v, newDist);
        heap.push([newDist, v]);
      }
    }
  }
  return dist;
}

// Union-Find with path compression + union by rank
class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }
  find(x) {
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x]); // path compression
    return this.parent[x];
  }
  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false; // already connected
    // union by rank
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    this.components--;
    return true;
  }
  connected(x, y) { return this.find(x) === this.find(y); }
}

// Network Delay Time (Dijkstra application)
function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (let i = 1; i <= n; i++) graph.set(i, []);
  for (const [u, v, w] of times) graph.get(u).push([v, w]);

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  // Simple priority queue simulation
  const pq = [[0, k]];

  while (pq.length) {
    pq.sort((a,b) => a[0]-b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of graph.get(u)) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  const max = Math.max(...dist.slice(1));
  return max === Infinity ? -1 : max;
}`,
    problems: [
      {
        id: "ag-1",
        title: "Number of Connected Components",
        difficulty: "Medium",
        description:
          "Given n nodes and edges, count the number of connected components using Union-Find.",
        examples: [{ input: "n=5, edges=[[0,1],[1,2],[3,4]]", output: "2" }],
        hints: [
          "Initialize each node as its own component.",
          "For each edge, union the two nodes.",
          "Count remaining distinct roots (or track component count).",
        ],
        solution:
          "Union-Find: start with n components, decrement each time two different components merge.",
        code: `function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [a, b] of edges) uf.union(a, b);
  return uf.components;
}
// Time: O(α(n) × E) ≈ O(E) | Space: O(n)`,
        whyInterviewers:
          "Union-Find is the elegant O(1) solution. BFS/DFS also works but UF is more impressive.",
      },
      {
        id: "ag-2",
        title: "Network Delay Time",
        difficulty: "Medium",
        description:
          "Find how long it takes for a signal to reach all n nodes from node k.",
        examples: [
          { input: "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2", output: "2" },
        ],
        hints: [
          "Shortest path from k to all nodes — Dijkstra!",
          "Build adjacency list from times array.",
          "Answer = max of all shortest distances. If any node unreachable, return -1.",
        ],
        solution:
          "Dijkstra from k. If max distance is Infinity, return -1, else return max.",
        code: `function networkDelayTime(times, n, k) {
  const adj = Array.from({length:n+1}, ()=>[]);
  for(const [u,v,w] of times) adj[u].push([v,w]);
  const dist = new Array(n+1).fill(Infinity);
  dist[k]=0;
  const pq=[[0,k]]; // [dist, node]
  while(pq.length) {
    pq.sort((a,b)=>a[0]-b[0]);
    const [d,u]=pq.shift();
    if(d>dist[u]) continue;
    for(const [v,w] of adj[u]) {
      if(dist[u]+w<dist[v]) { dist[v]=dist[u]+w; pq.push([dist[v],v]); }
    }
  }
  const max=Math.max(...dist.slice(1));
  return max===Infinity?-1:max;
}`,
        whyInterviewers:
          "Classic Dijkstra application. Tests weighted graph thinking.",
      },
      {
        id: "ag-3",
        title: "Redundant Connection",
        difficulty: "Medium",
        description:
          "Find the edge that creates a cycle in an undirected graph. Return the last such edge.",
        examples: [{ input: "[[1,2],[1,3],[2,3]]", output: "[2,3]" }],
        hints: [
          "Process edges one by one. Before adding, check: are the two nodes already connected?",
          "If already connected, this edge creates a cycle — return it.",
          "Union-Find makes this check O(α(n)) per edge.",
        ],
        solution:
          "Union-Find: if find(u) === find(v) before union, this edge is redundant.",
        code: `function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [a, b] of edges) {
    if (!uf.union(a, b)) return [a, b]; // already connected = cycle
  }
}`,
        whyInterviewers:
          "Union-Find cycle detection. Very clean, very elegant.",
      },
    ],
  },
  {
    id: "system-design-ds",
    title: "Design Problems",
    emoji: "🏗️",
    summary:
      "LRU Cache, LFU Cache, Twitter feed — real-world data structure design under constraints.",
    intuition: `Design problems test your ability to combine data structures to meet O(1) constraints.

LRU Cache: "Least Recently Used" eviction. Key insight — you need O(1) get AND O(1) put AND O(1) eviction of the least recently used. A hash map alone can't do ordered eviction. A doubly-linked list alone can't do O(1) lookup. Together: HashMap (key→node) + Doubly Linked List (order) = O(1) everything.

LFU Cache: adds frequency tracking. Even harder: O(1) insert, O(1) get, O(1) evict least-frequently used. Solution: HashMap + frequency counter + per-frequency doubly linked list.

The pattern: whenever you need O(1) ordered access, think "hash map + linked list."`,
    diagram: `
  LRU Cache (capacity=3):
  
  HashMap: {a→node_a, b→node_b, c→node_c}
  DLL (most recent → least recent):
  HEAD ↔ [c|3] ↔ [a|1] ↔ [b|2] ↔ TAIL

  get(a): move node_a to front
  HEAD ↔ [a|1] ↔ [c|3] ↔ [b|2] ↔ TAIL

  put(d, 4): evict from tail (b), add d to front
  HEAD ↔ [d|4] ↔ [a|1] ↔ [c|3] ↔ TAIL
    `,
    complexity: {
      common: [
        { name: "LRU get/put", desc: "O(1) — hash map + doubly linked list" },
        {
          name: "LFU get/put",
          desc: "O(1) — hash map + frequency map + per-freq DLL",
        },
        { name: "Space", desc: "O(capacity)" },
      ],
    },
    patterns: [
      "HashMap + DLL for any ordered O(1) access problem",
      "Sentinel nodes (dummy head/tail) simplify DLL edge cases",
      "Frequency map for LFU: freq→OrderedSet of keys",
      "minFreq tracking for O(1) LFU eviction",
    ],
    mistakes: [
      "Using JS Map order for LRU — works but don't rely on it in interviews",
      "Forgetting to update HashMap when evicting from DLL",
      "Not handling capacity=0 edge case",
    ],
    realWorld: [
      "Browser cache",
      "CPU cache eviction",
      "Redis eviction policies",
    ],
    code: `// LRU Cache — O(1) get and put
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map(); // key → node
    // Doubly linked list with sentinel nodes
    this.head = {key:0, val:0, prev:null, next:null};
    this.tail = {key:0, val:0, prev:null, next:null};
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insertFront(node); // move to most-recently-used
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    } else if (this.map.size === this.cap) {
      // Evict least recently used (tail.prev)
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
    const node = {key, val:value, prev:null, next:null};
    this._insertFront(node);
    this.map.set(key, node);
  }
}

// Using JS Map (insertion-order trick) — simpler
class LRUCacheSimple {
  constructor(cap) { this.cap=cap; this.map=new Map(); }
  get(key) {
    if(!this.map.has(key)) return -1;
    const val=this.map.get(key);
    this.map.delete(key); this.map.set(key,val); // re-insert = most recent
    return val;
  }
  put(key,val) {
    if(this.map.has(key)) this.map.delete(key);
    else if(this.map.size===this.cap)
      this.map.delete(this.map.keys().next().value); // delete oldest
    this.map.set(key,val);
  }
}`,
    problems: [
      {
        id: "ds-1",
        title: "LRU Cache",
        difficulty: "Medium",
        description:
          "Design a data structure for LRU cache with O(1) get(key) and put(key, value). Evict the least recently used when over capacity.",
        examples: [
          {
            input:
              "capacity=2, put(1,1), put(2,2), get(1)→1, put(3,3), get(2)→-1",
            output: "1, -1 (2 was evicted)",
          },
        ],
        hints: [
          "O(1) lookup → HashMap. O(1) ordered access → Doubly Linked List.",
          "HashMap: key → DLL node. DLL: most recent at head, LRU at tail.",
          "get: find in map, move node to head. put: insert at head, evict tail if over capacity.",
        ],
        solution:
          "HashMap + Doubly Linked List with dummy head/tail sentinels.",
        code: `class LRUCache {
  constructor(cap) {
    this.cap=cap; this.map=new Map();
    this.head={next:null,prev:null}; this.tail={next:null,prev:null};
    this.head.next=this.tail; this.tail.prev=this.head;
  }
  _remove(n){n.prev.next=n.next;n.next.prev=n.prev;}
  _front(n){n.next=this.head.next;n.prev=this.head;this.head.next.prev=n;this.head.next=n;}
  get(k){
    if(!this.map.has(k))return -1;
    const n=this.map.get(k);this._remove(n);this._front(n);return n.v;
  }
  put(k,v){
    if(this.map.has(k))this._remove(this.map.get(k));
    else if(this.map.size===this.cap){const l=this.tail.prev;this._remove(l);this.map.delete(l.k);}
    const n={k,v};this._front(n);this.map.set(k,n);
  }
}
// Time: O(1) all ops | Space: O(capacity)`,
        whyInterviewers:
          "#1 design question asked at FAANG. Tests data structure combination thinking.",
      },
      {
        id: "ds-2",
        title: "Design Twitter",
        difficulty: "Medium",
        description:
          "Design a simplified Twitter: postTweet, getNewsFeed (10 most recent from user + followees), follow, unfollow.",
        examples: [
          {
            input:
              "postTweet(1,'t1'), postTweet(2,'t2'), follow(1,2), getNewsFeed(1) → ['t2','t1']",
            output: "['t2','t1']",
          },
        ],
        hints: [
          "Each user has a list of tweets (with timestamp) and a set of followees.",
          "getNewsFeed: collect tweets from user + followees, sort by timestamp, return top 10.",
          "Optimize with a min-heap of size 10 — no need to sort all tweets.",
        ],
        solution:
          "HashMap for user tweets + follow graph. Heap-merge all tweet lists for feed.",
        code: `class Twitter {
  constructor() {
    this.ts=0; this.tweets=new Map(); this.follows=new Map();
  }
  postTweet(userId,tweetId) {
    if(!this.tweets.has(userId)) this.tweets.set(userId,[]);
    this.tweets.get(userId).push([this.ts++, tweetId]);
  }
  getNewsFeed(userId) {
    const people=[userId,...(this.follows.get(userId)||new Set())];
    const all=[];
    for(const u of people) for(const t of this.tweets.get(u)||[]) all.push(t);
    return all.sort((a,b)=>b[0]-a[0]).slice(0,10).map(t=>t[1]);
  }
  follow(f,e){if(!this.follows.has(f))this.follows.set(f,new Set());this.follows.get(f).add(e);}
  unfollow(f,e){this.follows.get(f)?.delete(e);}
}`,
        whyInterviewers:
          "OOP + data structure integration. Common system design starter question.",
      },
      {
        id: "ds-3",
        title: "Insert Delete GetRandom O(1)",
        difficulty: "Medium",
        description:
          "Design a set supporting insert, remove, and getRandom — all in O(1).",
        examples: [
          {
            input:
              "insert(1), insert(2), getRandom()→1or2, remove(1), getRandom()→2",
            output: "valid",
          },
        ],
        hints: [
          "O(1) insert/remove → HashMap. O(1) random → Array.",
          "Store values in array. HashMap: value → index in array.",
          "Remove trick: swap with last element, then pop. Update map accordingly.",
        ],
        solution:
          "Array + HashMap: O(1) everything. Swap-with-last for O(1) remove.",
        code: `class RandomizedSet {
  constructor() { this.map=new Map(); this.arr=[]; }
  insert(val) {
    if(this.map.has(val)) return false;
    this.arr.push(val); this.map.set(val,this.arr.length-1);
    return true;
  }
  remove(val) {
    if(!this.map.has(val)) return false;
    const idx=this.map.get(val), last=this.arr.at(-1);
    this.arr[idx]=last; this.map.set(last,idx);
    this.arr.pop(); this.map.delete(val);
    return true;
  }
  getRandom() { return this.arr[Math.floor(Math.random()*this.arr.length)]; }
}
// Time: O(1) all ops | Space: O(n)`,
        whyInterviewers:
          "Array + hash map trick for O(1) remove from arbitrary position — elegant design.",
      },
    ],
  },
  {
    id: "advanced-dp",
    title: "Advanced DP Patterns",
    emoji: "🔮",
    summary:
      "State machines, interval DP, digit DP — the patterns that separate good from great.",
    intuition: `After mastering 1D/2D DP, the next level is recognizing complex state definitions.

State machine DP: model the problem as states you transition between. Stock trading problems are the classic: states = "holding" vs "not holding" vs "cooldown". Transitions = buy, sell, wait.

Interval DP: dp[i][j] = answer for subarray/interval [i,j]. Build from small intervals to large. Classic: matrix chain multiplication, burst balloons, palindrome partitioning.

Digit DP: count numbers in [lo,hi] with some property. State = (position, tight, ...). Used in competitive programming but occasionally in interviews.

The meta-skill: when you see a DP problem, ask:
1. What ARE the states? (What varies?)
2. What ARE the transitions? (How do states connect?)
3. What ARE the base cases?`,
    diagram: `
  State Machine DP — Best Stock Profit with Cooldown:

  States: HOLD, SOLD, REST
  HOLD → sell → SOLD
  SOLD → wait → REST
  REST → buy → HOLD
  HOLD → wait → HOLD
  REST → wait → REST

  dp[i][HOLD] = max(dp[i-1][HOLD], dp[i-1][REST] - prices[i])
  dp[i][SOLD] = dp[i-1][HOLD] + prices[i]
  dp[i][REST] = max(dp[i-1][REST], dp[i-1][SOLD])

  Interval DP — Burst Balloons:
  dp[i][j] = max coins from bursting all balloons between i and j
  Try each k as the LAST balloon to burst in [i,j]
    `,
    complexity: {
      common: [
        {
          name: "State Machine DP",
          desc: "O(n × states) — linear with constant states",
        },
        { name: "Interval DP", desc: "O(n³) — 3 nested loops over intervals" },
        { name: "String DP", desc: "O(n²) — palindromes, partitioning" },
      ],
    },
    patterns: [
      "State machine: define all states, write transitions clearly",
      "Interval DP: try every possible 'last operation' in the interval",
      "String DP: expand from center (palindromes), or left-right sweep",
      "Bitmask DP: exponential states but feasible for small n (≤20)",
    ],
    mistakes: [
      "State machine: not drawing the state diagram first",
      "Interval DP: choosing first instead of last operation",
      "Not initializing boundary conditions for interval DP (empty intervals)",
    ],
    realWorld: [
      "Compiler optimization (interval DP)",
      "Financial trading strategies (state machine)",
      "NLP parsing (CYK algorithm)",
    ],
    code: `// State Machine DP — Best Time with Cooldown
function maxProfitCooldown(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevHold = hold, prevSold = sold, prevRest = rest;
    hold = Math.max(prevHold, prevRest - p); // keep or buy
    sold = prevHold + p;                      // sell
    rest = Math.max(prevRest, prevSold);      // do nothing or come off cooldown
  }
  return Math.max(sold, rest);
}

// Burst Balloons (Interval DP)
function maxCoins(nums) {
  const arr = [1, ...nums, 1]; // padding
  const n = arr.length;
  const dp = Array.from({length:n}, () => new Array(n).fill(0));

  // length of interval
  for (let len = 2; len < n; len++) {
    for (let l = 0; l < n - len; l++) {
      const r = l + len;
      for (let k = l+1; k < r; k++) {
        // k is the LAST balloon burst in (l,r)
        dp[l][r] = Math.max(dp[l][r],
          arr[l]*arr[k]*arr[r] + dp[l][k] + dp[k][r]);
      }
    }
  }
  return dp[0][n-1];
}

// Palindrome Partitioning II (min cuts)
function minCut(s) {
  const n = s.length;
  // isPalin[i][j] = is s[i..j] palindrome?
  const isPalin = Array.from({length:n}, () => new Array(n).fill(false));
  for (let i = n-1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      isPalin[i][j] = s[i]===s[j] && (j-i<=2 || isPalin[i+1][j-1]);
    }
  }
  const dp = new Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    if (isPalin[0][i]) { dp[i]=0; continue; }
    for (let j = 1; j <= i; j++)
      if (isPalin[j][i]) dp[i] = Math.min(dp[i], 1 + dp[j-1]);
  }
  return dp[n-1];
}

// Edit Distance (classic 2D DP)
function editDistance(word1, word2) {
  const m=word1.length, n=word2.length;
  const dp = Array.from({length:m+1}, (_,i) => Array.from({length:n+1}, (_,j) => i||j));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++) {
    if (word1[i-1]===word2[j-1]) dp[i][j]=dp[i-1][j-1];
    else dp[i][j]=1+Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
  }
  return dp[m][n];
}`,
    problems: [
      {
        id: "adp-1",
        title: "Best Time to Buy Stock with Cooldown",
        difficulty: "Medium",
        description:
          "Max profit with cooldown: after selling, you must skip one day before buying again.",
        examples: [
          { input: "[1,2,3,0,2]", output: "3 (buy→sell→cooldown→buy→sell)" },
        ],
        hints: [
          "Define 3 states: HOLD (own stock), SOLD (just sold, cooldown), REST (can buy).",
          "Transitions: HOLD→sell→SOLD, SOLD→REST, REST→buy→HOLD",
          "dp transition: hold=max(hold, rest-price), sold=hold+price, rest=max(rest,sold)",
        ],
        solution: "State machine DP with 3 states: hold, sold, rest.",
        code: `function maxProfit(prices) {
  let hold=-Infinity, sold=0, rest=0;
  for(const p of prices) {
    [hold, sold, rest] = [
      Math.max(hold, rest-p),
      hold+p,
      Math.max(rest, sold)
    ];
  }
  return Math.max(sold, rest);
}
// Time: O(n) | Space: O(1)`,
        whyInterviewers:
          "State machine DP. The ability to model states and transitions shows maturity.",
      },
      {
        id: "adp-2",
        title: "Edit Distance",
        difficulty: "Hard",
        description:
          "Find minimum operations (insert, delete, replace) to convert word1 to word2.",
        examples: [
          { input: '"horse","rorse"', output: "1 (replace h→r)" },
          { input: '"intention","execution"', output: "5" },
        ],
        hints: [
          "dp[i][j] = min ops to convert word1[0..i-1] to word2[0..j-1]",
          "If chars match: dp[i][j] = dp[i-1][j-1] (no op needed)",
          "If not: dp[i][j] = 1 + min(dp[i-1][j-1] replace, dp[i-1][j] delete, dp[i][j-1] insert)",
        ],
        solution: "2D DP. Classic string transformation problem.",
        code: `function minDistance(w1, w2) {
  const m=w1.length,n=w2.length;
  const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i||j));
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
    dp[i][j]=w1[i-1]===w2[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]);
  return dp[m][n];
}
// Time: O(m×n) | Space: O(m×n) → optimizable to O(n)`,
        whyInterviewers:
          "One of the most famous DP problems. Tests 2D DP mastery.",
      },
      {
        id: "adp-3",
        title: "Distinct Subsequences",
        difficulty: "Hard",
        description:
          "Count distinct ways to form string t as a subsequence of string s.",
        examples: [{ input: 's="rabbbit", t="rabbit"', output: "3" }],
        hints: [
          "dp[i][j] = number of ways to form t[0..j-1] using s[0..i-1]",
          "If s[i-1] != t[j-1]: dp[i][j] = dp[i-1][j] (skip s[i-1])",
          "If s[i-1] == t[j-1]: dp[i][j] = dp[i-1][j] + dp[i-1][j-1]",
        ],
        solution:
          "2D DP counting the ways. Skip or use each matching character.",
        code: `function numDistinct(s, t) {
  const m=s.length,n=t.length;
  const dp=Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=1; // empty t always matches
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++) {
    dp[i][j]=dp[i-1][j]; // skip s[i]
    if(s[i-1]===t[j-1]) dp[i][j]+=dp[i-1][j-1]; // use s[i]
  }
  return dp[m][n];
}`,
        whyInterviewers:
          "Advanced string DP. Tests ability to define 'counting subsequences' state.",
      },
    ],
  },
  {
    id: "string-algorithms",
    title: "String Algorithms",
    emoji: "📝",
    summary:
      "KMP, Rabin-Karp, Z-algorithm — efficient pattern matching and string processing.",
    intuition: `Strings deserve special attention because naive approaches (O(n×m) substring matching) are often too slow.

KMP (Knuth-Morris-Pratt): never re-examines characters. Build a "failure function" (LPS array) that tells you how far to jump back when a mismatch occurs. O(n+m) search.

Rabin-Karp: hash the pattern, then slide a rolling hash over the text. O(n+m) average, O(nm) worst (hash collisions). Good for multiple pattern search.

Z-algorithm: Z[i] = length of longest substring starting at i that matches a prefix of the string. Elegant and O(n). Useful for all occurrence finding.

In interviews, KMP prefix function is most commonly asked. Practice building the LPS array.`,
    diagram: `
  KMP LPS Array:
  pattern = "AABAAB"
  lps:      [0,1,0,1,2,3]

  lps[i] = length of longest proper prefix
           that is also a suffix of pattern[0..i]

  "AABAAB"
   ↑↑ prefix "AA" = suffix "AA" → lps[4]=2
   ↑↑↑ prefix "AAB" = suffix "AAB" → lps[5]=3

  KMP Search skips re-checking using lps:
  text:    AABABAABAAB
  pattern: AABAAB
  mismatch at pos 4? Don't restart! Jump to lps[3]=1.
    `,
    complexity: {
      common: [
        { name: "KMP search", desc: "O(n + m) — never re-examines characters" },
        { name: "Rabin-Karp", desc: "O(n + m) avg, O(nm) worst" },
        { name: "Z-algorithm", desc: "O(n) — builds Z array in single pass" },
        {
          name: "Naive search",
          desc: "O(n×m) — always falls back to this mentally",
        },
      ],
    },
    patterns: [
      "KMP: build LPS array, use it to skip failed positions",
      "Rolling hash for sliding window string comparison",
      "Palindrome expansion from center: O(n²) all palindromes",
      "Manacher's algorithm: O(n) all palindromes",
    ],
    mistakes: [
      "Building LPS naively — must use the DP approach",
      "Off-by-one in pattern matching indices",
      "Forgetting to handle hash collisions in Rabin-Karp",
    ],
    realWorld: [
      "DNA sequence search",
      "Grep/text editors",
      "Plagiarism detection",
    ],
    code: `// KMP — Pattern Search in O(n+m)
function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern);
  const results = [];
  let i=0, j=0; // i=text, j=pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) { i++; j++; }
    if (j === pattern.length) {
      results.push(i - j); // found at index i-j
      j = lps[j-1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      j === 0 ? i++ : j = lps[j-1];
    }
  }
  return results;
}

function buildLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len=0, i=1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) { lps[i++] = ++len; }
    else if (len > 0) len = lps[len-1];
    else lps[i++] = 0;
  }
  return lps;
}

// Longest Palindromic Substring — expand from center
function longestPalindrome(s) {
  let start=0, maxLen=1;
  function expand(l, r) {
    while (l>=0 && r<s.length && s[l]===s[r]) { l--; r++; }
    if (r-l-1 > maxLen) { start=l+1; maxLen=r-l-1; }
  }
  for (let i=0; i<s.length; i++) {
    expand(i,i);   // odd length
    expand(i,i+1); // even length
  }
  return s.slice(start, start+maxLen);
}

// Repeated Substring Pattern
function repeatedSubstringPattern(s) {
  // Trick: if s+s (minus first and last char) contains s,
  // then s has a repeated pattern
  return (s+s).slice(1,-1).includes(s);
  // This works because KMP LPS tells us if a period exists
}

// Encode/Decode Strings
function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}
function decode(str) {
  const res=[]; let i=0;
  while(i<str.length) {
    let j=i;
    while(str[j]!=='#') j++;
    const len=parseInt(str.slice(i,j));
    res.push(str.slice(j+1,j+1+len));
    i=j+1+len;
  }
  return res;
}`,
    problems: [
      {
        id: "str-1",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        description: "Find the longest palindromic substring in s.",
        examples: [{ input: '"babad"', output: '"bab" or "aba"' }],
        hints: [
          "Every palindrome expands from a center.",
          "For each position i, expand outward as long as characters match.",
          "Handle both odd-length (center=i) and even-length (center=i,i+1) cases.",
        ],
        solution: "Expand-from-center: O(n²) time, O(1) space.",
        code: `function longestPalindrome(s) {
  let res="";
  for(let i=0;i<s.length;i++) {
    for(const [l,r] of [[i,i],[i,i+1]]) {
      let lo=l,hi=r;
      while(lo>=0&&hi<s.length&&s[lo]===s[hi]){lo--;hi++;}
      if(hi-lo-1>res.length) res=s.slice(lo+1,hi);
    }
  }
  return res;
}
// Time: O(n²) | Space: O(1)`,
        whyInterviewers:
          "Classic. Tests expand-from-center pattern and handling odd/even cases.",
      },
      {
        id: "str-2",
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        description:
          "Design encode/decode for a list of strings that can contain any character.",
        examples: [
          {
            input: '["hello","world"]',
            output: "encode then decode returns original",
          },
        ],
        hints: [
          "Can't use a simple delimiter — strings might contain it.",
          "Prefix each string with its length + a separator.",
          "Decode: read length, skip separator, read that many chars.",
        ],
        solution: "Length-prefixed encoding: len#string. Deterministic decode.",
        code: `function encode(strs) { return strs.map(s=>s.length+'#'+s).join(''); }
function decode(s) {
  const res=[]; let i=0;
  while(i<s.length) {
    let j=i; while(s[j]!=='#') j++;
    const len=+s.slice(i,j);
    res.push(s.slice(j+1,j+1+len));
    i=j+1+len;
  }
  return res;
}`,
        whyInterviewers:
          "Protocol design thinking. Tests if you understand delimiter edge cases.",
      },
      {
        id: "str-3",
        title: "Find All Anagrams in String",
        difficulty: "Medium",
        description: "Find all start indices of p's anagrams in s.",
        examples: [{ input: 's="cbaebabacd", p="abc"', output: "[0,6]" }],
        hints: [
          "Fixed-size window = p.length.",
          "Frequency map of p. Slide window, track matches.",
          "formed counter: how many chars have matching frequency?",
        ],
        solution: "Sliding window of fixed size |p| + frequency maps.",
        code: `function findAnagrams(s, p) {
  const need=new Array(26).fill(0), have=new Array(26).fill(0);
  const a="a".charCodeAt(0), res=[];
  for(const c of p) need[c.charCodeAt(0)-a]++;
  for(let i=0;i<s.length;i++) {
    have[s.charCodeAt(i)-a]++;
    if(i>=p.length) have[s.charCodeAt(i-p.length)-a]--;
    if(need.join()===have.join()) res.push(i-p.length+1);
  }
  return res;
}`,
        whyInterviewers:
          "Sliding window + frequency arrays. Extremely common pattern.",
      },
    ],
  },
];
