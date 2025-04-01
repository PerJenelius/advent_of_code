import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        content = file.read()
        return content


def get_sum_of_calculations(data: str):
    sum_total = 0
    data_strings = data.split("do()")
    for index in range(len(data_strings)):
        do_string = ""
        if not "don't()" in data_strings[index]:
            do_string  = data_strings[index]
        else:
            do_string = data_strings[index].split("don't()")[0]
        for mul_string in do_string.split("mul("):
            shorter_string = mul_string.split(")")[0]
            try:
                left_number = int(shorter_string.split(",")[0])
                right_number = int(shorter_string.split(",")[1])
                if shorter_string == f"{left_number},{right_number}":
                    sum_total += left_number * right_number
            except:
                continue
    return sum_total


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 48

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_discrepancy = get_sum_of_calculations(test_data)
    print("Test Result:", test_discrepancy)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    discrepancy = get_sum_of_calculations(data)
    print("Real Result:", discrepancy)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")

main()