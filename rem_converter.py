import os
import re

def convert_to_rem(match):
    px_value = int(match.group(1))
    rem_value = px_value / 16
    # Remove trailing .0 for cleaner output
    rem_str = f"{rem_value:g}"
    return f'{match.group(0).split("=")[0]}="{rem_str}rem"'

def convert_font_size(match):
    px_value = int(match.group(1))
    rem_value = px_value / 16
    rem_str = f"{rem_value:g}"
    return f'fontSize: "{rem_str}rem"'

def convert_dimensions(match):
    # This is for width={...} and height={...} in JSX
    prefix = match.group(1) # width or height
    px_value = int(match.group(2))
    rem_value = px_value / 16
    rem_str = f"{rem_value:g}"
    return f'{prefix}="{rem_str}rem"'

# Regex patterns
# 1. size={24} -> size="1.5rem"
size_pattern = re.compile(r'size\s*=\s*{\s*(\d+)\s*}')
# 2. fontSize: 12 or fontSize: '12px' -> fontSize: "0.75rem"
font_size_pattern = re.compile(r'fontSize:\s*(\d+|[\'"]\d+px[\'"])')
# 3. width={300} -> width="18.75rem"
dimension_pattern = re.compile(r'(width|height)\s*=\s*{\s*(\d+)\s*}')
# 4. borderRadius: '8px' or borderRadius: 8 -> borderRadius: "0.5rem"
border_radius_pattern = re.compile(r'borderRadius:\s*(\d+|[\'"]\d+px[\'"])')
# 5. any literal '12px' or "12px" -> "0.75rem"
pixel_string_pattern = re.compile(r'[\'"](\d+)px[\'"]')

def convert_generic_px(match):
    px_value = int(match.group(1))
    rem_value = px_value / 16
    rem_str = f"{rem_value:g}"
    return f'"{rem_str}rem"'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    
    # 1. size={24}
    new_content = size_pattern.sub(convert_to_rem, new_content)
    
    # 2. fontSize: 12 or "12px"
    def repl_font_size(m):
        val = m.group(1).strip("'\"").replace('px', '')
        rem = int(val) / 16
        return f'fontSize: "{rem:g}rem"'
    new_content = font_size_pattern.sub(repl_font_size, new_content)
    
    # 3. width/height={300}
    new_content = dimension_pattern.sub(convert_dimensions, new_content)
    
    # 4. borderRadius: 8 or "8px"
    def repl_border_radius(m):
        val = m.group(1).strip("'\"").replace('px', '')
        rem = int(val) / 16
        return f'borderRadius: "{rem:g}rem"'
    new_content = border_radius_pattern.sub(repl_border_radius, new_content)

    # 5. Catch any remaining "12px" strings
    new_content = pixel_string_pattern.sub(convert_generic_px, new_content)

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
            if file.endswith(('.jsx', '.tsx', '.css')):
                file_path = os.path.join(root, file)
                if process_file(file_path):
                    print(f"Modified: {file_path}")
                    modified_files += 1

    print(f"\nTotal files modified: {modified_files}")

if __name__ == "__main__":
    main()
