import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        content = file.readlines()
        return content


def get_rules(data: str):
    rules = []
    for line_index in range(len(data)):
        line = data[line_index]
        if "|" in line:
            rules.append({"left": line.split("|")[0], "right": line.split("|")[1].rstrip()})
    return rules


def get_updates(data: str):
    updates = []
    for line_index in range(len(data)):
        line = data[line_index]
        if "," in line:
            update = []
            for page in line.split(","):
                update.append(page.rstrip())
            updates.append(update)
    return updates


def find_median_value(values: list):
    index = len(values) // 2
    return int(values[index])


def get_corrected_update(update: list, rules: list):
    corrected_update = []
    while len(corrected_update) < len(update):
        for page_index in range(len(update)):
            page = update[page_index]
            correct = True
            for rule in rules:
                if page == rule["right"]:
                    for other_page_index in range(len(update)):
                        if other_page_index == page_index:
                            continue
                        other_page = update[other_page_index]
                        if other_page == rule["left"] and other_page not in corrected_update:
                            correct = False
            if correct and page not in corrected_update:
                corrected_update.append(page)
    return corrected_update


def find_incorrect_updates(data: str):
    sum_medians = 0
    rules = get_rules(data)
    updates = get_updates(data)
    for update in updates:
        correct = True
        for page_index in range(len(update)):
            page = update[page_index]
            for rule in rules:
                if page == rule["left"]:
                    for other_page_index in range(len(update)):
                        if other_page_index == page_index:
                            continue
                        other_page = update[other_page_index]
                        if other_page == rule["right"] and other_page_index < page_index:
                            correct = False
                elif page == rule["right"]:
                    for other_page_index in range(len(update)):
                        if other_page_index == page_index:
                            continue
                        other_page = update[other_page_index]
                        if other_page == rule["left"] and other_page_index > page_index:
                            correct = False
        if not correct:
            corrected_update = get_corrected_update(update, rules)
            sum_medians += find_median_value(corrected_update)
    return sum_medians


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 123

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = find_incorrect_updates(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = find_incorrect_updates(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()