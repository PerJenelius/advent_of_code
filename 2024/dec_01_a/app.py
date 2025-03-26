file_definitions = ("test_data.txt", "indata.txt")


def get_indata(file_name: str):
    file = open(file_name, "r")
    content = file.read()
    return content


def calculate_discrepancy(data: str):
    coordinates_left = []
    coordinates_right = []
    discrepancy = 0
    lines = data.split("\n")
    for line in lines:
        coordinates_left.append(int(line.split("   ")[0]))
        coordinates_right.append(int(line.split("   ")[1]))
    coordinates_left.sort()
    coordinates_right.sort()
    for index in range(len(lines)):
        discrepancy += abs(coordinates_right[index] - coordinates_left[index])
    return discrepancy


print(f"Calculating...\n")

test_data = get_indata(file_definitions[0])
test_discrepancy = calculate_discrepancy(test_data)
print("Test Result:", test_discrepancy)

data = get_indata(file_definitions[1])
discrepancy = calculate_discrepancy(data)
print("Real Result:", discrepancy)

print(f"\nDone")