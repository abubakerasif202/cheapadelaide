import os
import re
from pathlib import Path

search_terms = [
    "lorem ipsum",
    "todo",
    "fixme",
    "fake reviews",
    "fake rating",
    "example.com",
    "placeholder phone",
    "placeholder email",
    "cheapest guaranteed",
]

src_dir = Path(__file__).resolve().parents[1] / "src"
found = False

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                for term in search_terms:
                    # Allow placeholder in input fields if appropriate, but check occurrences
                    if term in content.lower():
                        print(f"Warning: Found '{term}' in {path}")
                        found = True

if not found:
    print("Zero forbidden placeholder strings found in src/!")

# Check HF references
print("\nChecking HF references in src/:")
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".ts", ".tsx", ".js", ".jsx", ".css", ".json")):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                for match in re.finditer(r"hf[\s\-_]?removals", content, re.IGNORECASE):
                    line_no = content[:match.start()].count("\n") + 1
                    snippet = content.splitlines()[line_no - 1]
                    print(f"  {file}:{line_no} -> {snippet.strip()}")
