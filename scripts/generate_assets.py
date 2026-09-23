import os
from collections import deque
from PIL import Image, ImageDraw, ImageFont

def main():
    board_path = 'C:/Users/abuba/cheapadelaide/logopack.png'
    out_dir = 'C:/Users/abuba/cheapadelaide/public/brand'
    os.makedirs(out_dir, exist_ok=True)
    
    board = Image.open(board_path).convert('RGBA')
    
    # 1. HORIZONTAL LOGO (588, 476, 1008, 578)
    h_raw = board.crop((588, 476, 1008, 578))
    
    def make_transparent_logo(img, truck_cutoff_x=165, bg_thresh=215, color_diff=22):
        img = img.convert('RGBA')
        w, h = img.size
        pixels = img.load()
        is_bg = [[False]*h for _ in range(w)]
        q = deque()
        
        def is_bg_pixel(x, y):
            r, g, b, a = pixels[x, y]
            return min(r, g, b) >= bg_thresh and (max(r, g, b) - min(r, g, b)) <= color_diff
            
        for x in range(w):
            if is_bg_pixel(x, 0):
                is_bg[x][0] = True
                q.append((x, 0))
            if is_bg_pixel(x, h-1):
                is_bg[x][h-1] = True
                q.append((x, h-1))
                
        for y in range(h):
            if is_bg_pixel(0, y):
                is_bg[0][y] = True
                q.append((0, y))
            if is_bg_pixel(w-1, y):
                is_bg[w-1][y] = True
                q.append((w-1, y))
                
        while q:
            cx, cy = q.popleft()
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and not is_bg[nx][ny]:
                    if is_bg_pixel(nx, ny):
                        is_bg[nx][ny] = True
                        q.append((nx, ny))
                        
        for x in range(w):
            for y in range(h):
                if is_bg[x][y]:
                    pixels[x, y] = (0, 0, 0, 0)
                elif x >= truck_cutoff_x and is_bg_pixel(x, y):
                    pixels[x, y] = (0, 0, 0, 0)
                    
        return img

    h_clean = make_transparent_logo(h_raw, truck_cutoff_x=165)
    h_clean.save(f'{out_dir}/logo-horizontal.png')
    
    # 2. HORIZONTAL DARK LOGO
    def make_dark_variant(img, truck_cutoff_x=165):
        img = img.copy()
        pixels = img.load()
        w, h = img.size
        for x in range(w):
            for y in range(h):
                r, g, b, a = pixels[x, y]
                if a > 30 and x >= truck_cutoff_x:
                    if r < 80 and g < 100 and b < 140:
                        pixels[x, y] = (255, 255, 255, a)
                    elif r < 130 and g < 130 and b < 130:
                        pixels[x, y] = (226, 232, 240, a)
        return img

    h_dark = make_dark_variant(h_clean, truck_cutoff_x=165)
    h_dark.save(f'{out_dir}/logo-horizontal-dark.png')
    
    # 3. STACKED LOGO (1242, 42, 1520, 214)
    stacked_raw = board.crop((1242, 42, 1520, 214))
    def make_stacked_clean(img, y_cutoff=115):
        img = img.convert('RGBA')
        w, h = img.size
        pixels = img.load()
        is_bg = [[False]*h for _ in range(w)]
        q = deque()
        
        def is_bg_pixel(x, y):
            return min(pixels[x, y][:3]) >= 210 and (max(pixels[x, y][:3]) - min(pixels[x, y][:3])) <= 25
            
        for x in range(w):
            if is_bg_pixel(x, 0):
                is_bg[x][0] = True
                q.append((x, 0))
            if is_bg_pixel(x, h-1):
                is_bg[x][h-1] = True
                q.append((x, h-1))
        for y in range(h):
            if is_bg_pixel(0, y):
                is_bg[0][y] = True
                q.append((0, y))
            if is_bg_pixel(w-1, y):
                is_bg[w-1][y] = True
                q.append((w-1, y))
                
        while q:
            cx, cy = q.popleft()
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and not is_bg[nx][ny]:
                    if is_bg_pixel(nx, ny):
                        is_bg[nx][ny] = True
                        q.append((nx, ny))
                        
        for x in range(w):
            for y in range(h):
                if is_bg[x][y]:
                    pixels[x, y] = (0, 0, 0, 0)
                elif y >= y_cutoff and is_bg_pixel(x, y):
                    pixels[x, y] = (0, 0, 0, 0)
        return img

    stacked_clean = make_stacked_clean(stacked_raw, y_cutoff=115)
    stacked_clean.save(f'{out_dir}/logo-stacked.png')
    stacked_clean.save(f'{out_dir}/logo-primary.png')

    # 4. PRIMARY DARK LOGO
    dark_box = (690, 52, 1205, 420)
    dark_crop = board.crop(dark_box)
    dark_crop.save(f'{out_dir}/logo-primary-dark.png')

    # 5. MONOCHROME LOGO
    mono_raw = board.crop((1242, 260, 1520, 430))
    mono_clean = make_stacked_clean(mono_raw, y_cutoff=115)
    mono_clean.save(f'{out_dir}/logo-monochrome.png')

    # 6. SQUIRCLE BRAND MARK & FAVICONS
    icon_center_x, icon_center_y = 115, 551
    r = 65
    icon_raw = board.crop((icon_center_x - r, icon_center_y - r, icon_center_x + r, icon_center_y + r))
    mask = Image.new('L', (130, 130), 0)
    ImageDraw.Draw(mask).rounded_rectangle([(0, 0), (129, 129)], radius=28, fill=255)

    icon_clean = Image.new('RGBA', (130, 130), (0, 0, 0, 0))
    icon_clean.paste(icon_raw, (0, 0), mask=mask)

    icon_512 = icon_clean.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save(f'{out_dir}/logo-mark.png')
    icon_512.save(f'{out_dir}/favicon.png')
    icon_512.save('C:/Users/abuba/cheapadelaide/public/icon.png')

    icon_180 = icon_clean.resize((180, 180), Image.Resampling.LANCZOS)
    icon_180.save(f'{out_dir}/apple-touch-icon.png')
    icon_180.save('C:/Users/abuba/cheapadelaide/public/apple-icon.png')

    icon_clean.save('C:/Users/abuba/cheapadelaide/public/favicon.ico', sizes=[(16,16), (32,32), (48,48)], format='ICO')

    # 7. HERO VEHICLE TRUCK
    truck_raw = board.crop((0, 755, 620, 1024))
    truck_raw.save(f'{out_dir}/hero-truck.png')
    truck_raw.save(f'{out_dir}/hero-truck.webp', format='WEBP', quality=90)

    # 8. OPEN GRAPH (1200 x 630)
    og = Image.new('RGB', (1200, 630), '#0B2D5B')
    og_draw = ImageDraw.Draw(og)

    for y in range(630):
        factor = y / 630.0
        r_c = int(11 * (1 - factor) + 7 * factor)
        g_c = int(45 * (1 - factor) + 24 * factor)
        b_c = int(91 * (1 - factor) + 52 * factor)
        og_draw.line([(0, y), (1200, y)], fill=(r_c, g_c, b_c))

    stacked = stacked_clean
    ratio = 430.0 / stacked.width
    new_h = int(stacked.height * ratio)
    stacked_scaled = stacked.resize((430, new_h), Image.Resampling.LANCZOS)

    card_w, card_h = 470, new_h + 36
    card_x, card_y = 60, int((630 - card_h) / 2)
    og_draw.rounded_rectangle([(card_x, card_y), (card_x + card_w, card_y + card_h)], radius=18, fill='#FFFFFF')
    og.paste(stacked_scaled, (card_x + 20, card_y + 18), mask=stacked_scaled)

    og_draw.rounded_rectangle([(570, 70), (575, 560)], radius=2, fill='#FF6A00')

    font_eyebrow = ImageFont.truetype('arialbd.ttf', 24)
    font_h1 = ImageFont.truetype('arialbd.ttf', 44)
    font_card_title = ImageFont.truetype('arialbd.ttf', 19)
    font_card_price = ImageFont.truetype('arialbd.ttf', 32)
    font_card_sub = ImageFont.truetype('arial.ttf', 20)
    font_body = ImageFont.truetype('arial.ttf', 21)
    font_contact = ImageFont.truetype('arialbd.ttf', 26)
    font_url = ImageFont.truetype('arial.ttf', 20)

    og_draw.text((615, 80), 'CHEAP ADELAIDE REMOVALIST', fill='#FF6A00', font=font_eyebrow)
    og_draw.text((615, 125), 'Affordable Adelaide Movers\nWithout the Runaround.', fill='#FFFFFF', font=font_h1)

    # 2 Movers card
    og_draw.rounded_rectangle([(615, 255), (875, 365)], radius=14, fill='#1A2B44', outline='#FF6A00', width=2)
    og_draw.text((635, 272), '2 MOVERS + TRUCK', fill='#94A3B8', font=font_card_title)
    og_draw.text((635, 305), 'From $79', fill='#FF6A00', font=font_card_price)
    og_draw.text((780, 314), '/ 30 min', fill='#CBD5E1', font=font_card_sub)

    # 3 Movers card
    og_draw.rounded_rectangle([(895, 255), (1155, 365)], radius=14, fill='#1A2B44', outline='#FF6A00', width=2)
    og_draw.text((915, 272), '3 MOVERS + TRUCK', fill='#94A3B8', font=font_card_title)
    og_draw.text((915, 305), 'From $99', fill='#FF6A00', font=font_card_price)
    og_draw.text((1060, 314), '/ 30 min', fill='#CBD5E1', font=font_card_sub)

    og_draw.text((615, 400), 'House • Apartment • Office • Furniture • Interstate • Packing', fill='#E2E8F0', font=font_body)
    og_draw.text((615, 455), 'Phone: 0491 704 136  |  7:00 am – 8:00 pm Daily', fill='#38BDF8', font=font_contact)
    og_draw.text((615, 510), 'https://www.cheapadelaideremovalist.com.au', fill='#94A3B8', font=font_url)

    og.save(f'{out_dir}/og-image.jpg', quality=95)
    og.save(f'{out_dir}/og-image.png')
    og.save('C:/Users/abuba/cheapadelaide/public/opengraph-image.png')
    
    print('All assets and OG generated perfectly!')

if __name__ == '__main__':
    main()
