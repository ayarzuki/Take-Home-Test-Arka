import unittest

def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            result.append(item)
            seen.add(item)
    return result

print(remove_duplicates([1, 2, 3, 2, 4, 1, 5]))

class TestRemoveDuplicates(unittest.TestCase):
    
    def test_remove_duplicates_with_numbers(self):
        self.assertEqual(remove_duplicates([1, 2, 3, 2, 4, 1, 5]), [1, 2, 3, 4, 5])
        self.assertEqual(remove_duplicates([1, 1, 1, 1, 1]), [1])
        self.assertEqual(remove_duplicates([]), [])
        self.assertEqual(remove_duplicates([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])

    def test_remove_duplicates_with_strings(self):
        self.assertEqual(remove_duplicates(['a', 'b', 'a', 'c', 'b', 'd']), ['a', 'b', 'c', 'd'])
        self.assertEqual(remove_duplicates(['a', 'b', 'c', 'a', 'b', 'c']), ['a', 'b', 'c'])

    # def test_remove_duplicates_for_errors(self):
    #     self.assertEqual(remove_duplicates(['a', 'b', 'a', 'c', 'b', 'd', 'e']), ['a', 'b', 'c', 'd'])
    #     self.assertEqual(remove_duplicates(['a', 'b', 'c', 'a', 'b', 'c', 'e']), ['a', 'b', 'c'])

if __name__ == '__main__':
    unittest.main(verbosity=2)
