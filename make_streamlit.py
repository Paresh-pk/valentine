
import os
import base64
import re

def get_base64_mime(filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext == '.png': return 'image/png'
    if ext in ['.jpg', '.jpeg']: return 'image/jpeg'
    if ext == '.mp3': return 'audio/mpeg'
    return 'application/octet-stream'

def file_to_base64(filename):
    if not os.path.exists(filename):
        print(f"Warning: {filename} not found")
        return filename # modification failed
    
    with open(filename, "rb") as f:
        data = f.read()
    
    b64_str = base64.b64encode(data).decode('utf-8')
    mime = get_base64_mime(filename)
    return f"data:{mime};base64,{b64_str}"

def bundle_project():
    # 1. Read Components
    try:
        with open("index.html", "r", encoding="utf-8") as f: html = f.read()
        with open("style.css", "r", encoding="utf-8") as f: css = f.read()
        with open("script.js", "r", encoding="utf-8") as f: js = f.read()
    except Exception as e:
        print(f"Error reading source files: {e}")
        return

    # 2. Inline CSS and JS into HTML
    # Remove link/script tags and inject content
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css}\n</style>')
    html = html.replace('<script src="script.js"></script>', f'<script>\n{js}\n</script>')

    # 3. List of assets to replace
    # We replace strict string matches to be safe
    assets = [
        "dramatic-pic.png", 
        "kadar-pic.png",
        "gallery-1.png",
        "gallery-2.png",
        "gallery-3.png",
        "gallery-4.png",
        "Zara Sa.mp3"
    ]

    # 4. Replace Assets with Base64
    final_content = html
    for asset in assets:
        print(f"Bundling {asset}...")
        b64_val = file_to_base64(asset)
        if b64_val != asset:
            # Replace all occurrences (in HTML and JS)
            # We use replace() which is simple string replacement
            final_content = final_content.replace(asset, b64_val)

    # 5. Create app.py content
    app_py_content = f"""
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Be My Valentine?",
    page_icon="💖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit elements to make it look like a standalone site
hide_st_style = \"\"\"
<style>
#MainMenu {{visibility: hidden;}}
footer {{visibility: hidden;}}
header {{visibility: hidden;}}
.block-container {{
    padding-top: 0rem;
    padding-bottom: 0rem;
    padding-left: 0rem;
    padding-right: 0rem;
    max-width: 100%;
}}
iframe {{
    width: 100% !important; 
    height: 100vh !important;
}}
</style>
\"\"\"
st.markdown(hide_st_style, unsafe_allow_html=True)

# The Full Bundled Website
html_code = \"\"\"
{final_content}
\"\"\"

components.html(html_code, height=900, scrolling=False)
"""

    # 6. Write app.py
    with open("app.py", "w", encoding="utf-8") as f:
        f.write(app_py_content)
    
    print("Successfully created app.py!")

if __name__ == "__main__":
    bundle_project()
