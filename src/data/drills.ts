// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const INTERVIEW_PROBLEMS: any[] = [
  {
    id: "iv-01",
    title: "Two Sum",
    pattern: "Hash Map",
    difficulty: "Easy",
    combo: "Array + Hash Map",
    desc: "O(n) with complement lookup.",
  },
  {
    id: "iv-02",
    title: "Longest Substring Without Repeating",
    pattern: "Sliding Window",
    difficulty: "Medium",
    combo: "String + Window + Hash",
    desc: "Variable window, jump past duplicate.",
  },
  {
    id: "iv-03",
    title: "Number of Islands",
    pattern: "Graph DFS/BFS",
    difficulty: "Medium",
    combo: "Graph + Grid DFS",
    desc: "Sink each island as you count.",
  },
  {
    id: "iv-04",
    title: "Merge K Sorted Lists",
    pattern: "Heap",
    difficulty: "Hard",
    combo: "Heap + Linked List",
    desc: "Min-heap of K list heads.",
  },
  {
    id: "iv-05",
    title: "LRU Cache",
    pattern: "HashMap + DLL",
    difficulty: "Medium",
    combo: "Design + DS combo",
    desc: "O(1) get/put with doubly linked list.",
  },
  {
    id: "iv-06",
    title: "Word Break",
    pattern: "DP + Trie",
    difficulty: "Medium",
    combo: "DP + String",
    desc: "dp[i] = can s[0..i] be segmented?",
  },
  {
    id: "iv-07",
    title: "Course Schedule II",
    pattern: "Topological Sort",
    difficulty: "Medium",
    combo: "Graph + BFS",
    desc: "Kahn's — process 0-indegree first.",
  },
  {
    id: "iv-08",
    title: "Serialize/Deserialize Binary Tree",
    pattern: "Tree + BFS",
    difficulty: "Hard",
    combo: "Tree + Design",
    desc: "BFS with null markers.",
  },
  {
    id: "iv-09",
    title: "Find Median from Data Stream",
    pattern: "Two Heaps",
    difficulty: "Hard",
    combo: "Heap + Design",
    desc: "Max-heap lower half, min-heap upper.",
  },
  {
    id: "iv-10",
    title: "Coin Change",
    pattern: "Dynamic Programming",
    difficulty: "Medium",
    combo: "DP + Knapsack",
    desc: "Unbounded knapsack, iterate amounts.",
  },
  {
    id: "iv-11",
    title: "Trapping Rain Water",
    pattern: "Two Pointers",
    difficulty: "Hard",
    combo: "Array + Two Pointers",
    desc: "Process smaller side, O(1) space.",
  },
  {
    id: "iv-12",
    title: "Sliding Window Maximum",
    pattern: "Monotonic Deque",
    difficulty: "Hard",
    combo: "Queue + Sliding Window",
    desc: "Deque stores indices, front = max.",
  },
  {
    id: "iv-13",
    title: "Valid Parentheses",
    pattern: "Stack",
    difficulty: "Easy",
    combo: "Stack + String",
    desc: "Push open, pop+check close.",
  },
  {
    id: "iv-14",
    title: "Binary Tree Maximum Path Sum",
    pattern: "Tree DFS",
    difficulty: "Hard",
    combo: "Tree + DFS",
    desc: "Bottom-up: at each node = left+ + right+ + val.",
  },
  {
    id: "iv-15",
    title: "Longest Increasing Subsequence",
    pattern: "DP / Binary Search",
    difficulty: "Medium",
    combo: "DP + BSearch",
    desc: "O(n²) DP or O(n log n) patience.",
  },
  {
    id: "iv-16",
    title: "Pacific Atlantic Water Flow",
    pattern: "Multi-source BFS",
    difficulty: "Medium",
    combo: "Graph + Grid BFS",
    desc: "BFS from both coasts, find intersection.",
  },
  {
    id: "iv-17",
    title: "3Sum",
    pattern: "Two Pointers",
    difficulty: "Medium",
    combo: "Array + Two Pointers",
    desc: "Sort, fix i, two-pointer remainder.",
  },
  {
    id: "iv-18",
    title: "Jump Game II",
    pattern: "Greedy",
    difficulty: "Medium",
    combo: "Array + Greedy",
    desc: "Track farthest reach per jump level.",
  },
  {
    id: "iv-19",
    title: "N-Queens",
    pattern: "Backtracking",
    difficulty: "Hard",
    combo: "Backtracking + Matrix",
    desc: "Track cols, diags; DFS row by row.",
  },
  {
    id: "iv-20",
    title: "Reorder List",
    pattern: "Linked List",
    difficulty: "Medium",
    combo: "LinkedList + Three Techniques",
    desc: "Find mid, reverse second, merge.",
  },
  {
    id: "iv-21",
    title: "Minimum Window Substring",
    pattern: "Sliding Window",
    difficulty: "Hard",
    combo: "String + Window + Map",
    desc: "Expand/shrink with frequency tracking.",
  },
  {
    id: "iv-22",
    title: "Daily Temperatures",
    pattern: "Monotonic Stack",
    difficulty: "Medium",
    combo: "Stack + Array",
    desc: "Decreasing stack, pop when warmer found.",
  },
  {
    id: "iv-23",
    title: "Partition Equal Subset Sum",
    pattern: "0/1 Knapsack DP",
    difficulty: "Medium",
    combo: "DP + Math",
    desc: "dp[j] = can we make sum j? Iterate backward.",
  },
  {
    id: "iv-24",
    title: "Word Search II",
    pattern: "Trie + DFS",
    difficulty: "Hard",
    combo: "Trie + Backtracking",
    desc: "Build trie, DFS board, prune with trie.",
  },
  {
    id: "iv-25",
    title: "Design Twitter",
    pattern: "Heap + HashMap",
    difficulty: "Medium",
    combo: "OOP + DS Design",
    desc: "Top-10 tweets across users with heap.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PATTERN_DRILLS: any[] = [
  {
    q: "Your problem asks for the SHORTEST PATH in an unweighted graph.",
    a: "BFS",
    hint: "BFS guarantees minimum hops, DFS does not.",
  },
  {
    q: "You need to find ALL combinations/subsets of elements.",
    a: "Backtracking",
    hint: "Decision tree — include or exclude each element.",
  },
  {
    q: "You see a sorted array and need O(log n) search.",
    a: "Binary Search",
    hint: "Discard half the search space each step.",
  },
  {
    q: "You need O(1) lookups to eliminate a nested loop.",
    a: "Hash Map",
    hint: "Precompute: store seen values for instant lookup.",
  },
  {
    q: "Problem involves a CONTIGUOUS subarray with a constraint.",
    a: "Sliding Window",
    hint: "Expand right, shrink left when constraint violated.",
  },
  {
    q: "Finding a PAIR of elements that sum to target.",
    a: "Two Pointers (sorted) or Hash Map",
    hint: "Sort first → two pointers. Unsorted → hash map.",
  },
  {
    q: "Need to process the LARGEST or SMALLEST element repeatedly.",
    a: "Heap / Priority Queue",
    hint: "O(log n) insert, O(1) peek.",
  },
  {
    q: "Tree problem asks for HEIGHT, DIAMETER, or LCA.",
    a: "DFS (bottom-up)",
    hint: "Return value from children, combine at parent.",
  },
  {
    q: "Dependencies or ordering problem (courses, tasks).",
    a: "Topological Sort",
    hint: "DAG — Kahn's BFS or DFS with post-order.",
  },
  {
    q: "You're asked if something MATCHES or CYCLES in a linked list.",
    a: "Fast/Slow Pointers",
    hint: "Hare and tortoise — they meet iff cycle exists.",
  },
  {
    q: "Count/find SUBARRAYS with sum equal to K.",
    a: "Prefix Sum + Hash Map",
    hint: "If prefix[j]-prefix[i]=k, subarray [i+1,j] sums to k.",
  },
  {
    q: "Find MAXIMUM non-overlapping intervals or min interval removals.",
    a: "Greedy (sort by end time)",
    hint: "Take earliest-ending interval to leave max room.",
  },
  {
    q: "String PREFIX matching, autocomplete, or word search.",
    a: "Trie",
    hint: "Shared prefixes → tree structure for O(L) ops.",
  },
  {
    q: "Problem has overlapping subproblems + optimal substructure.",
    a: "Dynamic Programming",
    hint: "Memoize top-down or tabulate bottom-up.",
  },
  {
    q: "Need to validate or evaluate bracket/operator expressions.",
    a: "Stack",
    hint: "LIFO matches the nested structure of expressions.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MOCK_PROBLEMS: any[] = [
  {
    id: "m1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Hash Map",
    time: 15,
    desc: "Return indices of two numbers that sum to target.",
    hint: "Use a hash map to look up the complement in O(1).",
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
}`,
  },
  {
    id: "m2",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph DFS",
    time: 20,
    desc: "Count islands in a 2D grid of '1's and '0's.",
    hint: "DFS from each '1', sink the island to avoid revisit.",
    solution: `function numIslands(grid) {
  let count = 0;
  function dfs(r,c) {
    if(r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]==='0') return;
    grid[r][c]='0';
    dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);
  }
  for(let r=0;r<grid.length;r++)
    for(let c=0;c<grid[0].length;c++)
      if(grid[r][c]==='1'){dfs(r,c);count++;}
  return count;
}`,
  },
  {
    id: "m3",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    time: 25,
    desc: "Find minimum coins to make amount. Return -1 if impossible.",
    hint: "dp[i] = min coins for amount i. Transition: dp[i] = min(dp[i-c]+1) for each coin c.",
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount+1).fill(Infinity);
  dp[0] = 0;
  for(let a=1;a<=amount;a++)
    for(const c of coins)
      if(c<=a) dp[a] = Math.min(dp[a], 1+dp[a-c]);
  return dp[amount]===Infinity ? -1 : dp[amount];
}`,
  },
  {
    id: "m4",
    title: "Binary Tree Max Path Sum",
    difficulty: "Hard",
    category: "Tree DFS",
    time: 30,
    desc: "Find maximum path sum (path can start/end at any node).",
    hint: "At each node: left contribution + right contribution + node.val. Track global max.",
    solution: `function maxPathSum(root) {
  let max = -Infinity;
  function dfs(node) {
    if(!node) return 0;
    const l = Math.max(0, dfs(node.left));
    const r = Math.max(0, dfs(node.right));
    max = Math.max(max, l + r + node.val);
    return node.val + Math.max(l, r);
  }
  dfs(root); return max;
}`,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MIXED_PATTERNS: any[] = [
  {
    id: "mp-1",
    title: "Minimum Window Substring",
    tags: ["Sliding Window", "Hash Map"],
    difficulty: "Hard",
    description:
      "Find the minimum window in s that contains all characters of t.",
    insight:
      "Variable window: expand right until valid, then shrink left. Track 'formed' count to know when window is valid.",
    code: `function minWindow(s, t) {
  const need=new Map(), win=new Map();
  for(const c of t) need.set(c,(need.get(c)||0)+1);
  let l=0,formed=0,required=need.size,minLen=Infinity,minStart=0;
  for(let r=0;r<s.length;r++) {
    const c=s[r]; win.set(c,(win.get(c)||0)+1);
    if(need.has(c)&&win.get(c)===need.get(c)) formed++;
    while(formed===required) {
      if(r-l+1<minLen){minLen=r-l+1;minStart=l;}
      const lc=s[l]; win.set(lc,win.get(lc)-1);
      if(need.has(lc)&&win.get(lc)<need.get(lc)) formed--;
      l++;
    }
  }
  return minLen===Infinity?"":s.slice(minStart,minStart+minLen);
}`,
  },
  {
    id: "mp-2",
    title: "Alien Dictionary",
    tags: ["Graph", "Topological Sort", "BFS"],
    difficulty: "Hard",
    description:
      "Given sorted words in alien language, determine the character order.",
    insight:
      "Build a directed graph from adjacent word comparisons. Topological sort gives the order. Handle edge cases: prefix word after longer word = invalid.",
    code: `function alienOrder(words) {
  const adj=new Map(), indeg=new Map();
  for(const w of words) for(const c of w) if(!adj.has(c)){adj.set(c,[]);indeg.set(c,0);}
  for(let i=0;i<words.length-1;i++) {
    const [a,b]=words.slice(i,i+2);
    let found=false;
    for(let j=0;j<Math.min(a.length,b.length);j++) {
      if(a[j]!==b[j]) {
        adj.get(a[j]).push(b[j]);
        indeg.set(b[j],indeg.get(b[j])+1);
        found=true; break;
      }
    }
    if(!found&&a.length>b.length) return ""; // invalid
  }
  const q=[...indeg.entries()].filter(([,d])=>d===0).map(([c])=>c);
  let order="";
  while(q.length){const c=q.shift();order+=c;for(const n of adj.get(c)){indeg.set(n,indeg.get(n)-1);if(indeg.get(n)===0)q.push(n);}}
  return order.length===adj.size?order:"";
}`,
  },
  {
    id: "mp-3",
    title: "Trapping Rain Water II",
    tags: ["Heap", "BFS", "Grid"],
    difficulty: "Hard",
    description: "3D version: find water trapped in a 3D elevation map.",
    insight:
      "Process cells in order of height using min-heap (like Dijkstra). Water level for inner cell = max(heap boundary, height). BFS outward from boundary.",
    code: `function trapRainWater(heightMap) {
  const R=heightMap.length,C=heightMap[0].length;
  if(R<3||C<3) return 0;
  const visited=Array.from({length:R},()=>new Array(C).fill(false));
  // Min-heap of [height,r,c]
  const heap=[];
  const push=(h,r,c)=>{heap.push([h,r,c]);heap.sort((a,b)=>a[0]-b[0]);};
  for(let r=0;r<R;r++) for(let c=0;c<C;c++)
    if(r===0||r===R-1||c===0||c===C-1){push(heightMap[r][c],r,c);visited[r][c]=true;}
  let water=0;
  while(heap.length) {
    const [h,r,c]=heap.shift();
    for(const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr=r+dr,nc=c+dc;
      if(nr<0||nr>=R||nc<0||nc>=C||visited[nr][nc]) continue;
      visited[nr][nc]=true;
      water+=Math.max(0,h-heightMap[nr][nc]);
      push(Math.max(h,heightMap[nr][nc]),nr,nc);
    }
  }
  return water;
}`,
  },
  {
    id: "mp-4",
    title: "Longest Consecutive Sequence",
    tags: ["Hash Set", "Greedy"],
    difficulty: "Medium",
    description: "Find longest consecutive element sequence in O(n).",
    insight:
      "HashSet + only start counting from sequence beginnings (num-1 not in set). This avoids O(n²) while scanning.",
    code: `function longestConsecutive(nums) {
  const set=new Set(nums);
  let best=0;
  for(const n of set) {
    if(!set.has(n-1)) {
      let len=1,cur=n;
      while(set.has(++cur)) len++;
      best=Math.max(best,len);
    }
  }
  return best;
}`,
  },
  {
    id: "mp-5",
    title: "Word Ladder",
    tags: ["BFS", "Hash Map", "Graph"],
    difficulty: "Hard",
    description:
      "Shortest transformation sequence from beginWord to endWord, changing one letter at a time.",
    insight:
      "BFS from beginWord. For each word, generate all 1-char variations — if in wordSet, add to queue. BFS guarantees shortest path.",
    code: `function ladderLength(begin,end,wordList) {
  const set=new Set(wordList);
  if(!set.has(end)) return 0;
  const q=[[begin,1]],vis=new Set([begin]);
  while(q.length) {
    const [word,steps]=q.shift();
    for(let i=0;i<word.length;i++) {
      for(let c=97;c<=122;c++) {
        const nw=word.slice(0,i)+String.fromCharCode(c)+word.slice(i+1);
        if(nw===end) return steps+1;
        if(set.has(nw)&&!vis.has(nw)){vis.add(nw);q.push([nw,steps+1]);}
      }
    }
  }
  return 0;
}`,
  },
  {
    id: "mp-6",
    title: "Maximum Frequency Stack",
    tags: ["Hash Map", "Stack", "Design"],
    difficulty: "Hard",
    description:
      "Design a stack that pops the most frequent element (ties broken by recency).",
    insight:
      "freq map + group map (freq→stack of elements). Track maxFreq. Pop from group[maxFreq] stack — if empty, decrement maxFreq.",
    code: `class FreqStack {
  constructor(){this.freq=new Map();this.group=new Map();this.maxFreq=0;}
  push(val){
    const f=(this.freq.get(val)||0)+1;
    this.freq.set(val,f);this.maxFreq=Math.max(this.maxFreq,f);
    if(!this.group.has(f))this.group.set(f,[]);
    this.group.get(f).push(val);
  }
  pop(){
    const top=this.group.get(this.maxFreq).pop();
    this.freq.set(top,this.freq.get(top)-1);
    if(!this.group.get(this.maxFreq).length) this.maxFreq--;
    return top;
  }
}`,
  },
];
