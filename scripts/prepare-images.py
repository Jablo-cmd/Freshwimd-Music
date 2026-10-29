"""Derives web-ready crops from the originals in public/images (originals are left untouched).
Run: python3 scripts/prepare-images.py"""
from PIL import Image, ImageDraw
import os
src, out = "public/images", "public/images/site"
os.makedirs(out, exist_ok=True)

def save(im, name, q=84):
    im.convert("RGB").save(f"{out}/{name}", quality=q, optimize=True, progressive=True)

def crop(f, box, name):
    save(Image.open(f).crop(box), name)

# Real studio photographs
for f, n in [("FB_IMG_1781201311155.jpg", "control-room-session.jpg"),
             ("FB_IMG_1781201300345.jpg", "console-portrait.jpg"),
             ("FB_IMG_1781201322537.jpg", "console-wide.jpg")]:
    save(Image.open(f"{src}/{f}"), n)

# Third-party / reference imagery (letterbox + phone UI removed)
crop(f"{src}/Screenshot_20261030_003038.jpg", (0, 366, 1080, 1075), "live-room-grand-piano.jpg")
crop(f"{src}/Screenshot_20261030_003057.jpg", (0, 396, 1080, 1102), "vintage-control-room.jpg")
crop(f"{src}/Screenshot_20261030_003126.jpg", (0, 352, 1080, 958), "outboard-rack.jpg")
# The producer-suite photo shows a recognisable foreign skyline through its window: crop the window out.
crop(f"{src}/c01498ff6e4713aa712704d0d5550771.jpg", (215, 150, 735, 1018), "producer-suite-keys.jpg")
for f, n in [("40dd9c7f6345c55356262ce4a1021c5c.jpg", "burgundy-control-room.jpg"),
             ("5f355139dc100c42196a1fb729fb5792.jpg", "live-room-instruments.jpg")]:
    save(Image.open(f"{src}/{f}"), n)
save(Image.open("Screenshot_20260507_103847_com.pinterest_edit_10641968965562.jpg"), "large-format-console.jpg")

# Logo: emblem with transparent background (luminance -> alpha)
logo = Image.open(f"{src}/file_000000001b4882089cd59d03d1e97558.png").convert("RGB")
mark = logo.crop((300, 140, 1160, 740))
gray = mark.convert("L").point(lambda v: 0 if v < 14 else min(255, int((v - 14) * 255 / 70)))
mark = mark.convert("RGBA"); mark.putalpha(gray)
mark.thumbnail((480, 480)); mark.save(f"{out}/logo-mark.png", optimize=True)
icon = mark.copy(); icon.thumbnail((256, 256))
canvas = Image.new("RGBA", (256, 256), (16, 18, 22, 255)); canvas.alpha_composite(icon, ((256-icon.width)//2, (256-icon.height)//2))
canvas.save("app/icon.png") if os.path.isdir("app") else None
logo.resize((627, 627)).save(f"{out}/logo-full.jpg", quality=88)

# Social share image 1200x630
og = Image.new("RGB", (1200, 630), logo.getpixel((8, 8)))
hero = Image.open(f"{src}/FB_IMG_1781201311155.jpg").convert("RGB")
w = 700; h = int(hero.height * w / hero.width)
hero = hero.resize((w, h)).crop((0, 140, w, 140 + 630))
mask = Image.linear_gradient("L").rotate(90).resize((w, 630))  # fade to the left
og.paste(hero, (500, 0), mask)
lg = logo.resize((560, 560)).crop((0, 0, 560, 560))
og.paste(lg, (20, 35))
og.save("public/og-image.jpg", quality=88)
print("done")
