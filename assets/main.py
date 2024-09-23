import os
from PIL import Image

def resize_image(file_path, target_size):
    with Image.open(file_path) as img:
        img = img.resize(target_size, Image.LANCZOS)
        img.save(file_path)
        print(f"Resized {file_path} to {target_size[0]}x{target_size[1]}px")

def main():
    resources_dir = 'assets'
    icon_size = (300, 300)

    for filename in os.listdir(resources_dir):
        file_path = os.path.join(resources_dir, filename)
        try:
            resize_image(file_path, icon_size)
        except Exception as e : pass
if __name__ == "__main__":
    main()
