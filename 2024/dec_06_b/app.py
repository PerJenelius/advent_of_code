import time


def get_indata(file_name: str):
    with open(file_name, "r") as file:
        return file.read()


def find_start_coordinates(data: list, obstacle_coordinates: dict = None):
    if obstacle_coordinates != None:
        if obstacle_coordinates["direction"] == "up":
            return {"line": obstacle_coordinates["line"] + 1, "letter": obstacle_coordinates["letter"], "direction": obstacle_coordinates["direction"]}
        elif obstacle_coordinates["direction"] == "right":
            return {"line": obstacle_coordinates["line"], "letter": obstacle_coordinates["letter"] - 1, "direction": obstacle_coordinates["direction"]}
        elif obstacle_coordinates["direction"] == "down":
            return {"line": obstacle_coordinates["line"] - 1, "letter": obstacle_coordinates["letter"], "direction": obstacle_coordinates["direction"]}
        elif obstacle_coordinates["direction"] == "left":
            return {"line": obstacle_coordinates["line"], "letter": obstacle_coordinates["letter"] + 1, "direction": obstacle_coordinates["direction"]}
    else:
        for line_index in range(len(data)):
            line = data[line_index]
            for letter_index in range(len(line)):
                symbol = line[letter_index]
                if symbol != "." and symbol != "#":
                    return {"line": line_index, "letter": letter_index, "direction": "up"}


def get_new_coordinates(coordinates: dict, direction: str):
    new_line = new_line = coordinates["line"]
    new_letter = coordinates["letter"]
    if direction == "up": new_line = coordinates["line"] - 1
    elif direction == "right": new_letter = coordinates["letter"] + 1
    elif direction == "down": new_line = coordinates["line"] + 1
    elif direction == "left": new_letter = coordinates["letter"] - 1
    return {"line": new_line, "letter": new_letter, "direction": direction}


def get_new_direction(direction: str):
    if direction == "up": return "right"
    elif direction == "right": return "down"
    elif direction == "down": return "left"
    elif direction == "left": return "up"


def calculate_path(data: str, obstacle_coordinates: dict = None):
    map_data = data.split("\n")
    visited_coordinates = []
    coordinates = find_start_coordinates(map_data, obstacle_coordinates)
    visited_coordinates.append(coordinates)
    direction = "up"
    simulation_running = True
    while simulation_running:
        new_coordinates = get_new_coordinates(coordinates, direction)
        new_line = new_coordinates["line"]
        new_letter = new_coordinates["letter"]

        if new_line < 0 or new_line >= len(map_data):
            simulation_running = False
            break
        if new_letter < 0 or new_letter >= len(map_data[new_line]):
            simulation_running = False
            break
        
        if obstacle_coordinates != None and new_line == obstacle_coordinates["line"] and new_letter == obstacle_coordinates["letter"]:
            direction = get_new_direction(direction)
            continue
        
        if map_data[new_line][new_letter] == "#":
            direction = get_new_direction(direction)
            continue

        coordinates = new_coordinates
        if obstacle_coordinates != None and coordinates in visited_coordinates:
            obstacle_position = {"line": obstacle_coordinates["line"], "letter": obstacle_coordinates["letter"]}
            return obstacle_position
        elif not coordinates in visited_coordinates:
            visited_coordinates.append(coordinates)
    if obstacle_coordinates != None:
        return "no_loop"
    else:
        return visited_coordinates


def find_every_loop(data: str):
    obstacle_positions = []
    visited_coordinates = calculate_path(data)
    for visited_coordinate in visited_coordinates:
        result = calculate_path(data, visited_coordinate)
        if result != "no_loop" and not result in obstacle_positions:
            obstacle_positions.append(result)
            if len(obstacle_positions) % 10 == 0:
                print("Obstacle Count:", len(obstacle_positions))
    return len(obstacle_positions)


def main():
    file_definitions = ("test_data.txt", "indata.txt")
    expected_test_result = 6

    start_time = time.time()
    print("This is a brute force solution that may take 10 - 15 minutes to compute")
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