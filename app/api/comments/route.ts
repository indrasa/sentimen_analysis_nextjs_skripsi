import { NextResponse, NextRequest } from 'next/server';
import { komentar_scrapper } from '@/lib/komentar_scrapper';

export async function GET(request: NextRequest) {
  try {
    const youtubeUrl = request.nextUrl.searchParams.get('url');

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'Parameter url diperlukan' },
        { status: 400 }
      );
    }

    const list_komentar = await komentar_scrapper(youtubeUrl); // lihat ini di folder lib, adapun analisa langsung semua di API karena perlu pakai yield tiap analisanya, biar simple

    return NextResponse.json({
      message: 'Komentar berhasil diambil',
      url: youtubeUrl,
      komentar: list_komentar
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}