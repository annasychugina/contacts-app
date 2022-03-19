#!/bin/bash
# Copy me to directory with PNGs and run

if ! command -v cwebp &> /dev/null
then
    echo "cwebp is not found. please install it before using convert"
    exit
fi

echo "Converting all png files to webp"
for f in "$(pwd)"/*.png; do
  file_basename=$(basename "$f")
  file_name="${file_basename%.*}"
  to_file_basename="$file_name.webp"
  echo "Converting $file_basename to webp"
  cwebp "$file_basename" -o "$to_file_basename" "$@"
  echo "Saved as $to_file_basename"
  rm "$file_basename"
done
