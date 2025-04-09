import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def get_trail_starts(lines: list):
    trail_starts = []
    for line_index in range(len(lines)):
        line = lines[line_index]
        for letter_index in range(len(line)):
            value = int(line[letter_index])
            if value == 0:
                trail_starts.append([{"line_index": line_index, "letter_index": letter_index}])
    return trail_starts


def get_unique_trail_count(trails: list):
    unique_trails = []
    for trail in trails:
        new_trail = {
            "start_line": trail[0]["line_index"], 
            "start_letter": trail[0]["letter_index"],
            "end_line": trail[9]["line_index"],
            "end_letter": trail[9]["letter_index"]
        }
        if not new_trail in unique_trails:
            unique_trails.append(new_trail)
    return len(unique_trails)


def get_trailhead_score(data: str):
    lines = data.split("\n")
    trails = get_trail_starts(lines)
    for wanted_value in range(1, 10):
        new_trails = []
        for trail in trails:
            if len(trail) < wanted_value:
                continue
            old_line_i = trail[wanted_value - 1]["line_index"]
            old_letter_i = trail[wanted_value - 1]["letter_index"]
            for direction in range(4):
                new_line_i = old_line_i
                new_letter_i = old_letter_i
                if direction == 0 and new_line_i > 0:
                    new_line_i -= 1
                elif direction == 1 and new_letter_i < len(lines[0]) - 1:
                    new_letter_i += 1
                elif direction == 2 and new_line_i < len(lines) - 1:
                    new_line_i += 1
                elif direction == 3 and new_letter_i > 0:
                    new_letter_i -= 1
                if new_line_i == old_line_i and new_letter_i == old_letter_i:
                    continue
                new_value = int(lines[new_line_i][new_letter_i])
                if new_value != wanted_value:
                    continue
                new_trail = []
                for step in trail:
                    new_trail.append(step)
                new_trail.append({"line_index": new_line_i, "letter_index": new_letter_i})
                new_trails.append(new_trail)
        trails = new_trails
    unique_trail_count = get_unique_trail_count(trails)
    return unique_trail_count


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 36

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = get_trailhead_score(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = get_trailhead_score(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()