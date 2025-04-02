import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_sum_of_calculations(data: str):
    sum_total = 0
    for raw_string in data.split("mul("):
        numbers_string = raw_string.split(")")[0]
        try:
            left_number = int(numbers_string.split(",")[0])
            right_number = int(numbers_string.split(",")[1])
            if numbers_string == f"{left_number},{right_number}":
                sum_total += left_number * right_number
        except:
            continue
    return sum_total


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 161

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_sum_of_calculations(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_sum_of_calculations(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()