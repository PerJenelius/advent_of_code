import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def find_start_coordinates(data: list):
    for line_index in range(len(data)):
        line = data[line_index]
        for letter_index in range(len(line)):
            symbol = line[letter_index]
            if symbol != "." and symbol != "#":
                return {"line": line_index, "letter": letter_index, "direction": "up"}


def get_new_coordinates(coordinates: dict, direction: str):
    new_line = new_line = coordinates["line"]
    new_letter = coordinates["letter"]
    if direction == "up":
        new_line = coordinates["line"] - 1
    if direction == "right":
        new_letter = coordinates["letter"] + 1
    if direction == "down":
        new_line = coordinates["line"] + 1
    if direction == "left":
        new_letter = coordinates["letter"] - 1
    return {"line": new_line, "letter": new_letter, "direction": direction}


def get_new_direction(direction: str):
    if direction == "up": return "right"
    if direction == "right": return "down"
    if direction == "down": return "left"
    if direction == "left": return "up"


def calculate_path(data: str, obstacle_coordinates: dict = None):
    map_data = data.split("\n")
    visited_coordinates = []
    coordinates = find_start_coordinates(map_data)
    visited_coordinates.append(coordinates)
    direction = "up"
    simulation_running = True
    rotations = 0
    while simulation_running and rotations < 7000:
        new_coordinates = get_new_coordinates(coordinates, direction)
        new_line = new_coordinates["line"]
        new_letter = new_coordinates["letter"]

        if new_line < 0 or new_line >= len(map_data):
            simulation_running = False
            break
        if new_letter < 0 or new_letter >= len(map_data[new_line]):
            simulation_running = False
            break
        
        if new_coordinates == obstacle_coordinates or map_data[new_line][new_letter] == "#":
            direction = get_new_direction(direction)
        else:
            coordinates = new_coordinates
            if coordinates in visited_coordinates:
                return "loop_detected"
            else:
                visited_coordinates.append(coordinates)
        rotations += 1
    return visited_coordinates


def find_every_loop(data: str):
    loop_count = 0
    visited_coordinates = calculate_path(data)
    for visited_coordinate in visited_coordinates:
        result = calculate_path(data, visited_coordinate)
        if result == "loop_detected":
            loop_count += 1
            print("loop_count:", loop_count)
    return loop_count


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 6

    start_time = time.time()
    print(f"Calculating...\n")

    test_data = get_indata(file_definitions[0])
    test_result = find_every_loop(test_data)
    print("Test Result:", test_result)
    print("-Expected--:", expected_test_result)

    data = get_indata(file_definitions[1])
    result = find_every_loop(data)
    print("Real Result:", result)

    stop_time = time.time()
    elapsed_time = round(stop_time - start_time, 3)
    print(f"\nElapsed time: {elapsed_time}s")


main()