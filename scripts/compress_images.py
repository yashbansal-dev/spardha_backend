import os
import sys
from PIL import Image, ImageOps

def compress_image(image_path, quality=80):
    try:
        # Check if it's an image we support
        ext = os.path.splitext(image_path)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.png']:
            return

        with Image.open(image_path) as img:
            # Fix orientation based on EXIF data
            img = ImageOps.exif_transpose(img)
            
            # Convert RGBA to RGB if pushing to JPEG
            if img.mode in ("RGBA", "P") and ext in ['.jpg', '.jpeg']:
                img = img.convert("RGB")
            
            # Save if it's a JPEG (Orientation fix requires re-saving)
            # Or if it's a large PNG
            original_size = os.path.getsize(image_path)
            
            if ext in ['.jpg', '.jpeg']:
                img.save(image_path, "JPEG", optimize=True, quality=quality)
            elif ext == '.png' and original_size > 500 * 1024:
                img.save(image_path, "PNG", optimize=True)

        new_size = os.path.getsize(image_path)
        if new_size != original_size:
            print(f"Processed {image_path}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB")
            
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def process_path(path):
    if os.path.isdir(path):
        for root, dirs, files in os.walk(path):
            for file in files:
                process_path(os.path.join(root, file))
    elif os.path.isfile(path):
        compress_image(path)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        paths = sys.argv[1:]
        for p in paths:
            process_path(p)
    else:
        process_path("public")
