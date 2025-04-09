import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_expanded_list(data: str):
    expanded_array = []
    block_index = 0
    for data_index in range(len(data)):
        operator = int(data[data_index])
        if data_index % 2 == 0:
            for index in range(operator):
                expanded_array.append(str(block_index))
            block_index += 1
        else:
            for index in range(operator):
                expanded_array.append(".")
    return expanded_array


def get_contracted_list(expanded_list: list):
    while "." in expanded_list:
        movable_block = expanded_list[-1]
        if movable_block != ".":
            first_dot_index = expanded_list.index(".")
            expanded_list[first_dot_index] = movable_block
        del expanded_list[-1]
    return expanded_list


def get_checksum(data: str):
    checksum = 0
    expanded_list = get_expanded_list(data)
    contracted_list = get_contracted_list(expanded_list)
    for index in range(len(contracted_list)):
        character = int(contracted_list[index])
        checksum += index * character
    return checksum


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 1928

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_checksum(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_checksum(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()