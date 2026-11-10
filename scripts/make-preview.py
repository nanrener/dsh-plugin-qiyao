# 生成 docs/preview.png：按当前界面重画一张干净的预览图（不是屏幕截图）。
# 依赖 Pillow；只在发布前手工跑，不进安装包。
# 用法：python scripts/make-preview.py docs/preview.png
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

S = 3                      # 超采样倍数
W, H = 1440, 960
W2, H2 = W * S, H * S

ACCENT = (168, 80, 63)     # 火曜 #A8503F
INK = (28, 32, 38)
SUB = (92, 97, 104)
MUTE = (152, 158, 166)
LINE = (236, 236, 240)
PICK_BG = (250, 241, 239)

REG = "C:/Windows/Fonts/msyh.ttc"
BOLD = "C:/Windows/Fonts/msyhbd.ttc"


def font(path, size):
    return ImageFont.truetype(path, size * S)


def main(out):
    # 背景：柔和对角渐变
    a, b = (247, 245, 242), (236, 233, 243)
    img = Image.new("RGB", (W2, H2))
    d = ImageDraw.Draw(img)
    for y in range(H2):
        t = y / (H2 - 1)
        d.line([(0, y), (W2, y)], fill=(int(a[0] + (b[0] - a[0]) * t),
                                        int(a[1] + (b[1] - a[1]) * t),
                                        int(a[2] + (b[2] - a[2]) * t)))

    m = ImageDraw.Draw(Image.new("RGB", (10, 10)))

    f_name = font(BOLD, 25)
    f_planet = font(REG, 17)
    f_date = font(REG, 14)
    f_theme = font(REG, 15)
    f_label = font(REG, 12)
    f_pick = font(BOLD, 20)
    f_chip = font(REG, 14)
    f_item = font(REG, 15)
    f_foot = font(REG, 13)

    chips = ["维权投诉", "办证跑腿", "赶工加班", "剪片子赶稿", "修理安装", "上门对接"]
    items = ["把方案改完", "回客户邮件"]
    pick_text = "把最难啃的那部分先啃掉"

    pad = 40
    card_w = 820
    inner = card_w - pad * 2

    chip_h = 31
    gap = 9
    rows = (len(chips) + 2) // 3
    chips_h = rows * chip_h + (rows - 1) * gap

    block_pick = 12 + 14 + 8 + 28 + 12      # label + 文案 + 内边距
    block_items = 18 + len(items) * 26

    h_header = 32
    h_theme = 22
    h_chips = 18 + chips_h

    total = (pad + h_header + 12 + h_theme + 20 + block_pick + 24 + h_chips + 22
             + 1 + 16 + block_items + 16 + 1 + 12 + 20 + pad)
    card_h = total

    card_x = (W - card_w) // 2
    card_y = (H - card_h) // 2

    # 阴影
    blur = 22 * S
    shadow = Image.new("L", (card_w * S + blur * 4, card_h * S + blur * 4), 0)
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([blur * 2, blur * 2, blur * 2 + card_w * S, blur * 2 + card_h * S],
                         radius=26 * S, fill=52)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    shade = Image.new("RGB", shadow.size, (58, 48, 78))
    img.paste(shade, (card_x * S - blur * 2, card_y * S - blur * 2 + 10 * S), shadow)

    d = ImageDraw.Draw(img)
    d.rounded_rectangle([card_x * S, card_y * S, (card_x + card_w) * S, (card_y + card_h) * S],
                        radius=26 * S, fill=(255, 255, 255), outline=(233, 232, 238), width=S)

    x = (card_x + pad) * S
    right = (card_x + card_w - pad) * S
    cy = (card_y + pad) * S

    # 标题
    d.text((x, cy), "火曜日", font=f_name, fill=INK)
    nw = m.textbbox((0, 0), "火曜日", font=f_name)[2]
    d.text((x + nw + 10 * S, cy + 10 * S), "（", font=f_planet, fill=MUTE)
    bw = m.textbbox((0, 0), "（", font=f_planet)[2]
    gx = x + nw + 10 * S + bw
    d.text((gx, cy + 7 * S), "♂", font=f_planet, fill=ACCENT)
    gw = m.textbbox((0, 0), "♂", font=f_planet)[2]
    d.text((gx + gw + 6 * S, cy + 10 * S), "火星）", font=f_planet, fill=MUTE)

    date_text = "11 月 10 日"
    dw = m.textbbox((0, 0), date_text, font=f_date)[2]
    d.text((right - dw, cy + 10 * S), date_text, font=f_date, fill=MUTE)

    cy += h_header * S + 12 * S

    # 主题
    d.polygon([(x + 5 * S, cy + 6 * S), (x + 10 * S, cy + 11 * S),
               (x + 5 * S, cy + 16 * S), (x, cy + 11 * S)], fill=ACCENT)
    d.text((x + 18 * S, cy + 1 * S), "行动、勇气、竞争、突破", font=f_theme, fill=SUB)

    cy += h_theme * S + 20 * S

    # 首推块
    box_top = cy
    box_h = block_pick * S
    d.rounded_rectangle([x, box_top, right, box_top + box_h], radius=13 * S, fill=PICK_BG)
    d.rounded_rectangle([x, box_top + 10 * S, x + 3 * S, box_top + box_h - 10 * S],
                        radius=1.5 * S, fill=ACCENT)
    d.text((x + 18 * S, box_top + 12 * S), "今日首推", font=f_label, fill=(164, 152, 152))
    d.text((x + 18 * S, box_top + (12 + 14 + 8) * S), pick_text, font=f_pick, fill=INK)

    cy = box_top + box_h + 24 * S

    # 也适合
    d.text((x, cy), "也适合", font=f_label, fill=MUTE)
    cy += 18 * S

    col = x
    row_top = cy
    for i, chip in enumerate(chips):
        cw = m.textbbox((0, 0), chip, font=f_chip)[2] + 32 * S
        d.rounded_rectangle([col, row_top, col + cw, row_top + chip_h * S],
                            radius=(chip_h * S) // 2, outline=(228, 213, 209), width=S)
        d.text((col + 16 * S, row_top + 6 * S), chip, font=f_chip, fill=SUB)
        col += cw + gap * S
        if (i + 1) % 3 == 0:
            row_top += (chip_h + gap) * S
            col = x

    cy += chips_h * S + 22 * S

    d.line([x, cy, right, cy], fill=LINE, width=S)
    cy += 16 * S

    d.text((x, cy), "今天要做", font=f_label, fill=MUTE)
    cy += 18 * S
    for item in items:
        d.ellipse([x + 2 * S, cy + 8 * S, x + 7 * S, cy + 13 * S], fill=ACCENT)
        d.text((x + 15 * S, cy), item, font=f_item, fill=INK)
        cy += 26 * S

    cy += 16 * S
    d.line([x, cy, right, cy], fill=LINE, width=S)
    cy += 12 * S
    d.text((x, cy), "＋ 加一件事", font=f_foot, fill=(170, 174, 180))

    # 页脚小字，别让整张图看起来像被裁过的截图
    cap = "qiyao-calendar · DeepSeek Harness 插件"
    f_cap = font(REG, 12)
    cw = m.textbbox((0, 0), cap, font=f_cap)[2]
    d.text(((W2 - cw) // 2, (H - 46) * S), cap, font=f_cap, fill=(180, 182, 190))

    img = img.resize((W, H), Image.LANCZOS)
    img.save(out, "PNG")
    print("ok", out, img.size)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "preview.png")
