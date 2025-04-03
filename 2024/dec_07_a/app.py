import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_possible_equations(data:str):
    possible_equations = 0
    equations = data.split("\n")
    for equation in equations:
        expected_result = int(equation.split(": ")[0])
        number_strings = equation.split(": ")[1].split(" ")
        binary_key = ""
        for number_string in range(len(number_strings) - 1):
            binary_key += "1"
        calculating = True
        while calculating:
            result = 0
            for index in range(len(number_strings)):
                number = int(number_strings[index])
                if index == 0:
                    result = number
                    continue
                key = binary_key[index - 1]
                if key == "1":
                    result *= number
                else:
                    result += number
            if result == expected_result:
                possible_equations += result
                break
            number_key = int(binary_key, 2)
            if number_key == 0:
                calculating = False
            else:
                binary_key = format(number_key - 1, "b")
                while len(binary_key) < len(number_strings) - 1:
                    binary_key = "0" + binary_key
    return possible_equations


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 11387

    start_time = time.time()
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