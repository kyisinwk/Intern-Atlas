import json

with open("data/jobs.json", "r") as f:
    json_data = json.load(f)

field_map = {
    "job_title": "Title",
    "sector": "Field",
    "location": "Location",
    "salary": "Pay",
    "job_type": "Experience",
    "minimum_gpa": "Minimum GPA",
    "job_board": "Platform"
}

def format_entry(entry):
    lines = []
    for json_key, label in field_map.items():
        value = entry.get(json_key, "").strip()
        if label == "Minimum GPA" and not value:
            value = "3.0"
        lines.append(f"{label}: {value}")
    return "\n".join(lines)

def should_include(entry):
    return any(
        key != "salary" and str(entry.get(key, "")).strip()
        for key in field_map
    )

valid_entries = [format_entry(e) for e in json_data if should_include(e)]

with open("converted_output.txt", "w") as out:
    out.write("\n---\n".join(valid_entries))

print("✅ Cleaned and converted output written to converted_output.txt")