"""Logo asset pipeline — copies *_New.png sources into web/public/images.

WRA crown and Korean title are copied verbatim (original colors).
Only World Royal Academy gets the gold gradient treatment for depth.

Re-run after editing source PNGs in C:/WORK/WRA/Logo/.
"""
from PIL import Image
import os
import shutil

# Gold palette (matches existing footer gradient: from-[#d4af37] to-[#fcf6ba])
GOLD_HIGHLIGHT = (252, 246, 186)  # #fcf6ba — top highlight
GOLD_MID = (212, 175, 55)         # #d4af37 — mid
GOLD_DEEP = (170, 119, 28)        # #aa771c — bottom shadow


def lerp(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def gold_at(t):
    """t in [0,1]: 0 = top of region (highlight), 1 = bottom (deep)."""
    if t < 0.35:
        return lerp(GOLD_HIGHLIGHT, GOLD_MID, t / 0.35)
    return lerp(GOLD_MID, GOLD_DEEP, (t - 0.35) / 0.65)


def vertical_extent(img):
    """Find top/bottom y where any opaque pixel exists."""
    w, h = img.size
    px = img.load()
    top, bottom = None, None
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 32:
                if top is None:
                    top = y
                bottom = y
                break
    return top or 0, bottom or (h - 1)


def recolor_to_gold(src, dst):
    """All opaque pixels -> vertical gold gradient (highlight top -> deep bottom)."""
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    px = img.load()

    top, bottom = vertical_extent(img)
    span = max(1, bottom - top)

    count = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            t = max(0.0, min(1.0, (y - top) / span))
            px[x, y] = (*gold_at(t), a)
            count += 1

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    img.save(dst, "PNG")
    print(f"[gold] {count} px -> {dst}")


def copy_verbatim(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(src, dst)
    print(f"[copy] {src} -> {dst}")


if __name__ == "__main__":
    SRC_CROWN = r"C:\WORK\WRA\Logo\WRA_white.png"
    DST_CROWN = r"C:\WORK\WRA\web\public\images\wra-crown.png"

    SRC_TITLE_EN = r"C:\WORK\WRA\Logo\WorldRoyalAcademyNew.png"
    DST_TITLE_EN = r"C:\WORK\WRA\web\public\images\wra-title-en.png"

    SRC_TITLE_KO = r"C:\WORK\WRA\Logo\세계왕립아카데미New.png"
    DST_TITLE_KO = r"C:\WORK\WRA\web\public\images\wra-title-ko.png"

    copy_verbatim(SRC_CROWN, DST_CROWN)
    copy_verbatim(SRC_TITLE_KO, DST_TITLE_KO)
    recolor_to_gold(SRC_TITLE_EN, DST_TITLE_EN)
