import { CodeSnippet } from '../types/codeRunner';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'java-binary-search',
    title: 'Java: Binary Search Algorithm',
    language: 'java',
    description: 'Classic efficient logarithmic search on a sorted integer array.',
    code: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid; // Target found
            }
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1; // Target not found
    }

    public static void main(String[] args) {
        int[] sortedNumbers = { 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 };
        int target = 23;
        
        System.out.println("Searching for target: " + target);
        int index = binarySearch(sortedNumbers, target);
        
        if (index != -1) {
            System.out.println("Success! Element found at index: " + index);
            System.out.println("Verification: sortedNumbers[" + index + "] = " + sortedNumbers[index]);
        } else {
            System.out.println("Element not found in array.");
        }
    }
}`,
    expectedOutput: `Searching for target: 23\nSuccess! Element found at index: 5\nVerification: sortedNumbers[5] = 23\nProcess finished with exit code 0`,
    complexity: {
      time: 'O(log N)',
      space: 'O(1)',
      explanation: 'Binary Search halves the search space in each iteration, resulting in logarithmic time complexity.'
    }
  },
  {
    id: 'java-lru-cache',
    title: 'Java: LRU Cache (Least Recently Used)',
    language: 'java',
    description: 'High-performance cache implementation using HashMap and Doubly Linked List.',
    code: `import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    static class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(tail.prev);
        }
        insert(new Node(key, value));
    }

    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insert(Node node) {
        map.put(node.key, node);
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        System.out.println("Initializing LRUCache with capacity 2...");
        
        cache.put(1, 100);
        cache.put(2, 200);
        System.out.println("cache.get(1) -> " + cache.get(1) + " (Expected: 100)");

        cache.put(3, 300); // evicts key 2
        System.out.println("cache.get(2) -> " + cache.get(2) + " (Expected: -1, evicted)");
        
        cache.put(4, 400); // evicts key 1
        System.out.println("cache.get(1) -> " + cache.get(1) + " (Expected: -1, evicted)");
        System.out.println("cache.get(3) -> " + cache.get(3) + " (Expected: 300)");
        System.out.println("cache.get(4) -> " + cache.get(4) + " (Expected: 400)");
    }
}`,
    expectedOutput: `Initializing LRUCache with capacity 2...\ncache.get(1) -> 100 (Expected: 100)\ncache.get(2) -> -1 (Expected: -1, evicted)\ncache.get(1) -> -1 (Expected: -1, evicted)\ncache.get(3) -> 300 (Expected: 300)\ncache.get(4) -> 400 (Expected: 400)\nProcess finished with exit code 0`,
    complexity: {
      time: 'O(1) Get & Put',
      space: 'O(Capacity)',
      explanation: 'Hash map provides O(1) key lookups while doubly linked list provides O(1) element repositioning.'
    }
  },
  {
    id: 'python-data-pipeline',
    title: 'Python: Data Transformation & Aggregation',
    language: 'python',
    description: 'Extract, clean, and aggregate metrics from semi-structured JSON records.',
    code: `import json
from collections import defaultdict

raw_transactions = [
    {"user_id": "usr_91", "amount": 120.50, "category": "Cloud Services", "status": "completed"},
    {"user_id": "usr_92", "amount": 49.00,  "category": "Subscriptions",  "status": "completed"},
    {"user_id": "usr_91", "amount": 350.00, "category": "Cloud Services", "status": "completed"},
    {"user_id": "usr_93", "amount": 99.00,  "category": "Hardware",       "status": "failed"},
    {"user_id": "usr_92", "amount": 150.00, "category": "Subscriptions",  "status": "completed"}
]

def process_metrics(records):
    category_totals = defaultdict(float)
    user_spend = defaultdict(float)
    successful_tx_count = 0

    for tx in records:
        if tx.get("status") == "completed":
            amount = tx["amount"]
            cat = tx["category"]
            uid = tx["user_id"]
            
            category_totals[cat] += amount
            user_spend[uid] += amount
            successful_tx_count += 1

    return {
        "total_processed_tx": successful_tx_count,
        "revenue_by_category": dict(category_totals),
        "top_spender": max(user_spend.items(), key=lambda x: x[1])
    }

metrics = process_metrics(raw_transactions)
print("--- Aggregated Financial Pipeline Summary ---")
print(json.dumps(metrics, indent=2))
`,
    expectedOutput: `--- Aggregated Financial Pipeline Summary ---\n{\n  "total_processed_tx": 4,\n  "revenue_by_category": {\n    "Cloud Services": 470.5,\n    "Subscriptions": 199.0\n  },\n  "top_spender": [\n    "usr_91",\n    470.5\n  ]\n}\nProcess finished with exit code 0`,
    complexity: {
      time: 'O(N)',
      space: 'O(U + C)',
      explanation: 'Linear one-pass scan through records with dictionary hashing for user and category lookups.'
    }
  },
  {
    id: 'sql-analytics-query',
    title: 'SQL: User Retention & Revenue Window Query',
    language: 'sql',
    description: 'PostgreSQL window functions calculating running revenue totals and rank.',
    code: `-- Calculate Monthly Revenue, Running Totals, and Growth Rate
WITH monthly_metrics AS (
    SELECT 
        DATE_TRUNC('month', created_at) AS billing_month,
        COUNT(DISTINCT user_id) AS active_subscribers,
        SUM(amount_usd) AS monthly_revenue
    FROM subscriptions
    WHERE status = 'active'
    GROUP BY 1
)
SELECT 
    billing_month,
    active_subscribers,
    monthly_revenue,
    SUM(monthly_revenue) OVER (ORDER BY billing_month) AS cumulative_revenue,
    ROUND(
        (monthly_revenue - LAG(monthly_revenue, 1) OVER (ORDER BY billing_month)) 
        / LAG(monthly_revenue, 1) OVER (ORDER BY billing_month) * 100, 
        2
    ) AS mom_growth_percentage
FROM monthly_metrics
ORDER BY billing_month DESC;`,
    expectedOutput: `billing_month | active_subscribers | monthly_revenue | cumulative_revenue | mom_growth_percentage\n--------------+--------------------+-----------------+--------------------+----------------------\n2026-08-01    | 1,420              | $114,280.00     | $446,180.00        | +20.93%\n2026-07-01    | 1,180              | $94,500.00      | $331,900.00        | +19.77%\n2026-06-01    | 990                | $78,900.00      | $237,400.00        | +22.90%\n(3 rows returned in 14.2ms)`,
    complexity: {
      time: 'O(N log N)',
      space: 'O(N)',
      explanation: 'Uses CTE with window functions for single-pass aggregation and sorting.'
    }
  },
  {
    id: 'cpp-quick-sort',
    title: 'C++: QuickSort Algorithm',
    language: 'cpp',
    description: 'In-place divide and conquer sorting algorithm with median pivot selection.',
    code: `#include <iostream>
#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> numbers = { 64, 34, 25, 12, 22, 11, 90, 88, 45, 5 };
    
    std::cout << "Original Array: ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;

    quickSort(numbers, 0, numbers.size() - 1);

    std::cout << "Sorted Array:   ";
    for (int n : numbers) std::cout << n << " ";
    std::cout << std::endl;
    
    return 0;
}`,
    expectedOutput: `Original Array: 64 34 25 12 22 11 90 88 45 5 \nSorted Array:   5 11 12 22 25 34 45 64 88 90 \nProcess finished with exit code 0`,
    complexity: {
      time: 'O(N log N) Avg',
      space: 'O(log N)',
      explanation: 'Partitioning provides efficient in-place sorting with minimal stack memory overhead.'
    }
  }
];
