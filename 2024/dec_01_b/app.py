import time


def get_indata(file_name: str):
    file = open(file_name, "r")
    content = file.read()
    return content


def get_similarity_score(data: str):
    coordinates_left = []
    coordinates_right = []
    similarity_score = 0
    lines = data.split("\n")
    for line in lines:
        coordinates_left.append(int(line.split("   ")[0]))
        coordinates_right.append(int(line.split("   ")[1]))
    for left_coordinate in coordinates_left:
        for right_coordinate in coordinates_right:
            if right_coordinate == left_coordinate:
                similarity_score += left_coordinate
    return similarity_score


file_definitions = ("test_data.txt", "indata.txt")
expected_test_result = 31

start_time = time.time()
print(f"Calculating...\n")

test_data = get_indata(file_definitions[0])
test_discrepancy = get_similarity_score(test_data)
print("Test Result:", test_discrepancy)
print("-Expected--:", expected_test_result)

data = get_indata(file_definitions[1])
discrepancy = get_similarity_score(data)
print("Real Result:", discrepancy)

stop_time = time.time()
elapsed_time = round(stop_time - start_time, 3)
print(f"\nElapsed time: {elapsed_time}s")