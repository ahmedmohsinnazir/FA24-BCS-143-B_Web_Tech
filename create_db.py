import os, json, requests

api_key = os.getenv("NOTION_API_KEY")
headers = {
    "Authorization": "Bearer " + api_key,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

# Let's find a parent page first or use root workspace / existing page
search_res = requests.post("https://api.notion.com/v1/search", headers=headers, json={"page_size": 5})
pages = search_res.json().get("results", [])
parent_page_id = None
for p in pages:
    if p["object"] == "page":
        parent_page_id = p["id"]
        break

if not parent_page_id:
    print("No parent page found!")
    exit(1)

print("Using parent page id:", parent_page_id)

payload = {
    "parent": { "type": "page_id", "page_id": parent_page_id },
    "title": [
        {
            "type": "text",
            "text": {
                "content": "ACM Workload"
            }
        }
    ],
    "properties": {
        "Task Name": {
            "title": {}
        },
        "Due Date": {
            "date": {}
        },
        "Assigned To": {
            "rich_text": {}
        },
        "Team": {
            "select": {
                "options": [
                    { "name": "Event Emperors", "color": "purple" },
                    { "name": "404 Squad", "color": "blue" },
                    { "name": "Frames and Feeds", "color": "pink" },
                    { "name": "Outreach Ninjas", "color": "orange" },
                    { "name": "Pixel Pioneers", "color": "green" }
                ]
            }
        },
        "Priority": {
            "select": {
                "options": [
                    { "name": "High", "color": "red" },
                    { "name": "Medium", "color": "yellow" },
                    { "name": "Low", "color": "green" }
                ]
            }
        },
        "Progress": {
            "select": {
                "options": [
                    { "name": "Not started", "color": "gray" },
                    { "name": "Started", "color": "blue" },
                    { "name": "Finished", "color": "green" }
                ]
            }
        }
    }
}

res = requests.post("https://api.notion.com/v1/databases", headers=headers, json=payload)
print("Create DB Status:", res.status_code)
print(json.dumps(res.json(), indent=2))
