import json

# Load the JSON data from jobs.json
with open('data/jobs.json', 'r') as file:
    data = json.load(file)

# Save formatted output to a text file
with open('output.txt', 'w') as out:
    for item in data:
        title = item.get("job_title", "N/A")
        field = item.get("sector", "N/A")
        location = item.get("location", "N/A")
        pay = "Paid" if item.get("salary") else "Unpaid"
        experience = "Beginner"  # You can replace with item.get("experience", "Beginner") if it exists
        gpa = "3.0"              # Replace with item.get("gpa", "3.0") if GPA is in your JSON
        platform = item.get("job_board", "N/A").replace("jobs.", "").replace(".com", "").capitalize()

        out.write(f"Title: {title}\n")
        out.write(f"Field: {field}\n")
        out.write(f"Location: {location}\n")
        out.write(f"Pay: {pay}\n")
        out.write(f"Experience: {experience}\n")
        out.write(f"Minimum GPA: {gpa}\n")
        out.write(f"Platform: {platform}\n")
        out.write("---\n")