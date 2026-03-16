// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EDITORIALS: Record<string, any> = {
  "arr-1": {
    approach: "Hash Map Lookup",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `The brute force checks every pair → O(n²). The insight: for each number x, you need (target - x). Instead of scanning for it, store previously seen numbers in a hash map.

Walk through [2, 7, 11, 15] with target 9:
• i=0: x=2, need 7, map is empty → store {2:0}
• i=1: x=7, need 2, map has 2 at index 0 → return [0, 1] ✓

Why this works: by the time you reach element i, all elements before it are in the map. If the complement exists earlier, you'll find it. One pass, O(n).`,
    keyInsight:
      "Replace O(n) search with O(1) hash lookup. This 'complement lookup' pattern appears in dozens of problems.",
  },
  "arr-2": {
    approach: "Kadane's Algorithm (Greedy/DP)",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `At each position, you make a decision: extend the current subarray, or start a new one here.

If currentSum + arr[i] < arr[i], the running sum has gone negative — it's dragging you down. Start fresh from arr[i].

Trace [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
• curr=-2, best=-2
• i=1: max(1, -2+1)=1, curr=1, best=1
• i=2: max(-3, 1-3)=-2, curr=-2, best=1
• i=3: max(4, -2+4)=4, curr=4, best=4
• i=4: max(-1, 4-1)=3, curr=3, best=4
• i=5: max(2, 3+2)=5, curr=5, best=5
• i=6: max(1, 5+1)=6, curr=6, best=6 ✓`,
    keyInsight:
      "The decision at each step: 'Am I better off extending or restarting?' This greedy choice gives the global optimum.",
  },
  "arr-3": {
    approach: "Two-Pass Prefix/Suffix Products",
    complexity: "Time: O(n) · Space: O(1) extra",
    walkthrough: `out[i] = (product of everything left of i) × (product of everything right of i).

Pass 1 (left products): walk left→right, accumulate running product.
Pass 2 (right products): walk right→left, multiply each position by running right product.

Trace [1, 2, 3, 4]:
• Pass 1: out = [1, 1, 2, 6] (running left product)
• Pass 2: running right starts at 1
  - i=3: out[3]=6×1=6, right=4
  - i=2: out[2]=2×4=8, right=12
  - i=1: out[1]=1×12=12, right=24
  - i=0: out[0]=1×24=24
• Result: [24, 12, 8, 6] ✓`,
    keyInsight:
      "When division is banned, decompose into prefix and suffix products. Two-pass tricks show up everywhere.",
  },
  "tp-1": {
    approach: "Two Pointers (Opposite Ends)",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `On SORTED input, start with widest container (left=0, right=end). The shorter wall limits the water. Moving the taller wall can only decrease width without increasing height. So always move the shorter wall — it's the only way to potentially find a taller one.

Trace [1,8,6,2,5,4,8,3,7]:
• L=0(h=1), R=8(h=7): area=1×8=8, move L (shorter)
• L=1(h=8), R=8(h=7): area=7×7=49, move R
• L=1(h=8), R=7(h=3): area=3×6=18, move R
... max area = 49`,
    keyInsight:
      "When both ends can contribute, greedily move the weaker side. Can't lose — the weaker side is the bottleneck.",
  },
  "sw-1": {
    approach: "Variable Sliding Window + Hash Set",
    complexity: "Time: O(n) · Space: O(min(n, alphabet))",
    walkthrough: `Maintain a window [left, right] where all characters are unique. Expand right. When a duplicate enters, shrink from left until unique again.

Trace "abcabcbb":
• Window "a" → "ab" → "abc" (len=3)
• 'a' duplicates → shrink: remove 'a', window="bca" (len=3)
• 'b' duplicates → shrink: remove 'b', window="cab" (len=3)
• 'c' duplicates → shrink past 'c', window="bc" then "b"
• max length = 3 ✓

Use a Set (or Map with last-seen index for jump optimization).`,
    keyInsight:
      "Variable window: expand until invalid, shrink until valid. Track validity with a Set.",
  },
  "hm-1": {
    approach: "Frequency Counter + Sorting",
    complexity: "Time: O(n) · Space: O(1) — only 26 letters",
    walkthrough: `Two strings are anagrams if they have identical character frequencies.

Approach 1: Sort both strings and compare. O(n log n).
Approach 2: Count character frequencies. Increment for s, decrement for t. If all counts are 0 → anagram. O(n).

The frequency approach is faster and demonstrates hash map thinking. Use an array of 26 (for lowercase letters) as the "map".`,
    keyInsight:
      "Anagram = same frequency distribution. Counting is O(n) vs sorting O(n log n).",
  },
  m3: {
    approach: "Bottom-Up DP (Unbounded Knapsack)",
    complexity: "Time: O(amount × coins) · Space: O(amount)",
    walkthrough: `dp[i] = fewest coins to make amount i. Base: dp[0] = 0.

For each amount from 1 to target:
  For each coin: if coin ≤ amount, dp[amount] = min(dp[amount], dp[amount - coin] + 1)

Trace coins=[1,2,5], amount=11:
• dp[1]=1(1), dp[2]=1(2), dp[3]=2(2+1), dp[4]=2(2+2), dp[5]=1(5)
• dp[6]=2(5+1), dp[7]=2(5+2), dp[10]=2(5+5), dp[11]=3(5+5+1) ✓`,
    keyInsight:
      "Unbounded knapsack: try each coin at each amount. dp builds from smaller amounts to larger.",
  },
  "arr-4": {
    approach: "Two Pointers",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Water at position i = min(maxLeft, maxRight) - height[i]. The two-pointer approach: process the shorter side first, because the shorter side is the bottleneck.

left=0, right=end. Track leftMax and rightMax.
• If height[left] < height[right]: water at left = leftMax - height[left]. Move left.
• Else: water at right = rightMax - height[right]. Move right.

Why process the shorter side? If left wall is shorter, we KNOW the water level at left is determined by leftMax (right side is at least as tall). Safe to compute and move on.`,
    keyInsight:
      "Process the bottleneck side. The shorter wall determines the water level — the taller side can't help until you move past the short one.",
  },
  "tp-2": {
    approach: "Two Pointers (Opposite Ends)",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Area = min(height[left], height[right]) × (right - left). Start with widest container.

The greedy insight: moving the TALLER pointer can only decrease area (width shrinks, height can't increase beyond the shorter wall). So always move the SHORTER pointer — it's the only way to potentially find a taller wall.`,
    keyInsight:
      "Move the weaker pointer. The shorter wall is the bottleneck — keeping it can never improve the answer.",
  },
  "tp-3": {
    approach: "Sort + Two Pointers + Dedup",
    complexity: "Time: O(n²) · Space: O(1)",
    walkthrough: `Sort the array. Fix element i, then two-pointer scan for pairs that sum to -nums[i].

Key: skip duplicates at all three levels.
• Skip duplicate i: while (nums[i] === nums[i-1]) i++
• Skip duplicate left: while (nums[left] === nums[left-1]) left++
• Skip duplicate right: while (nums[right] === nums[right+1]) right--

This eliminates duplicate triplets without using a Set.`,
    keyInsight:
      "Sort first, then reduce to Two Sum. Deduplication by skipping identical adjacent values.",
  },
  "sw-2": {
    approach: "Sliding Window + Hash Map",
    complexity: "Time: O(n) · Space: O(min(n, charset))",
    walkthrough: `Maintain window [left, right]. Use a Map storing {char: lastSeenIndex}. When you see a duplicate, jump left directly past the previous occurrence.

Trace "abcabcbb":
• a(0), b(1), c(2) → len=3
• a again at 3 → jump left to max(left, map[a]+1) = 1
• Continue expanding... max = 3`,
    keyInsight:
      "Instead of shrinking one-by-one, jump left directly past the duplicate. The Map stores last-seen indices.",
  },
  "hm-2": {
    approach: "Hash Set + Sequence Counting",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `Build a Set from all numbers. For each num, check if num-1 exists. If NOT → it's a sequence START. Count consecutive from there.

[100, 4, 200, 1, 3, 2]:
• 100: 99 not in set → start. 101 not in set → length 1.
• 4: 3 in set → not a start, skip.
• 1: 0 not in set → start. 2,3,4 exist → length 4. ✓

Why O(n)? Each number is visited at most twice (once as a start check, once during counting).`,
    keyInsight:
      "Only count from sequence STARTS (where num-1 doesn't exist). This avoids redundant counting.",
  },
  "hm-3": {
    approach: "Bucket Sort / Heap",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `Count frequencies with a Map. Then find the k most frequent.

Approach 1 — Bucket sort: Create buckets where index = frequency. Bucket[3] = [elements appearing 3 times]. Walk buckets from highest to lowest, collect k elements. O(n).

Approach 2 — Min-heap of size k: Process frequencies, keep only k largest. O(n log k).

Bucket sort is cleaner for interviews and avoids heap implementation.`,
    keyInsight:
      "Frequency counting + bucket sort = O(n). The bucket index IS the frequency.",
  },
  "stk-3": {
    approach: "Monotonic Decreasing Stack",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `Stack stores indices of temperatures in decreasing order. For each new temp, pop all cooler temps — they've found their "next warmer day."

Trace [73,74,75,71,69,72,76,73]:
• 73→push. 74>73→pop 73(1 day), push 74. 75>74→pop(1 day), push 75.
• 71<75→push. 69<71→push. 72>69→pop(1), 72>71→pop(2), push 72.
• 76>72→pop(1), 76>75→pop(4), push 76.
Result: [1,1,4,2,1,1,0,0] ✓`,
    keyInsight:
      "Monotonic stack: each element is pushed and popped at most once → O(n). The stack maintains 'waiting' elements.",
  },
  "bs-1": {
    approach: "Modified Binary Search",
    complexity: "Time: O(log n) · Space: O(1)",
    walkthrough: `In a rotated sorted array, one half is always sorted. Check which half is sorted, then decide which half contains the minimum.

If nums[mid] > nums[right]: min is in right half (rotation point is there). lo = mid + 1.
If nums[mid] <= nums[right]: min is in left half (including mid). hi = mid.

This works because the minimum is at the rotation point — the only place where a larger number precedes a smaller one.`,
    keyInsight:
      "In rotated arrays, one half is always sorted. Compare mid to right to find which half contains the pivot.",
  },
  "bs-2": {
    approach: "Binary Search on Answer",
    complexity: "Time: O(n · log(max)) · Space: O(1)",
    walkthrough: `Binary search on the eating speed. For speed s, calculate total hours = sum(ceil(pile/s)). If hours ≤ h, speed is feasible — try slower. If hours > h, need faster.

lo = 1, hi = max(piles). Binary search for the minimum feasible speed.

This is the "binary search on answer" pattern: the answer space is monotonic (faster speed → fewer hours), so binary search finds the boundary.`,
    keyInsight:
      "'Minimize X such that condition holds' = binary search on the answer. Check feasibility with a linear scan.",
  },
  "sort-1": {
    approach: "Sort by Start + Linear Merge",
    complexity: "Time: O(n log n) · Space: O(n)",
    walkthrough: `Sort intervals by start time. Scan left to right, merging overlapping intervals.

For each interval: if it overlaps with the last merged interval (start ≤ lastEnd), extend the end. Otherwise, start a new merged interval.

[[1,3],[2,6],[8,10],[15,18]] → sort (already sorted)
• [1,3]: add to result
• [2,6]: 2 ≤ 3 → merge to [1,6]
• [8,10]: 8 > 6 → new interval
• [15,18]: 15 > 10 → new interval
Result: [[1,6],[8,10],[15,18]] ✓`,
    keyInsight:
      "Sort by start time makes overlaps adjacent. Then a single pass merges them.",
  },
  "sort-2": {
    approach: "Dutch National Flag (Three Pointers)",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Three pointers: lo (next 0 position), mid (current), hi (next 2 position).

• If nums[mid] === 0: swap with lo, advance both.
• If nums[mid] === 1: advance mid only.
• If nums[mid] === 2: swap with hi, decrement hi only (don't advance mid — swapped value needs checking).

This partitions the array into [0s | 1s | 2s] in one pass.`,
    keyInsight:
      "Three-way partition: lo marks the 0/1 boundary, hi marks the 1/2 boundary, mid scans between them.",
  },
  "q-1": {
    approach: "DFS/BFS Flood Fill",
    complexity: "Time: O(rows × cols) · Space: O(rows × cols)",
    walkthrough: `Scan the grid. When you find a '1', increment island count and flood-fill (DFS/BFS) to mark all connected '1's as visited (set to '0').

DFS approach: from each '1', recursively visit all 4-directional neighbors that are '1', marking them '0'. Each cell is visited at most once.

Why mutate the grid? It doubles as the visited set — no extra space needed (beyond the recursion stack).`,
    keyInsight:
      "Connected component counting. Each DFS/BFS from an unvisited '1' discovers one complete island.",
  },
  "bt-1": {
    approach: "Backtracking with Index",
    complexity: "Time: O(2^(target/min)) · Space: O(target/min)",
    walkthrough: `Backtrack from index i. At each step, try including candidates[i] (can reuse) or moving to i+1. Sum tracking: subtract from remaining target.

Key: start from current index (not 0) to avoid duplicate combinations. [2,3] and [3,2] are the same — only explore [2,3] by enforcing left-to-right order.

Base cases: remaining === 0 → found a combination. remaining < 0 → exceeded target, backtrack.`,
    keyInsight:
      "Start from current index (not 0) to avoid duplicates. Remaining target shrinks as you add candidates.",
  },
  "gr-1": {
    approach: "Greedy — Track Farthest Reach",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Maintain the farthest index reachable. Scan left to right: at each position i, update farthest = max(farthest, i + nums[i]).

If at any point i > farthest, you're stuck — return false. If farthest ≥ last index, return true.

Trace [2,3,1,1,4]: farthest starts at 0.
• i=0: farthest = max(0, 0+2) = 2
• i=1: farthest = max(2, 1+3) = 4 ≥ 4 → true ✓`,
    keyInsight:
      "Greedy reach expansion. At each step, you know the farthest you can possibly go.",
  },
  "dp-2": {
    approach: "DP or Patience Sorting",
    complexity: "Time: O(n²) DP or O(n log n) · Space: O(n)",
    walkthrough: `DP: dp[i] = length of LIS ending at index i. For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1).

O(n log n) approach: maintain a "tails" array. For each number, binary search for its position. If it extends the sequence, append. If not, replace the first tail ≥ num (keeps tails as small as possible for future extensions).

Trace [10,9,2,5,3,7,101,18]:
tails: [2] → [2,5] → [2,3] → [2,3,7] → [2,3,7,101] → [2,3,7,18]
Length = 4 ✓`,
    keyInsight:
      "The O(n log n) trick: maintain the smallest possible tail for each subsequence length. Binary search to update.",
  },
  "dp-3": {
    approach: "DP with Dictionary Check",
    complexity: "Time: O(n² × m) · Space: O(n)",
    walkthrough: `dp[i] = can s[0..i-1] be segmented? For each position i, check all substrings s[j..i-1] against the dictionary. If dp[j] is true AND s[j..i-1] is a word → dp[i] = true.

Trace "leetcode" with ["leet","code"]:
• dp[0]=true (empty string)
• dp[4]=true: dp[0] && "leet" in dict ✓
• dp[8]=true: dp[4] && "code" in dict ✓`,
    keyInsight:
      "dp[i] = 'can the first i characters be segmented?' Check all possible last-word boundaries.",
  },
  "dp-4": {
    approach: "0/1 Knapsack DP",
    complexity: "Time: O(n × sum/2) · Space: O(sum/2)",
    walkthrough: `Can we find a subset summing to totalSum/2? This is the 0/1 knapsack problem.

dp[j] = can we make sum j? For each number, iterate j from target DOWN to num: dp[j] = dp[j] || dp[j - num]. (Backward iteration prevents using the same item twice.)

If totalSum is odd → impossible. Otherwise, check dp[totalSum/2].`,
    keyInsight:
      "Equal partition = subset sum = 0/1 knapsack. Iterate backwards to enforce 'use each item once.'",
  },
  "adp-1": {
    approach: "State Machine DP",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Three states each day: hold (own stock), sold (just sold today → cooldown tomorrow), rest (no stock, can buy).

Transitions:
• hold[i] = max(hold[i-1], rest[i-1] - price)  — keep holding, or buy from rest
• sold[i] = hold[i-1] + price  — sell what we're holding
• rest[i] = max(rest[i-1], sold[i-1])  — keep resting, or cooldown from sold

Answer = max(sold[n-1], rest[n-1]).`,
    keyInsight:
      "Stock problems with rules = state machine. Each state transitions based on allowed actions.",
  },
  "adp-2": {
    approach: "2D DP (Edit Distance)",
    complexity: "Time: O(m × n) · Space: O(m × n), optimizable to O(n)",
    walkthrough: `dp[i][j] = minimum edits to convert word1[0..i-1] to word2[0..j-1].

If word1[i-1] === word2[j-1]: dp[i][j] = dp[i-1][j-1] (no edit needed).
Else: dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
  — replace, delete, insert respectively.

Base: dp[0][j] = j (insert j chars), dp[i][0] = i (delete i chars).`,
    keyInsight:
      "Three operations map to three dp neighbors: diagonal (replace), up (delete), left (insert).",
  },
  "str-1": {
    approach: "Expand Around Center",
    complexity: "Time: O(n²) · Space: O(1)",
    walkthrough: `Every palindrome has a center. Iterate all possible centers (2n-1 total: n single chars + n-1 between-char gaps). For each center, expand outward while characters match.

For "babad": center at index 1 → expand: b=b → "bab" (length 3). Center at index 2 → expand: a=a? no, just "b". Best = "bab".

Why 2n-1 centers? Odd-length palindromes center on a character. Even-length palindromes center between two characters.`,
    keyInsight:
      "Expand from every possible center. O(n) centers × O(n) expansion = O(n²). Simple and no extra space.",
  },
  "str-3": {
    approach: "Fixed Sliding Window + Frequency",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Window size = p.length. Maintain character frequency counts for the window and for p. When they match → anagram found.

Optimization: instead of comparing all 26 counts, track a "matches" counter. When a character count in window equals that in p → increment matches. When matches === 26 → all characters match → anagram at this position.

Slide the window: add right char, remove left char, update matches accordingly.`,
    keyInsight:
      "Fixed window + frequency matching. The 'matches' counter avoids comparing 26 values every step.",
  },
  "ds-1": {
    approach: "HashMap + Doubly Linked List",
    complexity: "Time: O(1) all ops · Space: O(capacity)",
    walkthrough: `HashMap stores {key → node}. Doubly linked list maintains access order (most recent at head, least recent at tail).

GET: look up in map → O(1). Move node to head (most recently used).
PUT: if key exists, update value, move to head. If new: add to head, add to map. If over capacity: remove tail node (LRU), delete from map.

The doubly linked list enables O(1) removal of any node (given a reference) and O(1) insertion at head.`,
    keyInsight:
      "Map gives O(1) lookup. Doubly linked list gives O(1) reorder. Together they enable O(1) for everything.",
  },
  "sw-3": {
    approach: "Fixed Window + Frequency Match",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Window size = s1.length. Slide over s2. Maintain char frequency counts for window and s1. When they match → s2 contains a permutation of s1.

Use an array of 26 counts. Increment for s1 chars, decrement as window slides. Track a "matches" counter (how many of 26 letters have equal counts). When matches === 26 → permutation found.`,
    keyInsight:
      "Permutation = same character frequencies. Fixed window + frequency matching in O(n).",
  },
  "rec-1": {
    approach: "Divide and Conquer",
    complexity: "Time: O(n log n) · Space: O(n)",
    walkthrough: `Split array in half recursively until single elements. Then merge sorted halves back together.

Merge step: two pointers scan left and right halves, always picking the smaller element. This produces a sorted merged array.

The recursion tree has log(n) levels. Each level does O(n) total merge work. Total: O(n log n).`,
    keyInsight:
      "Mergesort is the only comparison sort that guarantees O(n log n) worst case AND is stable. The merge step is the key operation.",
  },
  "rec-2": {
    approach: "Recursive Flatten",
    complexity: "Time: O(n) · Space: O(depth)",
    walkthrough: `For each element: if it's an array, recursively flatten it and spread the results. If it's a value, add it directly.

function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) result.push(...flatten(item));
    else result.push(item);
  }
  return result;
}

