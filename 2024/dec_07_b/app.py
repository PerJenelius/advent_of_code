import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_operator_key(length: int):
    binary_key = ""
    for index in range(length):
        binary_key += "2"
    return binary_key


def update_operator_key(old_key: str):
    new_key = ""
    runover = False
    for index in range(len(old_key)):
        old_char = int(old_key[index])
        new_char = old_char
        if runover or index == 0:
            new_char = old_char - 1
            runover = False
        if new_char < 0:
            new_char = 2
            runover = True
        new_key += str(new_char)
    is_zero = True
    for char in new_key:
        if char != "0":
            is_zero = False
    if is_zero:
        return "0"
    else:
        return new_key


def get_possible_equations(data:str):
    possible_equations = 0
    equations = data.split("\n")
    calc_index = 0
    for equation in equations:
        expected_result = int(equation.split(": ")[0])
        number_strings = equation.split(": ")[1].split(" ")
        operator_key = get_operator_key(len(number_strings) - 1)
        calculating = True
        while calculating:
            result = 0
            for index in range(len(number_strings)):
                number = int(number_strings[index])
                if index == 0:
                    result = number
                    continue
                key = operator_key[index - 1]
                if key == "2":
                    result = int(f"{result}{number}")
                elif key == "1":
                    result *= number
                else:
                    result += number
            if result == expected_result:
                possible_equations += result
                break
            operator_key = update_operator_key(operator_key)
            if operator_key == "0":
                calculating = False
        calc_index += 1
    return possible_equations


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 11387

    start_time = time.time()
    print("This may take a couple of minutes to compute")
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_possible_equations(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_possible_equations(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()