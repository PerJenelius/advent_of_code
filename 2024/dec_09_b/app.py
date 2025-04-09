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
            expanded_array.append({"index": block_index, "length": operator})
            block_index += 1
        else:
            expanded_array.append({"index": ".", "length": operator})
    return expanded_array


def get_contracted_list(expanded_list: list):
    for block_index in range(len(expanded_list)):
        movable_block = expanded_list[-(1 + block_index)]
        if movable_block["index"] == ".":
            continue
        for dot_index in range(len(expanded_list)):
            block = expanded_list[dot_index]
            if block == movable_block:
                break
            if block["index"] == ".": 
                if block["length"] == movable_block["length"]:
                    block["index"] = movable_block["index"]
                    movable_block["index"] = "."
                    break
                elif block["length"] > movable_block["length"]:
                    block["length"] -= movable_block["length"]
                    expanded_list.insert(dot_index, {"index": movable_block["index"], "length": movable_block["length"]})
                    movable_block["index"] = "."
                    break
    return expanded_list


def get_checksum(data: str):
    checksum = 0
    expanded_list = get_expanded_list(data)
    contracted_list = get_contracted_list(expanded_list)
    concat_string = ""
    for block in contracted_list:
        block_string = ""
        for index in range(int(block["length"])):
            block_string += str(block["index"])
        concat_string += block_string
    character_index = 0
    for index in range(len(contracted_list)):
        block = contracted_list[index]
        if block["index"] == ".":
            character_index += int(block["length"])
            continue
        character = int(block["index"])
        for block_part in range(int(block["length"])):
            checksum += character_index * character
            character_index += 1
    return checksum


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 2858

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