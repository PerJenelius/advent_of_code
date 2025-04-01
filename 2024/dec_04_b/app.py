import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        content = file.readlines()
        return content


def find_all_occurences(data: str):
    occurences = 0
    for line_index in range(len(data)):
        for letter_index in range(len(data[line_index])):
            correctness = 0
            if data[line_index][letter_index] != "A":
                continue
            if line_index - 1 < 0 or line_index + 1 >= len(data):
                continue
            if letter_index - 1 < 0 or letter_index + 1 >= len(data[line_index]):
                continue
            if data[line_index - 1][letter_index - 1] == "M" and data[line_index + 1][letter_index + 1] == "S":
                correctness += 1
            elif data[line_index - 1][letter_index - 1] == "S" and data[line_index + 1][letter_index + 1] == "M":
                correctness += 1
            if data[line_index - 1][letter_index + 1] == "M" and data[line_index + 1][letter_index - 1] == "S":
                correctness += 1
            elif data[line_index - 1][letter_index + 1] == "S" and data[line_index + 1][letter_index - 1] == "M":
                correctness += 1
            if correctness == 2:
                occurences += 1
    return occurences


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 9

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_discrepancy = find_all_occurences(test_data)
    print("Test Result:", test_discrepancy)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    discrepancy = find_all_occurences(data)
    print("Real Result:", discrepancy)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()