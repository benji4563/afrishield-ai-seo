import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

output_dir = r"c:\Users\hp\Documents\AFRISHIELD\02 Services ai seo\Afrishieldai SEO SALES AND MARKETING\content-calendar-board\deliverables\facebook-ads-conversion"
os.makedirs(output_dir, exist_ok=True)

# 1. Create Scene 6 CTA Image
width, height = 1080, 1920
img = Image.new("RGB", (width, height), color="#070b14")
draw = ImageDraw.Draw(img)

# Background grid
for y in range(0, height, 80):
    draw.line([(0, y), (width, y)], fill="#0f172a", width=1)
for x in range(0, width, 80):
    draw.line([(x, 0), (x, height)], fill="#0f172a", width=1)

# Central Card
card_box = [100, 560, 980, 1360]
draw.rounded_rectangle(card_box, radius=36, fill="#0b1329", outline="#00f2fe", width=3)

# Inner Glow / Accent Banner
banner_box = [160, 700, 920, 880]
draw.rounded_rectangle(banner_box, radius=24, fill="#00e676")

try:
    font_badge = ImageFont.truetype("arialbd.ttf", 68)
    font_sub = ImageFont.truetype("arial.ttf", 44)
    font_footer = ImageFont.truetype("arialbd.ttf", 36)
    font_top = ImageFont.truetype("arialbd.ttf", 44)
except Exception:
    font_badge = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_footer = ImageFont.load_default()
    font_top = ImageFont.load_default()

draw.text((width/2, 630), "FREE SYSTEM BREAKDOWN", fill="#38bdf8", font=font_top, anchor="mm")
draw.text((width/2, 790), 'COMMENT "BUYERS"', fill="#051b11", font=font_badge, anchor="mm")
draw.text((width/2, 970), "I'll show you how to build this", fill="#f8fafc", font=font_sub, anchor="mm")
draw.text((width/2, 1040), "closed-loop advertising system.", fill="#f8fafc", font=font_sub, anchor="mm")

flow_box = [140, 1160, 940, 1270]
draw.rounded_rectangle(flow_box, radius=18, fill="#070f20", outline="#1e293b", width=2)
draw.text((width/2, 1215), "AD  ->  SALE  ->  DATA  ->  BETTER BUYERS", fill="#10b981", font=font_footer, anchor="mm")

cta_path = os.path.join(output_dir, "07_scene6_cta_screen.jpg")
img.save(cta_path, quality=95)
print(f"Created CTA image: {cta_path}")

# 2. Build the MP4 video using FFmpeg
# Timing map:
scenes = [
    ("01_scene1_dashboard_black_character.jpg", 5.0), # 0:00 - 0:05
    ("02_scene1b_leaking_bucket_black_character.jpg", 3.0), # 0:05 - 0:08
    ("03_scene2_tracking_gap.jpg", 8.0), # 0:08 - 0:16
    ("04_scene3_close_the_loop.jpg", 9.0), # 0:16 - 0:25
    ("05_scene4_optimize_for_buyers.jpg", 10.0), # 0:25 - 0:35
    ("06_scene5_conversion_payoff.jpg", 7.0), # 0:35 - 0:42
    ("07_scene6_cta_screen.jpg", 3.0), # 0:42 - 0:45
]

# Generate intermediate video clips with Ken Burns subtle motion (zoom/pan) for each scene
temp_clips = []
for i, (filename, duration) in enumerate(scenes):
    in_path = os.path.join(output_dir, filename)
    out_clip = os.path.join(output_dir, f"temp_clip_{i}.mp4")
    temp_clips.append(out_clip)
    
    # 30 fps
    total_frames = int(duration * 30)
    
    # Slight zoom in or zoom out effect alternating
    if i % 2 == 0:
        vf = f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0005,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={total_frames}:s=1080x1920:fps=30"
    else:
        vf = f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='if(lte(zoom,1.0),1.08,max(1.001,zoom-0.0005))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={total_frames}:s=1080x1920:fps=30"

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", in_path,
        "-vf", vf,
        "-t", str(duration),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", "30",
        out_clip
    ]
    print(f"Rendering clip {i+1}/{len(scenes)}: {filename} ({duration}s)...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error rendering clip {i}:", res.stderr)

# Concat all clips into master MP4
concat_list_path = os.path.join(output_dir, "concat_list.txt")
with open(concat_list_path, "w") as f:
    for clip in temp_clips:
        # forward slashes for ffmpeg concat
        f.write(f"file '{clip.replace(os.sep, '/')}'\n")

final_mp4 = os.path.join(output_dir, "Facebook_Ads_Conversion_Visuals_Master.mp4")
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_list_path,
    "-c", "copy",
    final_mp4
]
print("Concatenating into master MP4...")
res = subprocess.run(concat_cmd, capture_output=True, text=True)
if res.returncode == 0:
    print(f"SUCCESS: Master MP4 produced at: {final_mp4}")
    # clean up temp clips
    for clip in temp_clips:
        if os.path.exists(clip):
            os.remove(clip)
    if os.path.exists(concat_list_path):
        os.remove(concat_list_path)
else:
    print("Error during concat:", res.stderr)
