// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DEEP_DIVE: Record<string, any> = {
  "big-o": {
    sections: [
      {
        title: "What Big-O Really Means",
        content: `Big-O describes the upper bound of how an algorithm scales as input grows toward infinity. When we say f(n) = O(n²), we mean: there exist constants c and n₀ such that for all n > n₀, f(n) ≤ c·n². We drop constants (3n → n) and lower-order terms (n² + 1000n → n²) because at massive scale, only the dominant term matters.

Big-O is about the SHAPE of growth, not the exact count. O(n) algorithms are always linear whether they do 1 pass or 5 passes. O(log n) always means "input halving" — binary search, balanced tree height, repeated division.`,
      },
      {
        title: "The Complexity Hierarchy",
        content: `Memorize this ranking (fastest to slowest):
O(1) — constant: hash lookups, array access, stack push/pop
O(log n) — logarithmic: binary search, balanced tree operations
O(√n) — square root: prime checking optimizations
O(n) — linear: single scan, hash map build, counting sort
O(n log n) — linearithmic: merge sort, heap sort, sort-then-solve
O(n²) — quadratic: nested loops, brute force pair checking
O(n³) — cubic: triple nested loops, matrix multiplication
O(2ⁿ) — exponential: subsets, recursive brute force without memo
O(n!) — factorial: permutations, TSP brute force

When you see nested loops: multiply. When you see sequential operations: take the max. When you see recursion: draw the call tree and count nodes.`,
      },
      {
        title: "Space Complexity",
        content: `Space = extra memory your algorithm uses beyond the input itself. The input array doesn't count — only additional allocations.

Recursion uses O(depth) stack frames. A hash map uses O(n) space. In-place algorithms use O(1) extra space.

Interview tip: many O(n²) time solutions can be optimized to O(n) time by trading space (building a hash map). This time-space tradeoff is the most common optimization pattern.`,
      },
      {
        title: "How to Analyze Any Function",
        content: `Step 1: Identify loops and their bounds. How many times does each loop run?
Step 2: For nested loops, multiply their iteration counts.
Step 3: For sequential operations, take the maximum.
Step 4: For recursion, draw the call tree. Total work = (nodes) × (work per node).
Step 5: Drop constants and lower-order terms.

Example: for i=0→n, for j=i→n → outer runs n times, inner runs (n-i) times. Total = n + (n-1) + ... + 1 = n(n+1)/2 = O(n²).

Example: mergesort splits in half (log n levels) and merges n elements per level. Total = O(n log n).`,
      },
    ],
  },
  arrays: {
    sections: [
      {
        title: "Memory Model & Why It Matters",
        content: `An array is a contiguous block of memory where each element occupies the same fixed size. The address of element i = baseAddress + i × elementSize. This is why arr[i] is O(1) — it's direct pointer arithmetic, no traversal.

Insertion at index k requires shifting elements k through n-1 one position right, then writing the new value. This O(n) shift is what makes arrays fundamentally different from linked lists. Deletion is the reverse: shift left, then shrink.

JavaScript arrays are technically objects with numeric keys, but V8 optimizes them as C-style arrays when possible (dense, homogeneous values). When you add non-numeric keys or create sparse arrays, V8 falls back to dictionary mode — much slower.`,
      },
      {
        title: "The Five Core Array Techniques",
        content: `1. PREFIX SUMS: Build an array where prefix[i] = sum of arr[0..i-1]. Then rangeSum(l,r) = prefix[r+1] - prefix[l] in O(1). Use when you need repeated range queries.

2. TWO POINTERS: Use two indices to scan from opposite ends (sorted pair sums), or fast/slow (cycle detection), or read/write (in-place filtering). Eliminates the inner loop.

3. SLIDING WINDOW: Maintain a window [left, right] that expands and shrinks. Fixed-size windows: advance both pointers together. Variable-size: expand right, shrink left when condition breaks.

4. SORT FIRST: Sorting in O(n log n) often simplifies the remaining logic to O(n). Anytime the problem involves duplicates, nearest neighbors, or ordering, consider sorting first.

5. HASH MAP AUGMENT: Replace O(n) linear scans with O(1) hash lookups. Build a map of {value: index} or {value: count}. This is the Two Sum technique generalized.`,
      },
      {
        title: "When to Use Each Technique",
        content: `"Find a pair that satisfies X" → Hash map (unsorted) or two pointers (sorted)
"Maximum/minimum subarray of size k" → Sliding window
"How many subarrays sum to X" → Prefix sums + hash map
"Remove duplicates / filter in-place" → Two pointers (read/write)
"Find kth largest" → Quickselect or heap
"Merge two sorted arrays" → Two pointers from ends

The pattern recognition shortcut: if the input is sorted or can be sorted, think two pointers. If you need O(1) lookups, think hash map. If you need contiguous subarrays, think prefix sums or sliding window.`,
      },
      {
        title: "Edge Cases to Always Check",
        content: `Empty array: arr.length === 0. Many candidates forget this.
Single element: arr.length === 1. Loops may not execute.
All identical values: [5,5,5,5]. Deduplication logic must handle this.
Negative numbers: Kadane's algorithm, product arrays — negatives flip signs.
Integer overflow: In typed languages, large sums can overflow. Use long/BigInt.
Sorted input: Your O(n log n) sort becomes redundant. Exploit sorted property directly.`,
      },
    ],
  },
  "two-pointers": {
    sections: [
      {
        title: "The Three Pointer Patterns",
        content: `PATTERN 1 — OPPOSITE ENDS: Start left=0, right=n-1 on sorted data. Move based on comparison. Classic for pair sums: if sum < target, move left right (increase sum). If sum > target, move right left (decrease sum). Works because sorted order guarantees monotonic behavior.

PATTERN 2 — FAST/SLOW: Both start at position 0. Fast moves 2 steps, slow moves 1. When fast reaches end, slow is at midpoint. For cycle detection (Floyd's): if there's a cycle, fast and slow will meet. After meeting, reset one pointer to start — they meet again at the cycle entry.

PATTERN 3 — READ/WRITE: Read pointer scans every element. Write pointer tracks where to place the next "kept" element. Use for in-place filtering, deduplication, or compacting. The key: write ≤ read always, so you never overwrite unread data.`,
      },
      {
        title: "Why Two Pointers is O(n)",
        content: `Each pointer traverses the array at most once. Left pointer: moves right only, from 0 to at most n-1 = n moves. Right pointer: moves left only, from n-1 to at most 0 = n moves. Total moves ≤ 2n = O(n).

This is the fundamental insight: two pointers eliminates the inner loop. Instead of "for each i, scan j from i+1 to n" (O(n²)), you move two pointers based on what you learn from each step. Each step provides information that lets you skip unnecessary comparisons.

The precondition for opposite-ends: DATA MUST BE SORTED (or have some ordered property). Without order, you can't make the move decision correctly.`,
      },
      {
        title: "Building Blocks for Interview",
        content: `Two Sum (sorted): left + right → check sum → move smaller side.
3Sum: Fix i, two-pointer on remainder. Skip duplicates: while(nums[l]===nums[l-1]) l++.
Container With Most Water: opposite ends, move the shorter side (can't lose — shorter side limits area).
Palindrome check: compare left/right characters, move inward.
Remove element in-place: read/write pattern.
Linked list midpoint: fast/slow.
Linked list cycle: fast/slow → Floyd's.
Merge sorted arrays: two pointers from the start (or end for in-place).

Interview tip: if asked "can you do this in O(1) extra space?", two pointers is almost always the answer.`,
      },
    ],
  },
  "sliding-window": {
    sections: [
      {
        title: "Fixed vs Variable Windows",
        content: `FIXED WINDOW (size k): Initialize with first k elements. Slide: add element at right edge, remove element that falls off left edge. Maintain running state (sum, max, frequency map). Time: O(n).

VARIABLE WINDOW: Expand right to include more. When a condition breaks (window becomes invalid), shrink from left until valid again. Classic for "smallest subarray with sum ≥ X" or "longest substring without repeating characters".

The template:
  let left = 0;
  for (let right = 0; right < n; right++) {
    // Add arr[right] to window state
    while (condition_broken) {
      // Remove arr[left] from window state
      left++;
    }
    // Update answer (window [left..right] is valid)
  }`,
      },
      {
        title: "The Window State",
        content: `The window state is what you maintain as the window slides. Common states:
- Running sum: add right element, subtract left element
- Frequency map: increment right char count, decrement left char count
- Count of distinct elements: track with the frequency map
- Maximum element: use a monotonic deque (indices sorted by value)
- Validity flag: "all required characters present" — track with need/have counts

The key insight: updating the state must be O(1) per step. If updating is O(n), the whole approach becomes O(n²). Hash maps and running variables give O(1) updates.`,
      },
      {
        title: "Classic Window Problems",
        content: `"Maximum sum subarray of size k" → Fixed window, maintain sum
"Longest substring without repeating characters" → Variable window + hash set
"Minimum window substring" → Variable window + frequency tracking with need/have
"Sliding window maximum" → Fixed window + monotonic deque
"Longest repeating character replacement" → Variable window + frequency tracking
"Permutation in string" → Fixed window + character frequency matching

Interview tip: "subarray" or "substring" in the problem statement = think sliding window. "Contiguous" is the keyword. If the problem asks about subsequences (non-contiguous), sliding window won't work — you need DP or greedy.`,
      },
    ],
  },
  "hash-maps": {
    sections: [
      {
        title: "How Hash Tables Work Internally",
        content: `A hash table stores key-value pairs in an array of "buckets". To find which bucket: hash(key) % bucketCount = index. A good hash function distributes keys uniformly across buckets.

COLLISION HANDLING: When two keys map to the same bucket:
- Chaining: each bucket is a linked list. O(1) average, O(n) worst case.
- Open addressing: probe next slots (linear, quadratic, or double hashing).

LOAD FACTOR = entries / buckets. When load factor exceeds ~0.75, the table resizes (doubles buckets, rehashes all entries). This makes insertion O(1) amortized.

JavaScript: Map uses hash table internally. Object also works as a hash map but has prototype chain overhead and coerces keys to strings. Always prefer Map for interview problems.`,
      },
      {
        title: "The Hash Map Pattern",
        content: `The fundamental technique: replace O(n) linear scans with O(1) hash lookups. Build phase: scan data, store relevant info in the map. Query phase: for each element, look up what you need in O(1).

TWO SUM generalized: "For each x, do I need something that I've already seen?" Store seen elements. Look up the complement/requirement.

FREQUENCY COUNT: "How many of each value?" Build map of {value: count}. Use for anagrams, character matching, most frequent k.

GROUP BY: "Which elements share property X?" Build map of {property: [elements]}. Use for grouping anagrams, bucketing by pattern.

INDEX MAP: "Where is value X?" Build map of {value: index}. Use for two sum, first/last occurrence.`,
      },
      {
        title: "Sets: When You Only Need Existence",
        content: `A Set is a hash map with only keys (no values). Use when you need: "Have I seen X?" or "Is X in the collection?" — O(1) membership testing.

DEDUPLICATION: Add all elements to a set. Duplicates are automatically ignored.
MEMBERSHIP GATE: Build a set from one list, then filter another list by set membership.
LONGEST CONSECUTIVE SEQUENCE: Build set, for each num check if num-1 exists (if not, it's a sequence start). Count consecutive from there.

Sets use the same O(1) average, O(n) worst case as hash maps. In JavaScript: new Set() for membership, has() to check, add() to insert, delete() to remove.`,
      },
    ],
  },
  recursion: {
    sections: [
      {
        title: "The Mental Model for Recursion",
        content: `Recursion = solving a problem by reducing it to a smaller version of itself, plus a base case that stops the reduction.

Think of recursion as DELEGATION. You're the manager of f(5). You don't solve the whole problem — you solve your piece, then delegate the rest to f(4). f(4) solves its piece and delegates to f(3). Eventually f(0) or f(1) handles the base case with a trivial answer, and results bubble back up.

THE CALL STACK: Each recursive call adds a frame to the stack: parameters, local variables, return address. Stack depth = recursion depth. Space complexity = O(depth) from these frames existing simultaneously.

THE RECURSION TEMPLATE:
  function solve(input) {
    if (BASE_CASE) return TRIVIAL_ANSWER;
    // Do work for this level
    const subResult = solve(SMALLER_INPUT);
    // Combine this level's work with subResult
    return COMBINED_RESULT;
  }`,
      },
      {
        title: "Recursion vs Iteration",
        content: `Any recursive solution can be converted to iteration using an explicit stack. Recursion is often more elegant for tree/graph problems (natural recursive structure). Iteration is better for linear problems (no stack overhead).

TAIL RECURSION: When the recursive call is the LAST operation (no work after it), some languages optimize away the stack frame. JavaScript does NOT do tail call optimization reliably — always consider iterative conversion for deep recursion.

MEMOIZATION: Recursive solutions with overlapping subproblems (same input computed multiple times) can be accelerated by caching results. This transforms exponential recursion into polynomial time. Example: fib(n) goes from O(2ⁿ) to O(n) with memoization.`,
      },
      {
        title: "When Recursion Is The Right Choice",
        content: `Trees: Almost all tree problems are naturally recursive. A tree is defined recursively: a node plus left/right subtrees. Traversals, height, path sums — all naturally recursive.

Divide and conquer: Split input in half, solve each half, merge results. Mergesort, quicksort, binary search.

Backtracking: Try a choice, recurse, undo if it fails. Permutations, combinations, N-Queens, Sudoku.

Graph DFS: DFS is recursive by nature. For each neighbor, recurse. Track visited nodes.

NOT for: Simple linear scans, counting, pair problems — use iteration. Also avoid recursion when depth exceeds ~10,000 (stack overflow risk in most languages).`,
      },
    ],
  },
  stacks: {
    sections: [
      {
        title: "Stack: LIFO Principle",
        content: `A stack is a Last-In-First-Out data structure. Push to top, pop from top, peek at top — all O(1). Think of it as a stack of plates: you can only add/remove from the top.

Internally: use an array with a top pointer. push: arr[++top] = val. pop: return arr[top--]. JavaScript: array push/pop gives stack behavior natively.

THE STACK INVARIANT: At any point, the stack contains elements in the order they were added, with the most recent on top. This order property is what makes stacks powerful for problems involving "matching" (parentheses), "reversal" (undo), and "nearest previous" (monotonic stack).`,
      },
      {
        title: "Monotonic Stack: The Key Pattern",
        content: `A MONOTONIC STACK maintains elements in sorted order (increasing or decreasing). When you push a new element, pop everything that violates the sorted property.

DECREASING STACK (for "next greater element"): Stack stores indices. For each new element, pop all smaller elements — the popped element's "next greater" is the current element. Remaining elements in the stack have no next greater yet.

INCREASING STACK (for "next smaller element"): Same idea, pop all larger elements.

Classic problems: Daily Temperatures, Next Greater Element, Largest Rectangle in Histogram, Trapping Rain Water (stack approach).

The insight: each element is pushed and popped at most once. Total operations ≤ 2n = O(n).`,
      },
      {
        title: "Classic Stack Problems",
        content: `PARENTHESES MATCHING: Push open brackets. On close bracket: pop and check match. If stack empty at end = valid. Variations: multiple bracket types, nested validation.

EVALUATE EXPRESSION: Two stacks — one for operators, one for operands. Respect operator precedence.

UNDO/REDO: Main stack for actions, redo stack for undone actions. Push to main on action, push to redo on undo, clear redo on new action.

MIN STACK: Track minimum with auxiliary stack or pairs of (value, currentMin). O(1) getMin.

DECODE STRING: Stack of (string, count) pairs. On '[', push current state. On ']', pop and repeat.`,
      },
    ],
  },
  queues: {
    sections: [
      {
        title: "Queue: FIFO Principle",
        content: `A queue is First-In-First-Out: enqueue at back, dequeue from front — both O(1). Like a line at a store: first person in line gets served first.

IMPLEMENTATION: Array-based circular queue (avoid O(n) shift by wrapping around) or linked list (natural front/back pointers). JavaScript: array shift() is O(n) — for performance, use a linked list or index-tracking approach.

DEQUE (double-ended queue): insert/remove from both front and back in O(1). Useful for sliding window maximum (monotonic deque pattern).`,
      },
      {
        title: "BFS: Queue's Signature Algorithm",
        content: `Breadth-First Search explores nodes level by level using a queue. Start node → queue. Process front of queue, add all unvisited neighbors. Repeat until queue is empty.

BFS guarantees SHORTEST PATH in unweighted graphs because it explores all nodes at distance d before any node at distance d+1.

BFS TEMPLATE:
  queue = [startNode];
  visited = new Set([startNode]);
  while (queue.length) {
    const node = queue.shift();
    // process node
    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

LEVEL-ORDER: To track levels, process all nodes at current level before moving to next: for i=0 to levelSize, dequeue and process.`,
      },
    ],
  },
  "binary-search": {
    sections: [
      {
        title: "The Binary Search Principle",
        content: `Binary search works on SORTED data (or any monotonic property). At each step, check the middle element. If it's your answer, return. If the answer must be in the left half, search left. If right half, search right. Each step halves the search space: n → n/2 → n/4 → ... → 1. Steps = log₂(n).

THE TEMPLATE (inclusive bounds):
  let lo = 0, hi = n - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // Avoids overflow vs (lo+hi)/2
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1; // Not found — lo is insertion point

CRITICAL: lo <= hi (not <). mid = lo + (hi-lo)/2 (not (lo+hi)/2). lo = mid+1 and hi = mid-1 (not mid). These prevent infinite loops and off-by-one errors.`,
      },
      {
        title: "Binary Search Beyond Arrays",
        content: `Binary search applies whenever you have a MONOTONIC PROPERTY — a condition that transitions from false to true (or true to false) across a range.

SEARCH SPACE: Not just arrays. You can binary search on: answer values (koko eating bananas — search on speed), matrix rows/columns (search a 2D sorted matrix), time (minimum days to make bouquets), or any parameter with monotonic behavior.

FIND BOUNDARY: "First true" variant — when condition transitions from false to true, find the exact boundary. Use lo/hi with condition check:
  while (lo < hi) {
    mid = lo + (hi-lo)/2;
    if (condition(mid)) hi = mid; // Answer could be mid
    else lo = mid + 1; // Answer must be after mid
  }
  return lo; // First position where condition is true`,
      },
      {
        title: "Classic Binary Search Problems",
        content: `Standard: search sorted array, find insertion point.
Find boundary: first/last occurrence of value, sqrt(x), find peak element.
Search on answer: minimum speed (Koko), minimum capacity (ship packages), minimum days.
Matrix: search 2D sorted matrix (treat as 1D with row/col math).
Rotated array: find pivot, then standard search on correct half.
Duplicate-heavy: find first true — leftmost boundary.

Interview tip: "minimize the maximum" or "find the smallest X such that" = binary search on the answer space. Check if the answer is feasible with a linear scan.`,
      },
    ],
  },
  sorting: {
    sections: [
      {
        title: "Comparison Sort Fundamentals",
        content: `Every comparison-based sort is bounded by O(n log n) — this is proven (information-theoretic lower bound). Below this: only non-comparison sorts (counting, radix, bucket) which require constraints on the data.

MERGE SORT: Divide array in half, sort each half, merge. Stable, O(n log n) guaranteed, O(n) extra space. The "merge" step: two pointers scan sorted halves, always pick smaller.

QUICK SORT: Choose pivot, partition into <pivot and >pivot, recurse on each. Average O(n log n), worst O(n²) (bad pivot). In-place (O(log n) stack space). Fastest in practice due to cache locality.

HEAP SORT: Build max-heap, repeatedly extract max. O(n log n) guaranteed, O(1) extra space, but not stable. Rarely asked — know the concept, not implementation.`,
      },
      {
        title: "Non-Comparison Sorts",
        content: `COUNTING SORT: Count occurrences of each value, then reconstruct. O(n + k) where k = range of values. Works when values are in a small, bounded range.

RADIX SORT: Sort digit by digit (LSD or MSD), using a stable sort (counting sort) per digit. O(d × (n + k)) where d = digits, k = base. Works for integers and fixed-length strings.

BUCKET SORT: Distribute into buckets by range, sort each bucket, concatenate. Average O(n) when data is uniformly distributed.

When to mention: "Can we do better than O(n log n)?" → Yes, if the data has bounded range (counting sort) or bounded digits (radix sort).`,
      },
      {
        title: "Sorting as a Problem-Solving Tool",
        content: `Many problems become trivial after sorting:
- Two Sum / 3Sum: sort first, then two-pointer scan.
- Merge intervals: sort by start time, then linear merge.
- Find duplicates: sort, then scan adjacent.
- Kth largest: partial sort (quickselect is O(n) average).
- Meeting rooms: sort by time, scan for overlaps.

STABILITY matters when: you sort by multiple criteria and need previous order preserved for ties. Merge sort is stable. Quick sort is not (but can be made stable with extra space).

Interview tip: if the problem involves ordering or grouping, always ask yourself: "Would sorting simplify this?" The O(n log n) cost is often worth the simplified remaining logic.`,
      },
    ],
  },
  "linked-lists": {
    sections: [
      {
        title: "Linked List vs Array: The Tradeoff",
        content: `A linked list is a chain of nodes: each node stores data plus a pointer to the next node. No contiguous memory — nodes can be anywhere in memory.

ACCESS: O(n) — must traverse from head. No random access.
INSERT/DELETE at known position: O(1) — just redirect pointers. No shifting.
SEARCH: O(n) — linear scan from head.

This is the inverse tradeoff from arrays: linked lists are flexible (easy insert/delete) but slow to access. Use linked lists when insert/delete frequency dominates random access needs.

TYPES: Singly linked (next pointer only), Doubly linked (prev + next), Circular (last node points to head).`,
      },
      {
        title: "The Six Core Techniques",
        content: `1. FAST/SLOW POINTERS: Fast moves 2 steps, slow moves 1. When fast reaches end, slow is at midpoint. For cycle detection: if there's a cycle, fast and slow will meet.

2. REVERSE: Iterate with three pointers (prev, curr, next). At each step: save next, point curr to prev, advance. O(n) time, O(1) space.

3. DUMMY HEAD: Create a fake node before the head. Simplifies edge cases (empty list, single node, operations at head). Return dummy.next at the end.

4. MERGE TWO SORTED: Two pointers, always pick smaller. Use dummy head. Classic for merge sort on linked lists.

5. FIND CYCLE ENTRY: Floyd's — fast/slow meet inside cycle. Reset one pointer to head. Advance both by 1. They meet at the cycle entry point.

6. RECURSION: Many linked list problems have elegant recursive solutions. Process current node, recurse on rest, combine results.`,
      },
      {
        title: "Classic Problems",
        content: `Reverse a linked list: iterative (prev/curr/next) or recursive.
Detect cycle + find entry: Floyd's algorithm.
Find middle: fast/slow.
Merge two sorted lists: two-pointer + dummy head.
Remove Nth from end: two-pointer with N-gap.
Reorder list (L0→Ln→L1→Ln-1): find middle → reverse second half → merge alternating.
Palindrome linked list: find middle → reverse second half → compare.
Add two numbers: traverse both, carry digit math.

Always use a DUMMY HEAD to simplify edge cases. Always check: empty list? single node? cycle?`,
      },
    ],
  },
  trees: {
    sections: [
      {
        title: "Tree Fundamentals",
        content: `A tree is a connected, acyclic graph with a distinguished root node. Each node has 0+ children. A BINARY tree: each node has at most 2 children (left, right).

HEIGHT: longest path from root to leaf = O(log n) for balanced trees, O(n) for skewed.
BINARY SEARCH TREE (BST): left subtree values < node < right subtree values. This property enables O(log n) search, insert, delete on balanced BSTs.

TRAVERSALS:
- In-order (left → root → right): gives SORTED order on BSTs.
- Pre-order (root → left → right): useful for serialization/cloning.
- Post-order (left → right → root): useful for delete operations and bottom-up computation.
- Level-order (BFS by level): useful for level-based problems.`,
      },
      {
        title: "The Recursive Tree Template",
        content: `Almost all tree problems follow this template:

  function solve(node) {
    if (!node) return BASE_VALUE;         // null base case
    const leftResult = solve(node.left);  // recurse left
    const rightResult = solve(node.right);// recurse right
    // Combine: use leftResult, rightResult, node.val
    return COMBINED_RESULT;
  }

Height: max(left, right) + 1. Count nodes: left + right + 1. Path sum: check left path + right path + node. Balanced check: |leftHeight - rightHeight| ≤ 1 at every node.

TOP-DOWN vs BOTTOM-UP: Top-down passes info from parent to children (add parameter). Bottom-up computes results from leaves to root (return value). Most problems: bottom-up is cleaner.`,
      },
      {
        title: "BST Operations & Problems",
        content: `SEARCH: if target < node, go left. If target > node, go right. O(log n) balanced.
INSERT: search for position, create node. O(log n) balanced.
DELETE: three cases — leaf (remove), one child (replace with child), two children (replace with in-order successor, then delete successor).
VALIDATE BST: in-order traversal must be sorted. Or: recursive with (min, max) bounds.

Classic tree problems: maximum depth, path sum, invert tree, lowest common ancestor, serialize/deserialize, construct from traversals, diameter (longest path between any two nodes).

Interview tip: always handle the null base case first. Always consider: what info do I need from left subtree? right subtree? current node? How to combine them?`,
      },
    ],
  },
  heaps: {
    sections: [
      {
        title: "Heap: The Priority Queue",
        content: `A heap is a complete binary tree with the HEAP PROPERTY: parent ≤ children (min-heap) or parent ≥ children (max-heap). The root is always the min (or max).

OPERATIONS: insert O(log n) — add to end, bubble up. extractMin O(log n) — remove root, move end to root, bubble down. peek O(1) — return root.

IMPLEMENTATION: Array-based. For node at index i: parent = floor((i-1)/2), leftChild = 2i+1, rightChild = 2i+2. No pointers needed — the array index IS the tree position.

BUILD HEAP: From unordered array in O(n) — start from last non-leaf, bubble down each. This is faster than n × insert because most nodes are near the bottom.`,
      },
      {
        title: "The Three Heap Patterns",
        content: `PATTERN 1 — TOP K: "Find k largest/smallest." Build a min-heap of size k. For each element: if element > heap root (min of k largest), replace root and heapify. Final heap = k largest. Time: O(n log k).

PATTERN 2 — MERGE K SORTED: "Merge k sorted lists/arrays." Min-heap stores one element from each source. Extract min, add next from that source. Time: O(total × log k) where k = number of sources.

PATTERN 3 — MEDIAN TRACKING: "Find median from stream." Two heaps — max-heap (lower half) and min-heap (upper half). Balance sizes. Median = max-heap root (odd count) or average of both roots (even count). O(log n) per insert, O(1) median.`,
      },
      {
        title: "When to Use a Heap",
        content: `"K-th largest" or "k-th smallest" → Heap (top k pattern) or quickselect
"Merge k sorted lists" → Heap (merge k pattern)
"Find median from stream" → Two heaps
"Process in priority order" → Heap (Dijkstra, task scheduling, event simulation)
"Always need the minimum/maximum" → Heap gives O(1) peek, O(log n) update

In JavaScript: no native heap. Implement with an array and swap/bubble functions, or use a sorted insertion approach for small heaps.

Interview tip: if you need repeated access to the min/max and the collection is dynamic (elements added/removed), a heap is almost always the right choice.`,
      },
    ],
  },
  graphs: {
    sections: [
      {
        title: "Graph Representation",
        content: `A graph = nodes (vertices) + edges. Edges can be directed/undirected, weighted/unweighted.

ADJACENCY LIST: Map<node, [neighbors]>. Space: O(V + E). Best for sparse graphs and interview problems. Build: for each edge (u,v), add v to adj[u] (and u to adj[v] for undirected).

ADJACENCY MATRIX: 2D boolean array matrix[i][j]. Space: O(V²). Best for dense graphs. Checking "is there an edge from i to j?" is O(1).

For interview problems: ALWAYS use adjacency list unless told otherwise. Build it first, then traverse.`,
      },
      {
        title: "BFS vs DFS: When to Use Each",
        content: `BFS (breadth-first): Uses queue. Explores level by level. GUARANTEES shortest path in unweighted graphs. Use for: shortest path, level-order, "minimum steps", "nearest X".

DFS (depth-first): Uses stack (or recursion). Explores one branch completely before backtracking. Use for: connected components, cycle detection, topological sort, path existence, "explore all possibilities".

BFS template: queue + visited set + level tracking.
DFS template: recursive with visited set, or explicit stack.

GRID PROBLEMS are graph problems: each cell is a node, 4-directional neighbors are edges. "Number of islands" = connected components with DFS/BFS. "Shortest path in grid" = BFS.`,
      },
      {
        title: "Classic Graph Algorithms",
        content: `CONNECTED COMPONENTS: DFS from each unvisited node. Count = number of components.
CYCLE DETECTION (undirected): DFS — if neighbor is visited AND not parent → cycle.
CYCLE DETECTION (directed): DFS with 3 colors (white/gray/black). Gray→Gray = cycle.
TOPOLOGICAL SORT: BFS (Kahn's — process 0-indegree first) or DFS (reverse post-order).
SHORTEST PATH (unweighted): BFS. Guaranteed shortest.
SHORTEST PATH (weighted): Dijkstra (no negative edges) or Bellman-Ford (handles negatives).
MULTI-SOURCE BFS: Start BFS from ALL sources simultaneously. For "minimum distance from any source" problems.

Interview tip: always build the adjacency list first. Always track visited nodes. For "minimum" problems → BFS. For "explore all" problems → DFS.`,
      },
    ],
  },
  backtracking: {
    sections: [
      {
        title: "The Backtracking Framework",
        content: `Backtracking = DFS exploration of all choices with UNDO. At each step: make a choice, explore, undo the choice, try next option.

THE TEMPLATE:
  function backtrack(state, choices) {
    if (IS_COMPLETE) { addToResults(state); return; }
    for (const choice of choices) {
      if (isValid(choice)) {
        makeChoice(state, choice);     // CHOOSE
        backtrack(state, nextChoices);  // EXPLORE
        undoChoice(state, choice);      // UNDO
      }
    }
  }

The key difference from brute force: PRUNING. Check validity BEFORE recursing. If a choice leads to an invalid state, skip it entirely (don't explore + undo). This eliminates huge branches of the search tree.`,
      },
      {
        title: "Classic Backtracking Problems",
        content: `PERMUTATIONS: choices = unused elements. State = current arrangement. Complete when arrangement.length === n.
COMBINATIONS (n choose k): choices = elements from index to end. State = current combo. Complete when combo.length === k.
SUBSETS: for each element, choose to include or exclude. Or: iterate choices from current index.
N-QUEENS: place queens row by row. Validity: no same column, no same diagonal. Prune invalid placements.
SUDOKU: fill cells. Choices = 1-9. Validity: no duplicate in row/col/box. Backtrack on failure.
WORD SEARCH: DFS on grid with visited tracking. Backtrack by unmarking visited.

Interview tip: draw the DECISION TREE. Each level = one decision. Each branch = one choice. Pruning = cutting invalid branches before exploring them.`,
      },
    ],
  },
  greedy: {
    sections: [
      {
        title: "The Greedy Principle",
        content: `Greedy algorithms make the LOCALLY OPTIMAL choice at each step, hoping this leads to the GLOBAL optimum. Unlike DP (which considers all options), greedy commits to the best choice immediately and never looks back.

WHEN GREEDY WORKS: The problem must have the "greedy choice property" — a locally optimal choice is always part of some globally optimal solution. AND "optimal substructure" — optimal solution to the problem contains optimal solutions to subproblems.

PROOF: To verify greedy correctness, use "exchange argument" — assume a non-greedy solution exists, show you can swap a choice to the greedy one without worsening the result.

WARNING: Greedy doesn't always work. Classic failure: coin change with non-standard denominations. [1, 3, 4] with target 6: greedy picks 4+1+1=3 coins, optimal is 3+3=2 coins. When in doubt, use DP.`,
      },
      {
        title: "Classic Greedy Algorithms",
        content: `INTERVAL SCHEDULING: Sort by end time. Always pick the interval that ends earliest (maximizes remaining time for other intervals). Variations: meeting rooms, minimum platforms.

JUMP GAME: Track farthest reach from current position. If farthest ≥ end → possible. For minimum jumps: track the range of each jump level.

HUFFMAN CODING: Always merge the two smallest frequencies first. Uses a heap.

FRACTIONAL KNAPSACK: Sort by value/weight ratio. Always pick highest ratio item. Works because items are divisible.

TASK SCHEDULING: Sort by deadline (or penalty). Process in order that minimizes total cost.

Interview tip: greedy is fastest to code and run, but hardest to prove correct. Always ask: "Can I construct a case where the greedy choice isn't optimal?" If not → greedy is likely correct.`,
      },
    ],
  },
  "dynamic-programming": {
    sections: [
      {
        title: "The DP Mental Model",
        content: `Dynamic programming solves problems with OVERLAPPING SUBPROBLEMS and OPTIMAL SUBSTRUCTURE. It avoids recomputation by storing subproblem results.

THE PROCESS:
1. DEFINE STATE: dp[i] = "answer for input of size/index i". What does each cell mean?
2. RECURRENCE: dp[i] = f(dp[i-1], dp[i-2], ...). How does dp[i] relate to previous states?
3. BASE CASE: dp[0], dp[1] — trivial answers for smallest inputs.
4. ORDER: Fill dp table in order so dependencies are computed first.
5. ANSWER: Which cell contains the final answer? dp[n]? dp[n-1]? max(dp)?

TOP-DOWN (memoization): Recursive solution + cache. Natural, but stack overhead.
BOTTOM-UP (tabulation): Iterative fill of dp table. No stack overhead, often optimizable.`,
      },
      {
        title: "The Five DP Patterns",
        content: `1. LINEAR DP: dp[i] depends on dp[i-1], dp[i-2], etc. Examples: Fibonacci, climbing stairs, house robber, coin change.

2. KNAPSACK: dp[i][w] = best value using items 0..i with weight limit w. 0/1 knapsack (each item once) or unbounded (items reusable). Examples: subset sum, partition equal subset, coin change.

3. STRING DP: dp[i][j] = answer for first string[0..i] vs second string[0..j]. Examples: longest common subsequence, edit distance, word break.

4. INTERVAL DP: dp[l][r] = answer for range [l..r]. Fill by interval length. Examples: matrix chain, burst balloons.

5. GRID DP: dp[r][c] = answer reaching cell (r,c). Examples: unique paths, minimum path sum.

Interview tip: identify which pattern applies first. This narrows the state definition and recurrence immediately.`,
      },
      {
        title: "Space Optimization",
        content: `Many DP solutions use O(n) or O(n²) space but only reference the previous row/state. You can reduce space:

1D from 2D: If dp[i] only depends on dp[i-1], keep only two rows (prev and curr). Swap after each iteration. Reduces O(n²) → O(n).

For 0/1 knapsack: iterate weights BACKWARD to avoid using updated values. Reduces 2D dp[n][W] → 1D dp[W].

For linear DP: if dp[i] only depends on dp[i-1] and dp[i-2], keep only three variables. Fibonacci: O(n) → O(1) space.

Interview tip: always implement the straightforward solution first, then mention the space optimization as a follow-up.`,
      },
    ],
  },
  tries: {
    sections: [
      {
        title: "Trie Structure",
        content: `A trie (prefix tree) stores strings character by character. Each node has up to 26 children (one per letter). The path from root to a node spells a prefix.

INSERT: Walk the string character by character. Create missing nodes. Mark the end node.
SEARCH: Walk the string. If any character is missing → not found. If all present and end marked → found.
STARTS WITH: Same as search, but don't check end marker. If path exists → prefix exists.

Space: O(total characters × alphabet size). Time: O(string length) for all operations.

USE WHEN: You need prefix matching, autocomplete, or "word search" on a board (trie + DFS).`,
      },
      {
        title: "Classic Trie Problems",
        content: `Implement Trie: insert, search, startsWith — the building block for all trie problems.
Autocomplete/Suggest: Build trie, walk to prefix node, DFS to find all completions.
Word Search II: Build trie from word list, DFS the board, use trie to prune paths.
Longest Common Prefix: Insert all strings, walk trie until branching occurs.
Replace Words: Build trie from roots, for each word find shortest prefix root.

Interview tip: trie shines when you need to check MANY strings against MANY prefixes. For a single prefix check, a hash set is sufficient.`,
      },
    ],
  },
  "advanced-graphs": {
    sections: [
      {
        title: "Advanced Algorithms",
        content: `DIJKSTRA'S: Shortest path in weighted graphs (no negative edges). Uses min-heap. Process: always expand the lowest-cost unvisited node. Time: O((V+E) log V).

BELLMAN-FORD: Handles negative edge weights. Relax all edges V-1 times. Detects negative cycles. Time: O(VE).

TOPOLOGICAL SORT (Kahn's): BFS approach for DAGs. Process 0-indegree nodes first, remove their edges, repeat. Gives valid ordering.

UNION-FIND: Track connected components efficiently. Operations: find(x) — which component? union(x,y) — merge components. With path compression + rank: nearly O(1) amortized.

MINIMUM SPANNING TREE: Kruskal's (sort edges, add cheapest that doesn't create cycle) or Prim's (grow tree from any node, always add cheapest edge to tree). Time: O(E log E).`,
      },
    ],
  },
  "system-design-ds": {
    sections: [
      {
        title: "Design Problem Approach",
        content: `Design problems test your ability to combine data structures into working systems. The approach:

1. CLARIFY: What operations are needed? What's the expected scale?
2. API DESIGN: Define the public methods and their signatures.
3. DATA STRUCTURE SELECTION: Pick the structures that optimize the critical operations.
4. IMPLEMENTATION: Code it with clean methods.
5. COMPLEXITY ANALYSIS: Verify all operations meet requirements.

Classic: LRU Cache (HashMap + doubly linked list for O(1) get/put), Design Twitter (HashMap + Heap for O(1) follow, O(k log k) feed), Min Stack (Stack + auxiliary min tracking).

Interview tip: start with the OPERATIONS. "What needs to be fast?" This determines which data structures to use.`,
      },
    ],
  },
  "advanced-dp": {
    sections: [
      {
        title: "Advanced Patterns",
        content: `STATE MACHINE DP: dp[i][state] where state represents a finite set of conditions. Examples: stock problems (hold/sold/cooldown), string editing (insert/delete/replace).

DIGIT DP: Count numbers in range [0..N] satisfying property X. Process N digit by digit. State: current digit position, tight constraint (still bounded by N?), property flags.

BITMASK DP: dp[mask] where mask is a bitmask of which items have been used. For problems on small sets (n ≤ 20). Examples: traveling salesman, task assignment.

DP ON TREES: dp[node] = answer for subtree rooted at node. Combine children results. Examples: tree diameter, maximum path sum.

DP WITH OPTIMIZATION: Convex hull trick, divide and conquer optimization — for when the naive DP recurrence is O(n²) and can be optimized to O(n log n).`,
      },
    ],
  },
  "string-algorithms": {
    sections: [
      {
        title: "String Techniques",
        content: `SLIDING WINDOW on strings: character frequency tracking, "longest substring without repeating" (variable window + set), "minimum window substring" (variable window + need/have).

HASH on strings: Rolling hash for substring matching. Polynomial hash: H = s[0]×p^(n-1) + s[1]×p^(n-2) + ... + s[n-1]. Update in O(1) by subtracting left character and adding right.

KMP (Knuth-Morris-Pratt): Pattern matching in O(n+m). Build failure function (prefix table), then scan text — on mismatch, jump using failure function instead of restarting.

RABIN-KARP: Pattern matching using rolling hash. Average O(n+m), worst O(nm) with hash collisions.

TRIE for prefix operations: Build trie from dictionary, walk string against trie for word break, autocomplete, replace words.

Interview tip: most string problems reduce to: sliding window + frequency map, or DP on characters, or hash-based matching.`,
      },
    ],
  },
};
