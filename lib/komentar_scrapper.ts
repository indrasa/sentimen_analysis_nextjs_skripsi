import { YoutubeCommentDownloader, SORT_BY_POPULAR, Comment } from "youtube-comment-downloader";


function ekstrakIDYoutube(link: string): string | null {
    if (!link) return null;

    const patterns = [
        // youtube.com/watch?v=ID
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        // youtube.com/shorts/ID
        /youtube\.com\/shorts\/([^&\n?#]+)/,
        // Jika input hanya ID langsung
        /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
        const match = link.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

export async function komentar_scrapper(link: string): Promise<Comment[]> {
    const downloader = new YoutubeCommentDownloader();
    let komentars;
    // ambil id youtube
    const idYoutube = ekstrakIDYoutube(link);
    // download komentar dari id youtube
    try {
        if (idYoutube != null) {
            komentars = downloader.getComments(idYoutube!, SORT_BY_POPULAR)
        }
    } catch (e) {
        console.error("ID Youtube tidak valid" + e);
    }

    // simpan semua koments
    const semuaKomens: Comment[] = [];
    if (komentars != null){
        for await (const komentar of komentars){
            semuaKomens.push(komentar);
        }
    }
    
    return semuaKomens;
}

