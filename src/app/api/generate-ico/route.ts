import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Generate ICO with multiple sizes
    const sizes = [16, 32, 48, 64];
    const pngBuffers = await Promise.all(
      sizes.map((size) =>
        sharp(inputBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer()
      )
    );
    const icoBuffer = await sharp({
      create: {
        width: 64,
        height: 64,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .png()
      .toBuffer(); // dummy, sharp can't create ICO directly

    // Use 'toIco' to combine PNGs into ICO
    // We'll use 'to-ico' npm package for this
    const toIco = (await import('to-ico')).default;
    const ico = await toIco(pngBuffers);

    return new NextResponse(new Uint8Array(ico), {
      status: 200,
      headers: {
        'Content-Type': 'image/x-icon',
        'Content-Disposition': 'attachment; filename="favicon.ico"',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'ICO generation failed', details: String(e) },
      { status: 500 }
    );
  }
}
