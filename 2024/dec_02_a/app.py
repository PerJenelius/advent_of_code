import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_number_of_safe_reports(data: str):
    safe_report_count = 0
    reports = data.split("\n")
    for report in reports:
        levels = report.split(" ")
        is_safe = True
        previous_level = int(levels[0])
        trend = ""
        for index in range(1, len(levels)):
            level = int(levels[index])
            if trend == "":
                trend = "+" if level > previous_level else "-"
            if trend == "+" and not 1 <= level - previous_level <= 3:
                is_safe = False
            if trend == "-" and not 1 <= previous_level - level <= 3:
                is_safe = False
            previous_level = level
        if is_safe:
            safe_report_count += 1
    return safe_report_count


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 2

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_number_of_safe_reports(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_number_of_safe_reports(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()