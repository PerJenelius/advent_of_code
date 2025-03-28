import time


def get_indata(file_name: str):
    file = open(file_name, "r")
    content = file.read()
    return content


def get_number_of_safe_reports(data: str):
    reports = data.split("\n")
    safe_report_count = 0
    for report in reports:
        levels = report.split(" ")
        previous_level = int(levels[0])
        unsafe_count = 0
        trend = observe_the_trend(levels)
        unsafe_indexes = evaluate_safety(levels, trend)
        if len(unsafe_indexes) == 0:
            safe_report_count += 1
        else:
            unsafe_indexes.append(0)
            for unsafe_index in unsafe_indexes:
                temp_levels = report.split(" ")
                del temp_levels[unsafe_index]
                new_unsafe_indexes = evaluate_safety(temp_levels, trend)
                if len(new_unsafe_indexes) == 0:
                    safe_report_count += 1
                    break
    return safe_report_count


def observe_the_trend(levels: str):
    previous_level = int(levels[0])
    pos_trend = 0
    neg_trend = 0
    for index in range(1, len(levels)):
        level = int(levels[index])
        if level > previous_level:
            pos_trend += 1 
        elif level < previous_level:
            neg_trend += 1
        previous_level = level
    trend = "+" if pos_trend > neg_trend else "-"
    return trend


def evaluate_safety(levels, trend):
    previous_level = int(levels[0])
    isSafe = True
    unsafe_indexes = []
    for index in range(1, len(levels)):
        level = int(levels[index])
        is_safe = True
        if trend == "+" and not 1 <= level - previous_level <= 3:
            unsafe_indexes.append(index)
        if trend == "-" and not 1 <= previous_level - level <= 3:
            unsafe_indexes.append(index)
        previous_level = level
    return unsafe_indexes


file_definitions = ("test_data.txt", "indata.txt")
expected_test_result = 4

start_time = time.time()
print(f"Calculating...\n")

test_data = get_indata(file_definitions[0])
test_discrepancy = get_number_of_safe_reports(test_data)
print("Test Result:", test_discrepancy)
print("-Expected--:", expected_test_result)

data = get_indata(file_definitions[1])
discrepancy = get_number_of_safe_reports(data)
print("Real Result:", discrepancy)

stop_time = time.time()
elapsed_time = round(stop_time - start_time, 3)
print(f"\nElapsed time: {elapsed_time}s")