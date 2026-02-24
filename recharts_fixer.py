import os
import re

# This regex matches the entire <ResponsiveContainer ... > ... </ResponsiveContainer> block
# It captures the attributes and the inner content.
# Note: This is an approximation for JSX, handling simple nesting.
container_pattern = re.compile(
    r'(<ResponsiveContainer[^>]*height=[\'"](\d+\.?\d*rem)[\'"][^>]*>)(.*?)(</ResponsiveContainer>)',
    re.DOTALL
)

def fix_recharts(match):
    full_open_tag = match.group(1)
    height_rem = match.group(2)
    inner_content = match.group(3)
    closing_tag = match.group(4)
    
    # 1. Update the ResponsiveContainer props: set height="100%"
    # We replace the specific height="...rem" with height="100%"
    new_open_tag = re.sub(r'height=[\'"]\d+\.?\d*rem[\'"]', 'height="100%"', full_open_tag)
    
    # 2. Wrap in a div with the captured rem height
    return f'<div className="h-[{height_rem}]">\n        {new_open_tag}{inner_content}{closing_tag}\n      </div>'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = container_pattern.sub(fix_recharts, content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    src_dir = 'c:/Users/hardi/Downloads/cargoclave (11)/cargoclave/src'
    modified_files = 0
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.jsx'):
                file_path = os.path.join(root, file)
                if process_file(file_path):
                    print(f"Fixed Recharts in: {file_path}")
                    modified_files += 1

    print(f"\nTotal chart files fixed: {modified_files}")

if __name__ == "__main__":
    main()