Each element is visited once. Stack depth = maximum nesting depth.`,
    keyInsight:
      "Recursion naturally handles arbitrary nesting depth. Base case: not an array → return as-is.",
  },
  "stk-2": {
    approach: "Auxiliary Min Tracking",
    complexity: "Time: O(1) all ops · Space: O(n)",
    walkthrough: `Maintain two stacks: main stack and min stack. Min stack always has the current minimum at its top.

Push(x): push to main. If x ≤ minStack.top(), also push to minStack.
Pop(): pop from main. If popped value === minStack.top(), also pop minStack.
GetMin(): return minStack.top(). Always O(1).

Alternative: store pairs (value, currentMin) on a single stack.`,
    keyInsight:
      "The min stack mirrors the main stack but only stores values when they become or tie the new minimum.",
  },
  "q-2": {
    approach: "Monotonic Deque",
    complexity: "Time: O(n) · Space: O(k)",
    walkthrough: `Maintain a deque of INDICES in decreasing value order. The front of the deque is always the index of the current window maximum.

For each new element:
1. Remove indices from the back that are smaller (they can never be the max).
2. Add current index to back.
3. Remove front if it's outside the window.
4. Deque front = window maximum.

Each element enters and leaves the deque at most once → O(n) total.`,
    keyInsight:
      "Monotonic deque maintains candidates for maximum in O(1) per step. Useless elements are eagerly removed.",
  },
  "ll-2": {
    approach: "Floyd's Cycle Detection",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Phase 1: Fast (2 steps) and slow (1 step) pointers. If cycle exists, they meet inside the cycle.

Phase 2: Reset one pointer to head. Both move 1 step at a time. They meet at the cycle entry point.

Why this works: when they first meet, fast has traveled 2× slow's distance. The extra distance is a multiple of the cycle length. Resetting to head and moving at equal speed means they converge at the entry.`,
    keyInsight:
      "Floyd's two-phase algorithm: detect cycle, then find entry. O(1) space, O(n) time.",
  },
  "ll-3": {
    approach: "Find Mid + Reverse + Merge",
    complexity: "Time: O(n) · Space: O(1)",
    walkthrough: `Three steps:
1. Find middle using fast/slow pointers.
2. Reverse the second half of the list.
3. Merge alternating nodes from first and reversed second halves.

[1→2→3→4→5] → mid at 3 → reverse second: [4→5] becomes [5→4]
Merge: 1→5→2→4→3`,
    keyInsight:
      "This combines three fundamental linked list techniques in one problem. Master each independently.",
  },
  "tree-2": {
    approach: "Bottom-Up DFS",
    complexity: "Time: O(n) · Space: O(height)",
    walkthrough: `Diameter = longest path between any two nodes (measured in edges). This path goes through some node as "left depth + right depth."

At each node: compute left height and right height. Update global max with leftH + rightH. Return max(leftH, rightH) + 1 to parent.

The key: the diameter doesn't necessarily pass through the root.`,
    keyInsight:
      "Diameter at each node = leftHeight + rightHeight. Track the global maximum while computing heights bottom-up.",
  },
  "tree-3": {
    approach: "BFS Level Order",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `BFS level by level. For each level, the LAST node is visible from the right side.

Process each level: iterate all nodes at current depth, record the last one. Add children for the next level.

Alternatively, DFS with depth tracking: visit right child first. The first node you see at each depth is the rightmost.`,
    keyInsight:
      "Right side view = last node at each level. BFS naturally groups by level.",
  },
  "tree-4": {
    approach: "BST Property Exploitation",
    complexity: "Time: O(log n) · Space: O(log n)",
    walkthrough: `In a BST, for nodes p and q:
- If both < current → LCA is in left subtree.
- If both > current → LCA is in right subtree.
- Otherwise (one on each side, or one equals current) → current IS the LCA.

This is O(log n) for balanced BSTs because you only traverse one path from root.`,
    keyInsight:
      "BST property lets you decide direction in O(1). The split point where p and q diverge is the LCA.",
  },
  "heap-1": {
    approach: "Min-Heap of Size K",
    complexity: "Time: O(n log k) · Space: O(k)",
    walkthrough: `Maintain a min-heap of size k. For each element: if heap has < k elements, add it. If element > heap minimum, replace minimum and heapify.

After processing all elements, the heap root is the kth largest.

Alternative: Quickselect gives O(n) average but O(n²) worst case. Heap approach is O(n log k) guaranteed.`,
    keyInsight:
      "A min-heap of size k naturally maintains the k largest elements. The root is the smallest of the k largest = the kth largest.",
  },
  "heap-2": {
    approach: "Two Heaps",
    complexity: "Time: O(log n) per add, O(1) median · Space: O(n)",
    walkthrough: `MaxHeap stores the smaller half. MinHeap stores the larger half. Balance: sizes differ by at most 1.

addNum(x): if x ≤ maxHeap.top → add to maxHeap, else add to minHeap. Then rebalance (move top between heaps if sizes differ by > 1).

findMedian(): if equal sizes → average of both tops. If unequal → top of the larger heap.`,
    keyInsight:
      "Split the stream into two halves. The boundary between the heaps IS the median.",
  },
  "g-1": {
    approach: "BFS/DFS with HashMap Clone",
    complexity: "Time: O(V + E) · Space: O(V)",
    walkthrough: `Map old nodes to new clones: visited = Map<oldNode, newNode>.

BFS: start from given node. For each node, create a clone if not visited. For each neighbor, create/lookup its clone, add to current clone's neighbors.

The map serves dual purpose: tracks visited nodes AND stores the old→new mapping.`,
    keyInsight:
      "The hashmap IS both the visited set and the clone registry. One data structure, two purposes.",
  },
  "g-2": {
    approach: "Topological Sort (Kahn's BFS)",
    complexity: "Time: O(V + E) · Space: O(V + E)",
    walkthrough: `Build adjacency list and in-degree count. Enqueue all nodes with in-degree 0 (no prerequisites).

Process queue: dequeue node, add to result, decrement in-degree for all its dependents. When a dependent hits in-degree 0, enqueue it.

If result.length < numCourses → cycle exists → return [].`,
    keyInsight:
      "Process courses with no remaining prerequisites first. Cycle detection: if not all courses are processed, there's a cycle.",
  },
  "g-3": {
    approach: "Multi-Source BFS from Coasts",
    complexity: "Time: O(m × n) · Space: O(m × n)",
    walkthrough: `Instead of checking each cell, start BFS from the coasts:
1. BFS from all Pacific-border cells — mark reachable cells.
2. BFS from all Atlantic-border cells — mark reachable cells.
3. Intersection = cells that reach both oceans.

Water flows from higher to lower, but we reverse it: BFS from coast cells to higher/equal neighbors (going uphill).`,
    keyInsight:
      "Reverse the flow direction. BFS from the ocean inward is much more efficient than checking every cell outward.",
  },
  "bt-2": {
    approach: "DFS Backtracking on Grid",
    complexity: "Time: O(m × n × 4^L) · Space: O(L)",
    walkthrough: `For each cell matching word[0], DFS in 4 directions. Mark cells as visited during recursion, unmark on backtrack.

Pruning: if current cell doesn't match current character → return false immediately.

Key: use the grid itself for visited marking (temporarily change cell value) to avoid extra space.`,
    keyInsight:
      "Backtracking on grids: mark visited, recurse, unmark. Using the grid as the visited set saves space.",
  },
  "gr-2": {
    approach: "Sort by End Time + Greedy",
    complexity: "Time: O(n log n) · Space: O(1)",
    walkthrough: `Sort intervals by END time. Greedily keep the interval that ends earliest (leaves most room for others). Count removals = total - kept.

Track lastEnd. For each interval: if start ≥ lastEnd → keep it (no overlap). Otherwise → skip it (counts as removal).`,
    keyInsight:
      "Same as interval scheduling: always pick the one that ends earliest. Minimizing removals = maximizing non-overlapping intervals.",
  },
  "trie-1": {
    approach: "Array of 26 Children per Node",
    complexity: "Time: O(word length) per op · Space: O(total chars × 26)",
    walkthrough: `Each node has children[26] (one per letter) and an isEnd flag.

Insert: walk character by character, creating nodes. Mark last as isEnd.
Search: walk character by character. If any missing → false. If all present and isEnd → true.
StartsWith: same as search but don't check isEnd.`,
    keyInsight:
      "A trie trades space for speed. Every prefix operation is O(word length) regardless of how many words are stored.",
  },
  "trie-2": {
    approach: "Trie + DFS Backtracking",
    complexity: "Time: O(m × n × 4^L) · Space: O(total chars)",
    walkthrough: `Build a trie from the word list. DFS the board using the trie to prune impossible paths.

At each cell: if trie node has no child for current letter → prune entire branch. If trie node is a word end → add to results.

Optimization: remove word from trie after finding it (prevents duplicates and prunes future searches).`,
    keyInsight:
      "The trie replaces checking each word individually. One DFS traversal with trie guidance finds all words simultaneously.",
  },
  "ag-1": {
    approach: "Union-Find or DFS",
    complexity: "Time: O(V + E) · Space: O(V)",
    walkthrough: `DFS approach: for each unvisited node, run DFS to mark all reachable nodes. Count = number of DFS calls.

Union-Find approach: initialize each node as its own component. For each edge, union the two nodes. Count = number of distinct roots at the end.`,
    keyInsight:
      "Connected components = how many times you need to start a new DFS/BFS. Union-Find gives near O(1) per operation.",
  },
  "ag-2": {
    approach: "Dijkstra's Algorithm",
    complexity: "Time: O((V+E) log V) · Space: O(V + E)",
    walkthrough: `Min-heap priority queue. Start from source k with distance 0. Process: dequeue minimum-distance node, relax all edges.

dist[node] = min(dist[node], dist[current] + weight). If updated, add to heap.

After processing: answer = max(all distances). If any node unreachable → return -1.`,
    keyInsight:
      "Dijkstra = BFS with a priority queue instead of a regular queue. Always process the closest unvisited node.",
  },
  "ag-3": {
    approach: "Union-Find (Last Edge Creating Cycle)",
    complexity: "Time: O(n × α(n)) ≈ O(n) · Space: O(n)",
    walkthrough: `Process edges in order. For each edge (u, v): if find(u) === find(v) → adding this edge creates a cycle → it's the redundant edge. Otherwise, union(u, v).

The LAST edge that creates a cycle is the answer (problem guarantees exactly one such edge).`,
    keyInsight:
      "Union-Find detects cycles in undirected graphs. If both endpoints are already connected, the edge is redundant.",
  },
  "ds-2": {
    approach: "HashMap + Merge K Lists",
    complexity: "Time: O(k log k) for feed · Space: O(users + tweets)",
    walkthrough: `follow/unfollow: HashMap of userId → Set of followeeIds.
postTweet: HashMap of userId → list of (timestamp, tweetId).
getNewsFeed: collect tweets from user + all followees, use a heap to merge and get top 10.

The key insight: getNewsFeed is "merge k sorted lists" — each user's tweet list is sorted by timestamp.`,
    keyInsight:
      "Social feed = merge k sorted lists. Store tweets per-user, merge with a heap for the feed.",
  },
  "ds-3": {
    approach: "HashMap + Array + Swap Trick",
    complexity: "Time: O(1) all ops · Space: O(n)",
    walkthrough: `Array stores values. HashMap stores {value → index in array}.

Insert: append to array, store index in map. O(1).
Remove: swap target with last element, pop last. Update map for swapped element. O(1).
GetRandom: return arr[randomIndex]. O(1).

The swap trick enables O(1) removal without holes in the array.`,
    keyInsight:
      "Swap-to-end trick: replace the element to delete with the last element, then pop. Keeps array dense for O(1) random access.",
  },
  "adp-3": {
    approach: "2D DP (Subsequence Counting)",
    complexity: "Time: O(m × n) · Space: O(m × n)",
    walkthrough: `dp[i][j] = number of distinct subsequences of s[0..i-1] that equal t[0..j-1].

If s[i-1] === t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
  — use this character match + skip this character

If s[i-1] !== t[j-1]: dp[i][j] = dp[i-1][j]
  — can only skip this character of s

Base: dp[i][0] = 1 (empty t matches any prefix with 1 way).`,
    keyInsight:
      "Two choices when characters match: use the match OR skip it. When they don't match, you must skip.",
  },
  "str-2": {
    approach: "Length-Prefixed Encoding",
    complexity: "Time: O(n) · Space: O(n)",
    walkthrough: `Encode: for each string, prepend its length and a delimiter.
"abc" → "3#abc", "hello" → "5#hello"

Decode: read the number before '#', extract that many characters, repeat.

This handles ANY string content (including '#', numbers, empty strings) because the length tells you exactly how many characters to read.`,
    keyInsight:
      "Length-prefix encoding is unambiguous. The length tells you where each string ends, regardless of content.",
  },
  m4: {
    approach: "Bottom-Up DFS with Global Max",
    complexity: "Time: O(n) · Space: O(height)",
    walkthrough: `At each node, the max path through it = leftGain + rightGain + node.val (where gains are ≥ 0).

Each node returns its max single-side contribution to its parent: node.val + max(leftGain, rightGain). A negative gain is clamped to 0 (don't extend that direction).

Global max is updated at every node. The answer might not pass through the root.`,
    keyInsight:
      "Separate the 'passing through' calculation (both sides + node) from the 'reporting up' calculation (best single side + node).",
  },
};
