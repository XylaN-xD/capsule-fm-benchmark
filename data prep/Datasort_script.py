"""
Kvasir-Capsule: Batch Video Processor — 4 Classes
==================================================
Output structure:
    datasort/
        output/
            Ulcer/
            Erosion/
            Blood_fresh/
            Polyp/
"""

import json
from pathlib import Path

import cv2
import numpy as np
from tqdm import tqdm

BASE_DIR   = Path(__file__).parent         
JSON_PATH  = BASE_DIR / "metadata.json"
OUTPUT_DIR = BASE_DIR / "output"
PADDING    = 30

TARGET_CLASSES = {'Ulcer', 'Erosion', 'Blood - fresh', 'Polyp'}

CLASS_FOLDER = {
    'Ulcer':         'Ulcer',
    'Erosion':       'Erosion',
    'Blood - fresh': 'Blood_fresh',
    'Polyp':         'Polyp',
}

COLORS = {
    'Ulcer':         (0,   0,   128),
    'Erosion':       (0,   165, 255),
    'Blood - fresh': (0,   0,   255),
    'Polyp':         (255, 0,   0  ),
}
DEFAULT_COLOR = (0, 255, 255)

def get_color(subtype):
    return COLORS.get(subtype, DEFAULT_COLOR)

def shape_to_bbox(shape):
    xs = [p['x'] for p in shape]
    ys = [p['y'] for p in shape]
    return int(min(xs)), int(min(ys)), int(max(xs)), int(max(ys))

def draw_bbox(frame, x1, y1, x2, y2, label, color):
    out = frame.copy()
    cv2.rectangle(out, (x1, y1), (x2, y2), color, 2)
    font, scale, thick = cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1
    (tw, th), bl = cv2.getTextSize(label, font, scale, thick)
    ty = max(y1 - 5, th + 5)
    cv2.rectangle(out, (x1, ty - th - bl), (x1 + tw + 4, ty + bl), color, -1)
    cv2.putText(out, label, (x1 + 2, ty), font, scale, (255, 255, 255), thick, cv2.LINE_AA)
    return out

def process_finding(cap, finding_id, finding, video_id, total_frames, fps, W, H, out_dir):
    meta    = finding['metadata']
    subtype = meta.get('pillcam_subtype') or 'Unknown'
    name    = meta.get('name', finding_id)
    frames  = finding['frames']

    if not frames:
        return

    frame_nums = sorted(int(fn) for fn in frames.keys())
    clip_start = max(0, frame_nums[0] - PADDING)
    clip_end   = min(total_frames - 1, frame_nums[-1] + PADDING)
    color      = get_color(subtype)

    frame_bb = {}
    for fn_str, ann in frames.items():
        fn = int(fn_str)
        frame_bb[fn] = shape_to_bbox(ann['shape'])

    safe_name = name.replace(' ', '_').replace('/', '-').replace('#', 'no')
    out_path  = out_dir / f'{video_id}_{finding_id}_{safe_name}.mp4'

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(str(out_path), fourcc, fps, (W, H))

    cap.set(cv2.CAP_PROP_POS_FRAMES, clip_start)
    for fn in range(clip_start, clip_end + 1):
        ok, frame = cap.read()
        if not ok:
            break
        if fn in frame_bb:
            x1, y1, x2, y2 = frame_bb[fn]
            label = f'{subtype} | f{fn}'
            frame = draw_bbox(frame, x1, y1, x2, y2, label, color)
        cv2.putText(frame, f'f{fn}', (6, H - 8),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.35, (200, 200, 200), 1)
        writer.write(frame)

    writer.release()
    n_ann   = len(frame_nums)
    n_total = clip_end - clip_start + 1
    print(f'    ✓ {out_path.name}  [{n_ann} annotated / {n_total} frames]')


def process_video(video_path, findings, output_base):
    video_id = video_path.stem

    relevant = {
        fid: f for fid, f in findings.items()
        if f['metadata'].get('pillcam_subtype') in TARGET_CLASSES
    }

    if not relevant:
        print(f'  [skip] {video_id} — no target class findings')
        return

    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        print(f'  [error] Cannot open {video_path}')
        return

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps          = cap.get(cv2.CAP_PROP_FPS) or 25.0
    W            = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    H            = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f'\n{video_id}  [{total_frames} frames | {fps:.1f} fps | {W}x{H}]')
    print(f'  {len(relevant)} relevant findings')

    for finding_id, finding in relevant.items():
        subtype    = finding['metadata'].get('pillcam_subtype')
        name       = finding['metadata'].get('name', finding_id)
        folder     = CLASS_FOLDER[subtype]
        out_dir    = output_base / folder
        out_dir.mkdir(parents=True, exist_ok=True)

        print(f'  → {name} ({subtype})')
        process_finding(cap, finding_id, finding, video_id,
                        total_frames, fps, W, H, out_dir)

    cap.release()

def main():
    if not JSON_PATH.exists():
        raise FileNotFoundError(f'metadata.json not found at {JSON_PATH}')

    print('Loading metadata...')
    with open(JSON_PATH, encoding='utf-8') as f:
        data = json.load(f)

    video_files = sorted(BASE_DIR.glob('*.mp4'))
    if not video_files:
        raise FileNotFoundError(f'No .mp4 files found in {BASE_DIR}')

    print(f'Found {len(video_files)} videos')
    print(f'Target classes: {TARGET_CLASSES}')
    print(f'Output folder : {OUTPUT_DIR}\n')

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total_clips = 0
    for video_path in tqdm(video_files, desc='Videos'):
        vid_id = video_path.stem
        if vid_id not in data:
            print(f'  [skip] {vid_id} — not in metadata.json')
            continue
        findings = data[vid_id]['findings']
        before = total_clips
        process_video(video_path, findings, OUTPUT_DIR)
        for cls in CLASS_FOLDER.values():
            clips = list((OUTPUT_DIR / cls).glob(f'{vid_id}_*.mp4')) if (OUTPUT_DIR / cls).exists() else []
            total_clips += len(clips) - before

    print(f'\n✓ Done! All clips saved to: {OUTPUT_DIR.resolve()}')
    print('\nClips per class:')
    for cls in CLASS_FOLDER.values():
        cls_dir = OUTPUT_DIR / cls
        if cls_dir.exists():
            count = len(list(cls_dir.glob('*.mp4')))
            print(f'  {cls:15s} : {count} clips')


if __name__ == '__main__':
    main()