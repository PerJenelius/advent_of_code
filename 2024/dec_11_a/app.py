import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_stone_count(data: str):
    stones = []
    stone_strings = data.split(" ")
    for stone_string in stone_strings:
        stones.append(int(stone_string))
    for blink_index in range(25):
        new_stones = []
        for stone in stones:
            if stone == 0:
                new_stones.append(1)
            elif len(str(stone)) % 2 == 0:
                stone_string = str(stone)
                stone_1 = int(stone_string[:len(stone_string) // 2])
                stone_2 = int(stone_string[len(stone_string) // 2:])
                new_stones.append(stone_1)
                new_stones.append(stone_2)
            else:
                new_stones.append(2024 * stone)
        stones = new_stones
    return len(stones)


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 55312

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_stone_count(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_stone_count(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()