import os, requests

api_key = os.getenv("NOTION_API_KEY")
headers = {
    "Authorization": "Bearer " + api_key,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}
res = requests.post("https://api.notion.com/v1/search", headers=headers, json={"page_size": 10})
print("Status:", res.status_code)
print("Data:", res.json())
