import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def find_antinode_locations(data:str):
    antinode_locations = []
    lines = data.split("\n")
    for line_index in range(len(lines)):
        old_line = lines[line_index]
        for letter_index in range(len(old_line)):
            old_symbol = old_line[letter_index]
            if old_symbol == ".":
                continue
            for line_i in range(line_index, len(lines)):
                new_line = lines[line_i]
                for letter_i in range(len(new_line)):
                    if line_i == line_index and letter_i <= letter_index:
                        continue
                    new_symbol = new_line[letter_i]
                    if new_symbol != old_symbol:
                        continue

                    old_coordinates = {"line": line_index, "letter": letter_index}
                    if not old_coordinates in antinode_locations:
                        antinode_locations.append(old_coordinates)
                    new_coordinates = {"line": line_i, "letter": letter_i}
                    if not new_coordinates in antinode_locations:
                        antinode_locations.append(new_coordinates)

                    line_diff = line_i - line_index
                    letter_diff = letter_i - letter_index

                    calculating = True
                    increment = 1
                    while calculating:
                        line_1 = line_index - increment * line_diff
                        letter_1 = letter_index - increment * letter_diff
                        if line_1 >= 0 and letter_1 >= 0 and letter_1 < len(new_line):
                            new_coordinates = {"line": line_1, "letter": letter_1}
                            if not new_coordinates in antinode_locations:
                                antinode_locations.append(new_coordinates)
                            increment += 1
                        else:
                            calculating = False

                    calculating = True
                    increment = 1
                    while calculating:
                        line_2 = line_i + increment * line_diff
                        letter_2 = letter_i + increment * letter_diff
                        if line_2 < len(lines) and letter_2 >= 0 and letter_2 < len(new_line):
                            new_coordinates = {"line": line_2, "letter": letter_2}
                            if not new_coordinates in antinode_locations:
                                antinode_locations.append(new_coordinates)
                            increment += 1
                        else:
                            calculating = False

    return len(antinode_locations)


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 34

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = find_antinode_locations(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = find_antinode_locations(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()