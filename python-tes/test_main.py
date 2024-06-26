def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            result.append(item)
            seen.add(item)
    return result

def test_remove_duplicates():
    assert remove_duplicates([1, 2, 3, 2, 4, 1, 5]) == [1, 2, 3, 4, 5]
    assert remove_duplicates(['a', 'b', 'a', 'c', 'b', 'd']) == ['a', 'b', 'c', 'd']
    assert remove_duplicates([1, 1, 1, 1, 1]) == [1]
    assert remove_duplicates([]) == []
    assert remove_duplicates([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    assert remove_duplicates(['a', 'b', 'c', 'a', 'b', 'c']) == ['a', 'b', 'c']

if __name__ == '__main__':
    import pytest
    pytest.main(['-v', 'test_main.py'])