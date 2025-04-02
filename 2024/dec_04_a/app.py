import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def find_all_occurences(data: str, keyword: str):
    occurences_count = 0
    wordsearch = data.split("\n")
    for line_index in range(len(wordsearch)):
        for letter_index in range(len(wordsearch[line_index])):
            if wordsearch[line_index][letter_index] != keyword[0]:
                continue
            for line_modifier in range(-1, 2):
                for letter_modifier in range(-1, 2):
                    if line_modifier == 0 and letter_modifier == 0:
                        continue
                    correct_count = 0
                    for keyword_index in range(1, len(keyword)):
                        line_i = line_index + line_modifier * keyword_index
                        letter_i = letter_index + letter_modifier * keyword_index
                        if line_i < 0 or line_i >= len(wordsearch):
                            continue
                        if letter_i < 0 or letter_i >= len(wordsearch[line_i]):
                            continue
                        check_letter = wordsearch[line_i][letter_i].lower()
                        keyword_letter = keyword[keyword_index].lower()
                        if check_letter == keyword_letter:
                            correct_count += 1
                        else:
                            break

                    if correct_count == len(keyword) - 1:
                        occurences_count += 1
    return occurences_count


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 18

    start_time = time.time()
    print(f"Calculating...\n")

    keyword = "XMAS"

    test_data = get_indata(file_definitions[0])
    test_result = find_all_occurences(test_data, keyword)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = find_all_occurences(data, keyword)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()