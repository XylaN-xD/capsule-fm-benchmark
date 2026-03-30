import json
from pathlib import Path


BASE_DIR   = Path(__file__).parent
JSON_PATH  = BASE_DIR / "metadata.json"
OUTPUT_DIR = BASE_DIR / "output"

TARGET_CLASSES = {'Ulcer', 'Erosion', 'Blood - fresh', 'Polyp'}

def shape_to_bbox(shape):
    xs = [p['x'] for p in shape]
    ys = [p['y'] for p in shape]
    return int(min(xs)), int(min(ys)), int(max(xs)), int(max(ys))

def build_ground_truth():
    with open(JSON_PATH, encoding='utf-8') as f:
        data = json.load(f)

    video_files = sorted(BASE_DIR.glob('*.mp4'))
    records = []

    for video_path in video_files:
        vid_id = video_path.stem
        if vid_id not in data:
            continue

        findings = data[vid_id]['findings']
        for fid, finding in findings.items():
            subtype = finding['metadata'].get('pillcam_subtype')
            if subtype not in TARGET_CLASSES:
                continue

            frames = finding['frames']
            if not frames:
                continue

            frame_nums = sorted(int(x) for x in frames.keys())
            bboxes = []
            for fn_str, ann in frames.items():
                x1, y1, x2, y2 = shape_to_bbox(ann['shape'])
                bboxes.append({
                    'frame': int(fn_str),
                    'x1': x1, 'y1': y1,
                    'x2': x2, 'y2': y2,
                    'blurry': ann.get('blurry', False),
                    'interpolated': ann.get('interpolated', False)
                })

            name     = finding['metadata']['name']
            safe     = name.replace(' ', '_').replace('/', '-').replace('#', 'no')
            clip_name = f'{vid_id}_{fid}_{safe}.mp4'

            records.append({
                'clip':             clip_name,
                'video_id':         vid_id,
                'finding_id':       fid,
                'finding_name':     name,
                'class':            subtype,
                'frame_start':      frame_nums[0],
                'frame_end':        frame_nums[-1],
                'annotated_frames': len(frame_nums),
                'bboxes':           bboxes
            })

    # Save ground truth
    out_path = BASE_DIR / 'ground_truth.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2)

    print(f'Ground truth saved: {out_path}')
    print(f'Total clips: {len(records)}')
    print()

    # Class breakdown
    from collections import Counter
    counts = Counter(r['class'] for r in records)
    print('Clips per class:')
    for cls, count in counts.items():
        print(f'  {cls}: {count}')

    return records


if __name__ == '__main__':
    build_ground_truth()
