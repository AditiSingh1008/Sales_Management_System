import os

# Folder and files to create
base_path = "components"
files = [
    "AnimatedBackground.jsx",
    "DataTable.jsx",
    "FilterPanel.jsx",
    "FilterSection.jsx",
    "Header.jsx",
    "Pagination.jsx",
    "SearchAndControls.jsx",
    "StatCard.jsx",
    "StatsGrid.jsx",
    "TableBody.jsx",
    "TableHeader.jsx"
]

# Create the directory if not exists
os.makedirs(base_path, exist_ok=True)

# Create each file inside the folder
for file in files:
    open(os.path.join(base_path, file), "w").close()

print("Components folder and .jsx files created successfully!")
