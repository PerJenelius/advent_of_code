import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def find_all_occurences(data: str):
    occurences = 0
    wordsearch = data.split("\n")
    for line_index in range(len(wordsearch)):
        for letter_index in range(len(wordsearch[line_index])):
            correctness = 0
            if wordsearch[line_index][letter_index] != "A":
                continue
            if line_index - 1 < 0 or line_index + 1 >= len(wordsearch):
                continue
            if letter_index - 1 < 0 or letter_index + 1 >= len(wordsearch[line_index]):
                continue

            if wordsearch[line_index - 1][letter_index - 1] == "M" and wordsearch[line_index + 1][letter_index + 1] == "S":
                correctness += 1
            elif wordsearch[line_index - 1][letter_index - 1] == "S" and wordsearch[line_index + 1][letter_index + 1] == "M":
                correctness += 1

            if wordsearch[line_index - 1][letter_index + 1] == "M" and wordsearch[line_index + 1][letter_index - 1] == "S":
                correctness += 1
            elif wordsearch[line_index - 1][letter_index + 1] == "S" and wordsearch[line_index + 1][letter_index - 1] == "M":
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
    test_result = find_all_occurences(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = find_all_occurences(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()